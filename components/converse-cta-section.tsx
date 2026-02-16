import Image from "next/image";
import { ThreeItemGrid } from "./grid/three-items";
import Link from "next/link";
import ViewAllButton from "./view-all-button";
import CurvedLoop from "./react-bits/curved-loop-text";

export default function ConverseCtaSection() {
  return (
    <section className="w-full bg-[#f3f4f8] mt-16">
      <Image
        src="/banners/converse-banner-upscaled3.png"
        alt="Converse Throwback Essentials"
        width={500}
        height={500}
        className="object-cover w-full h-auto"
        priority
      />
      <div className="py-5 relative -mt-1 rounded-t-2xl bg-white">
        <div className="flex items-center justify-between px-5 pb-5">
          <h3 className="text-lg sm:text-xl font-semibold">New Arrivals</h3>
          <Link
            href={""}
            prefetch={false}
            className="text-sm font-medium text-green-700 hover:underline"
          >
            View More
          </Link>
        </div>
        <ThreeItemGrid />
        <ViewAllButton viewMoreHref={"/products"} />
        <div className="py-6">
          <CurvedLoop
            marqueeText="Thrift hard. ✦ Look rich. ✦ "
            speed={1.5}
            curveAmount={200}
            interactive={true}
            className="text-black bg-white"
          />
        </div>
      </div>
    </section>
  );
}
