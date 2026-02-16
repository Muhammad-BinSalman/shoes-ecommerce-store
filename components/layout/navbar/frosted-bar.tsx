"use client";

import { PropsWithChildren, useEffect, useState } from "react";

type FrostedBarProps = PropsWithChildren<{
  className?: string;
  threshold?: number;
}>;

export default function FrostedBar({
  className = "",
  threshold = 15,
  children,
}: FrostedBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const topClass = scrolled ? "top-0" : "top-[40px]";
  return (
    <div
      className={`${className} ${topClass} transition-all duration-300 ease-out`}
    >
      {children}
    </div>
  );
}
