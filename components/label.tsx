import clsx from "clsx";
import Price from "./price";

const Label = ({
  className,
  title,
  amount,
  currencyCode,
  position = "bottom",
  floatingTitle = false,
}: {
  className?: string;
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
  floatingTitle?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "absolute flex justify-end pb-1.5 @container/label",
        className,
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex items-center rounded-full border bg-white/60 text-[11px] font-bold text-primary-olive backdrop-blur-md">
        <Price
          className="flex-none rounded-2xl bg-primary-olive sm:p-2 p-1.5 py-1.5 text-gray-100"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
        {floatingTitle ? (
          <h3 className="mr-0 line-clamp-2 grow pl-1.5 leading-none tracking-tight">
            {title}
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default Label;
