"use client";
import Link from "next/link";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ThankYouPage() {
  useEffect(() => {
    toast.success('Order confirmed!', {
      description: 'Thank you for your purchase. We have received your order.',
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-lg mb-6">We'll contact you for delivery.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-[#313e44] text-white rounded hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
