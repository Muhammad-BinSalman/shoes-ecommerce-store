"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const messages = [
    "Easy Exchanges and Returns",
    "Free Shipping on Orders Over 5000",
    "New Arrivals Dropping Weekly",
  ];

  const [index, setIndex] = useState(0);
  const delay = 3000; // ms

  const prev = () =>
    setIndex((i) => (i - 1 + messages.length) % messages.length);
  const next = () => setIndex((i) => (i + 1) % messages.length);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, delay);
    return () => clearInterval(id);
  }, [messages.length, delay]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Site announcement"
      className="w-full bg-primary-olive text-background py-1.5"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous announcement"
            className="p-1 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:ring-background rounded"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {messages.map((msg, i) => (
                <div key={i} className="w-full flex-none">
                  <p
                    className="text-center font-normal tracking-wide text-pretty whitespace-nowrap"
                    aria-live="polite"
                  >
                    {msg}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next announcement"
            className="p-1 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:ring-background rounded"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
