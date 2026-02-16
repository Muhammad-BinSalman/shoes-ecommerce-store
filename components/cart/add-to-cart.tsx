"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useProduct } from "components/product/product-context";
import { Product, ProductVariant } from "lib/shopify/types";
import { useActionState, useEffect } from "react";
import { useCart } from "./cart-context";
import { toast } from "sonner";
import { fbq } from "@/lib/metaPixel";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  className,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  className?: string;
}) {
  const buttonClasses =
    "relative flex items-center w-full whitespace-nowrap border md:border-primary-olive bg-primary-olive justify-center rounded-2xl p-3 pr-4 pl-9 tracking-wide font-semibold";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button
        disabled
        className={clsx(buttonClasses, disabledClasses, className)}
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses, className)}
      >
        <div className="absolute left-0 ml-1">
          <PlusIcon className="h-3" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, className, {
        "hover:opacity-90": true,
      })}
    >
      <div className="absolute left-0 ml-2">
        <PlusIcon className="h-6 " />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;
  fbq.addToCart({
    content_ids: [product.id.toString()],
    value: parseFloat(product.priceRange.minVariantPrice.amount),
    currency: "PKR",
  });
  useEffect(() => {
    fbq.viewContent({
      content_ids: [product.id.toString()],
      content_name: product.title,
      value: parseFloat(product.priceRange.minVariantPrice.amount),
      currency: "PKR",
    });
  }, [product]);
  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
        toast.success(`${product.title} added to cart!`, {
          description: "You can view your cart or continue shopping.",
        });
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        className={className}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
