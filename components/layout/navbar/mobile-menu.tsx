"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import HamBurger from "@/components/icons/hamburger";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import { MobileSearch, SearchSkeleton } from "./search";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      // Close the mobile drawer at lg and above (>= 1024px)
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        // className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
      >
        <HamBurger className="h-8 w-fit text-primary-olive" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 backdrop-blur-xl top-0 flex h-[100dvh] w-full flex-col bg-white/80 max-w-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-4 py-4">
                <h2 className="text-lg font-bold text-black">Menu</h2>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-black"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-5" />
                </button>
              </div>

              {/* Search (mobile-friendly) */}
              <div className="p-4 border-b">
                <Suspense fallback={<SearchSkeleton />}>
                  <MobileSearch />
                </Suspense>
              </div>

              {/* Menu links */}
              <div className="flex-1 overflow-y-auto">
                {menu.length ? (
                  <ul className="flex w-full flex-col p-2">
                    {menu.map((item: Menu) => (
                      <li key={item.title}>
                        <Link
                          href={item.path}
                          prefetch={true}
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between gap-3 rounded-md px-3 py-3 text-base font-medium text-black hover:bg-neutral-50"
                        >
                          <span>{item.title}</span>
                          <ChevronRightIcon className="h-4 w-4 text-neutral-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {/* Footer links */}
              <div className="mt-auto border-t px-4 py-3">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <Link
                    href="/terms"
                    prefetch={false}
                    className="hover:underline"
                    onClick={closeMobileMenu}
                  >
                    Terms of Service
                  </Link>
                  <span aria-hidden="true">•</span>
                  <Link
                    href="/privacy"
                    prefetch={false}
                    className="hover:underline"
                    onClick={closeMobileMenu}
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
