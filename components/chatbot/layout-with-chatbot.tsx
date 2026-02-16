"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Chatbot from "./chatbot";

export default function LayoutWithChatbot({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Hide chatbot on product detail pages (paths starting with /product/)
  const shouldHideChatbot = pathname?.startsWith("/product/");

  return (
    <>
      {children}
      {!shouldHideChatbot && <Chatbot />}
    </>
  );
}
