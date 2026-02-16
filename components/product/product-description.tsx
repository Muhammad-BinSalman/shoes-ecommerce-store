import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { SizeChartDialog } from "./size-chart-dialog";
import { VariantSelector } from "./variant-selector";
import { ShoppingBagIcon, ShoppingBasket, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function ProductDescription({ product }: { product: Product }) {
  const mrp = Math.max(
    0,
    parseFloat(product.priceRange.maxVariantPrice.amount) + 1000,
  );
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-4 text-3xl lg:text-5xl font-medium">
          {product.title}
        </h1>
        <div className="flex items-center justify-center gap-2 mr-auto w-auto rounded-full bg-primary-olive p-2 px-3 text-base font-medium text-white">
          <span className="text-sm sm:text-sm text-gray-200 line-through">
            Rs. {mrp.toLocaleString()}
          </span>
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode="PKR"
          />
        </div>
      </div>
      <VariantSelector options={product.options} />
      {/* <SizeChartDialog /> */}
      {product.descriptionHtml ? (
        <div>
          <div className="mb-4 text-base font-bold">Description</div>
          <Prose
            className="mb-6 text-sm leading-tight"
            html={product.descriptionHtml}
          />
        </div>
      ) : null}
      <div className="">
        <AddToCart product={product} className="text-white" />
      </div>
      <div className="w-full flex md:hidden items-center px-3 sm:px-4 gap-2 border h-16 fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50">
        <div className="w-full">
          <AddToCart
            product={product}
            className="bg-white text-primary-olive w-full"
          />
        </div>
        <Link href="/checkout" className="w-full">
          <button className="relative whitespace-nowrap flex items-center justify-center w-full gap-2 rounded-2xl bg-[#313e44] p-3 px-4 tracking-wide text-white font-semibold">
            <ShoppingCart /> Buy Now
          </button>
        </Link>
      </div>
    </>
  );
}
