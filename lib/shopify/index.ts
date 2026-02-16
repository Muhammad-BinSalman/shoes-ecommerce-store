import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "lib/constants";
import { isShopifyError } from "lib/type-guards";
import { ensureStartsWith } from "lib/utils";
import {
  cacheLife,
  cacheTag,
  revalidateTag,
} from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const DEFAULT_TIMEOUT_MS = Number(
  process.env.SHOPIFY_FETCH_TIMEOUT_MS ?? 10000,
);
const MAX_RETRIES = Number(process.env.SHOPIFY_FETCH_MAX_RETRIES ?? 2);

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeoutMs?: number } = {},
) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables,
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  let attempt = 0;
  let lastError: any = null;
  while (attempt <= MAX_RETRIES) {
    try {
      const result = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": key,
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
      });

      const status = result.status;
      let body: any = null;
      try {
        body = await result.json();
      } catch (jsonErr) {
        // Non-JSON response
        throw {
          cause: "Invalid JSON from Shopify",
          status,
          message: (jsonErr as Error)?.message || "Failed to parse JSON",
          query,
        };
      }

      if (!result.ok || body?.errors) {
        const err = body?.errors?.[0];
        throw {
          cause: err?.cause?.toString?.() || "ShopifyError",
          status: err?.status || status || 500,
          message:
            err?.message || `Shopify request failed with status ${status}`,
          query,
        };
      }

      return {
        status,
        body,
      };
    } catch (e: any) {
      lastError = e;
      // AbortError or network error or timeout
      const isAbort =
        e?.name === "AbortError" ||
        /aborted|timeout/i.test(String(e?.cause || e?.message));
      const isNetwork =
        /NetworkError|ECONNRESET|ENOTFOUND|EAI_AGAIN|SocketError|fetch failed/i.test(
          String(e?.cause || e?.message || e),
        );
      const retryable = isAbort || isNetwork;
      if (attempt < MAX_RETRIES && retryable) {
        const backoff = 300 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, backoff));
        attempt++;
        continue;
      }

      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() || "unknown",
          status: e.status || 500,
          message: e.message,
          query,
        };
      }

      throw {
        cause: e?.cause?.toString?.() || e?.message || "unknown",
        status: e?.status || 500,
        message: e?.message || "fetch failed",
        endpoint,
        domain,
        query,
      };
    }
  }

  // Should not reach here, but in case
  throw (
    lastError || { status: 500, message: "Unknown Shopify fetch error", query }
  );
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }

  // Force-disable taxes and make total equal subtotal so we never charge tax
  try {
    const currencyCode = cart.cost.totalAmount.currencyCode;
    cart.cost.totalTaxAmount = { amount: "0", currencyCode };
    if (cart.cost.subtotalAmount?.amount) {
      cart.cost.totalAmount = {
        amount: cart.cost.subtotalAmount.amount,
        currencyCode,
      };
    }
  } catch (_) {
    // no-op; keep original cost if shape differs
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

const reshapeCollection = (
  collection: ShopifyCollection,
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/products/${collection.handle}`,
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return undefined;
  }

  try {
    const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
    });

    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
      return undefined;
    }

    return reshapeCart(res.body.data.cart);
  } catch (err) {
    // Swallow network/timeout errors so pages don't 500; callers can handle undefined
    console.error("Failed to fetch Shopify cart", { cartId, err });
    return undefined;
  }
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products),
  );
}

export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/products",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden"),
    ),
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  // 'use cache';
  // cacheTag(TAGS.collections);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      variables: {
        handle,
      },
    });
    return (
      res.body?.data?.menu?.items.map(
        (item: { title: string; url: string }) => ({
          title: item.title,
          path: item.url
            .replace(domain, "")
            .replace("/collections", "/search")
            .replace("/pages", ""),
        }),
      ) || []
    );
  } catch (err) {
    console.error("Failed to load Shopify menu", {
      handle,
      domain,
      endpoint,
      err,
    });
    // Fallback to empty menu so the app still renders
    return [];
  }
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections, { expire: 0 });
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products, { expire: 0 });
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
