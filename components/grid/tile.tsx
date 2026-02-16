import clsx from "clsx";
import Image from "next/image";
import Label from "../label";
import SoldOutBadge from "../reusable/sold-out-badge";

const isDev = process.env.NODE_ENV !== "production";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  className,
  priceClassName,
  showAvailability,
  availableForSale,
  ...props
}: {
  isInteractive?: boolean;
  className?: string;
  active?: boolean;
  priceClassName?: string;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
    floatingTitle?: boolean;
  };
  showAvailability?: boolean;
  availableForSale?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden border-x border-t bg-white hover:border-black",
        {
          relative: label || (showAvailability && !availableForSale),
          "border-2 border-black": active,
          "border-neutral-200": !active,
        },
        className,
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
          // Default to bypass optimizer in development to avoid upstream timeouts
          unoptimized={props.unoptimized ?? isDev}
        />
      ) : null}
      {label ? (
        <Label
          className={priceClassName}
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          floatingTitle={label.floatingTitle}
        />
      ) : null}
      {showAvailability && !availableForSale ? <SoldOutBadge /> : null}
    </div>
  );
}
