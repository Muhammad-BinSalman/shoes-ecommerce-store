"use client";

import clsx from "clsx";
import { useProduct, useUpdateURL } from "components/product/product-context";
import type { ProductOption } from "lib/shopify/types";
import { startTransition, useEffect, useRef } from "react";

// Simplified VariantSelector: prioritizes a Size-like option, otherwise falls back to the first option
export function VariantSelector({ options }: { options: ProductOption[] }) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  // Prefer an option whose name includes "size" (case-insensitive); otherwise use the first option
  const targetOption =
    options.find((o) => o.name.toLowerCase().includes("size")) ?? options[0];
  if (!targetOption) return null;

  const optionKey = targetOption.name.toLowerCase();
  const didInit = useRef(false);

  // Auto-select the first value only once on initial mount if none is selected
  useEffect(() => {
    if (didInit.current) return;
    if (!targetOption?.values?.length) return;
    if (!state[optionKey]) {
      const first = targetOption.values[0];
      startTransition(() => {
        //@ts-ignore
        const newState = updateOption(optionKey, first);
        updateURL(newState);
      });
    }
    didInit.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetOption]);

  return (
    <form>
      <dl className="mb-8">
        <dt className="mb-4 text-base font-bold">{targetOption.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {targetOption.values.map((value) => {
            const isActive = state[optionKey] === value;

            return (
              <button
                key={value}
                type="submit"
                title={`${targetOption.name} ${value}`}
                className={clsx(
                  "flex min-w-[40px] items-center justify-center rounded-full border p-2 text-sm",
                  {
                    "bg-primary-olive text-white border-primary-olive cursor-default":
                      isActive,
                    "bg-gray-300 text-white hover:bg-gray-400 transition-colors border-gray-300":
                      !isActive,
                  },
                )}
                formAction={() => {
                  // Toggle: deselect if active, else select
                  if (isActive) {
                    const cleared = updateOption(optionKey, "");
                    const filtered = Object.fromEntries(
                      Object.entries(cleared).filter(([k, v]) => v && v !== ""),
                    ) as Record<string, string>;
                    updateURL(filtered);
                  } else {
                    const newState = updateOption(optionKey, value);
                    updateURL(newState);
                  }
                }}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  );
}
