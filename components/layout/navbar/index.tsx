import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

export const dynamic = "force-dynamic"; 

export async function Navbar() {
  const menu: Menu[] = await getMenu('next-js-frontend-header-menu');

  return (
    <nav id="nav" className="h-28">
      <div className='h-[102px] mx-6 md:mx-20 border-b-2'>
        <div className='flex left-0 rounded-b-lg right-0 md:mx-12 mx-0 md:px-[10px] px-7 lg:mx-[70px]  bg-opacity-40 backdrop-blur-lg fixed z-30 h-[100px] items-center justify-between' >
          <div className='block md:hidden'>
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <Link href="/"
            prefetch={false}>
            <Image width={140} height={140} src="/logo/logo-main.png" alt="logo"/>
          </Link>
          <nav className={` hidden lg:px-0 md:px-6 md:flex`}>
            {menu.length ? (
              <ul className="flex items-center text-black gap-8 lg:gap-[34px]">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link href={item.path} className={`text-[16px] leading-tight truncate font-medium hover:underline hover:underline-offset-4`} prefetch={false}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </nav>
          <div className='flex justify-center gap-2 items-center'>
            <Image src="/flags/pakistan-flag.svg" alt="Pakistani Flag" width={32} height={26} className="mr-2" />
            <div className='hidden md:block'>
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
