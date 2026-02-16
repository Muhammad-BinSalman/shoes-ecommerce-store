import React from "react";

export default function SoldOutBadge() {
  return (
    <span className="absolute top-2 right-2 z-10 rounded-full bg-red-100/70 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[12px] font-semibold text-red-600">
      Sold Out
    </span>
  );
}
