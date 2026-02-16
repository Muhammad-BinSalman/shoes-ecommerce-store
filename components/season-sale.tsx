import { getCollectionProducts } from "lib/shopify";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ViewAllButton from "./view-all-button";
import SoldOutBadge from "./reusable/sold-out-badge";

// Minimal product shape used by this component
type SelectedOption = { name?: string; value?: string };

type Variant = {
  availableForSale?: boolean;
  selectedOptions?: SelectedOption[];
  title?: string;
};

type Product = {
  handle: string;
  title: string;
  featuredImage?: { url: string };
  priceRange?: { maxVariantPrice?: { amount?: string; currencyCode?: string } };
  variants?: Variant[];
  availableForSale?: boolean;
};

export default async function SeasonSale({
  viewMoreHref = "/products",
  ctaImageSrc = "/banners/shoe-landing-2.png",
}: {
  viewMoreHref?: string;
  ctaImageSrc?: string;
}) {
  // Fetch the "Cheapest picks" collection (update handle here if your slug differs)
  const products: Product[] = await getCollectionProducts({
    collection: "cheapest-picks",
  });

  const getPrice = (p: Product) =>
    Number(p?.priceRange?.maxVariantPrice?.amount ?? 0);

  const getPrimarySize = (product: Product) => {
    const variants = product.variants ?? [];
    if (!variants.length) return undefined;
    const candidate = variants.find((v) => v.availableForSale) ?? variants[0];
    const sizeOpt = candidate?.selectedOptions?.find(
      (o) => o.name?.toLowerCase() === "size",
    );
    return sizeOpt?.value || candidate?.title || undefined;
  };

  const isOutOfStock = (product: Product) => {
    const variants = product.variants ?? [];
    if (variants.length)
      return variants.every((v) => v.availableForSale === false);
    return product.availableForSale === false;
  };

  // Show only 6 products
  const shown = products.slice(0, 6);

  return (
    <section className="w-full px-5 xxs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-6 mx-auto max-w-[1400px]">
      {/* CTA Card */}
      <div className="relative overflow-hidden rounded-4xl bg-custom-gradient-1 text-white px-6 sm:px-10 py-8 sm:py-10 mb-8 sm:mb-10">
        <div className="relative z-10 flex items-center justify-center xxs:justify-between">
          <div className="max-w-xl flex flex-col items-center xxs:items-start gap-2">
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold leading-tight">
              Season Ending Sale
            </h2>
            <p className="mt-2 sm:mt-3 text-white/90 text-sm sm:text-base xxs:text-left text-center">
              Grab these shoes at unbelievable prices. Limited stock.
            </p>
            <div className="mt-4 sm:mt-6">
              <Link
                href={viewMoreHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-green-700 font-semibold px-4 sm:px-6 py-2.5 shadow-sm hover:shadow-md transition"
              >
                Shop Now
                <ShoppingBagIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <Image
            src={ctaImageSrc}
            alt="Sale Shoe"
            width={240}
            height={240}
            className="w-[130px] h-[130px] xxs:block hidden object-contain -rotate-12 drop-shadow-xl"
          />
        </div>
        {/* Accent blob */}
        <div className="absolute -right-16 -bottom-24 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Products Grid */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold">Cheapest Picks</h3>
        <Link
          href={viewMoreHref}
          prefetch={false}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          View More
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {shown.map((product) => {
          const price = getPrice(product);
          const mrp = Math.max(0, price + 1000);
          const sizeLabel = getPrimarySize(product);
          const out = isOutOfStock(product);

          return (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              prefetch={false}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition relative"
            >
              <div className="bg-[#f2f2f2] relative">
                {/* Out of stock badge */}
                {out ? (
                  <SoldOutBadge />
                ) : (
                  <span className="absolute top-2 right-2 z-10 rounded-full bg-white/90 border border-[#e5e5e5] px-2 py-1 text-[10px] sm:text-xs font-semibold text-[#191919]">
                    Size {sizeLabel ?? "-"}
                  </span>
                )}
                {/* {out && (
                                    <span className="absolute top-2 right-2 z-10 rounded-full bg-red-100/80 px-2 py-1 text-[10px] sm:text-xs font-semibold text-red-600">
                                        Out of stock
                                    </span>
                                )} */}
                <Image
                  src={product.featuredImage?.url || "/placeholder.png"}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-semibold line-clamp-2 text-[#191919]">
                  {product.title}
                </h4>
                <div className="mt-3 flex items-end justify-between">
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      Rs. {mrp.toLocaleString()}
                    </span>
                    <span className="text-[#ff331d] font-bold text-sm sm:text-base">
                      Rs. {price.toLocaleString()}
                    </span>
                  </div>
                  {/* <span className="text-[10px] sm:text-xs text-[#6a6a6a]">Size {sizeLabel ?? '-'}</span> */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <ViewAllButton viewMoreHref={viewMoreHref} className="mt-8 sm:mt-6" />
    </section>
  );
}
