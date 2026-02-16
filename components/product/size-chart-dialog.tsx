"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import * as React from "react";
import { Loader } from "../ui/loader";
import { X } from "lucide-react";

export function SizeChartDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [zoomed, setZoomed] = React.useState(false);

  // Reset states whenever the dialog opens
  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (v) {
      setLoading(true);
      setZoomed(false);
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Trigger asChild>
        <button className="mt-4 sm:my-2 my-8 text-sm font-medium text-red-600 cursor-pointer underline hover:font-semibold">
          Size Chart
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg">
          <div className="flex items-center justify-between gap-2 px-2">
            <AlertDialog.Title className="text-lg font-semibold">
              Size Chart
            </AlertDialog.Title>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-neutral-50"
              >
                {zoomed ? "Zoom out" : "Zoom in"}
              </button>
              <AlertDialog.Cancel asChild>
                <X className="text-xl cursor-pointer">Close</X>
              </AlertDialog.Cancel>
            </div>
          </div>

          <div
            className="relative max-h-[75vh] w-full overflow-auto rounded-md border bg-neutral-50"
            // Enable grab cursor when zoomed to hint panning via scroll/drag
            style={{ cursor: zoomed ? ("grab" as const) : "auto" }}
          >
            {/* Loader overlay while image is loading */}
            {loading && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                <Loader size={28} />
              </div>
            )}

            <div className="p-2">
              <Image
                src="/size-chart/size-chart-v1.png"
                alt="Size Chart"
                width={1200}
                height={1600}
                className={`h-auto w-full select-none object-contain transition-transform duration-200 ease-out ${
                  zoomed ? "scale-[1.5]" : "scale-100"
                }`}
                style={{ transformOrigin: "center top" }}
                // clicking toggles zoom
                onClick={() => setZoomed((z) => !z)}
                // mark loading complete when the actual image has loaded
                onLoad={() => setLoading(false)}
                priority
              />
            </div>
          </div>

          <AlertDialog.Description className="sr-only">
            Size chart image with zoom. Click the image or the zoom button to
            toggle zoom. Scroll to pan when zoomed.
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
