import CartModal from "components/cart/modal";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FrostedBar from "./frosted-bar";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";

export const dynamic = "force-dynamic";

export async function Navbar() {
  const menu: Menu[] = await getMenu("next-js-frontend-header-menu");

  return (
    <nav id="nav" className="h-28">
      <div className="h-[82px] sm:h-[102px] mx-5 sm:mx-6 md:mx-20 border-b-2 border-x-0">
        <FrostedBar className="flex left-0 rounded-b-lg right-0 md:px-[20px] px-6 sm:px-7 bg-white/60 backdrop-blur-lg fixed z-30 h-[80px] sm:h-[100px] items-center justify-between">
          <div className="block lg:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <Link href="/" prefetch={false}>
            <Image
              width={140}
              height={140}
              src="/logo/logo-main.png"
              alt="logo"
              className="w-24 object-contain h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
          </Link>

          <nav className="hidden lg:flex lg:px-0">
            {menu.length ? (
              <ul className="flex items-center text-black gap-6 lg:gap-[34px]">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-[16px] leading-tight truncate font-medium hover:underline hover:underline-offset-4"
                      prefetch={false}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </nav>

          <div className="flex justify-center gap-2 items-center">
            <Image
              src="/flags/pakistan-flag.svg"
              alt="Pakistani Flag"
              width={32}
              height={26}
              className="mr-2 hidden sm:inline-block"
            />
            <div className="hidden lg:block">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <CartModal />
          </div>
        </FrostedBar>
      </div>
    </nav>
  );
}
