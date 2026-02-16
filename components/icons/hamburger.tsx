import React from "react";

export default function HamBurger({ className }: { className?: string }) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 18H10"
        stroke="#313e46"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12L16 12"
        stroke="#313e46"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="#313e46"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
