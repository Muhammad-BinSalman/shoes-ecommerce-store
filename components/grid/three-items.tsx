import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="block w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <div className="relative aspect-square w-full">
          <GridTileImage
            className="rounded-t-2xl"
            priceClassName="top-0 w-full"
            src={item.featuredImage.url}
            fill
            sizes={
              size === "full"
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            priority={priority}
            alt={item.title}
            label={{
              position: size === "full" ? "center" : "bottom",
              title: item.title as string,
              amount: item.priceRange.maxVariantPrice.amount,
              currencyCode: item.priceRange.maxVariantPrice.currencyCode,
            }}
          />
        </div>
        <div className="py-2 bg-[#eef2f5] rounded-b-xl border-x border-b">
          <h2 className="px-2 text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
            {item.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "converses",
  });

  // Take up to 6 products
  const items = homepageItems.slice(0, 6);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) xl:max-w-[1430px] sm:gap-4 gap-2 px-4 pb-12 grid-cols-2 md:grid-cols-6 grid-rows-2 lg:max-h-[calc(100vh-350px)]">
      {items.map((item, idx) => (
        <ThreeItemGridItem
          key={item.handle}
          size={idx === 0 ? "full" : "half"}
          item={item}
          priority={idx < 3}
        />
      ))}
    </section>
  );
}
