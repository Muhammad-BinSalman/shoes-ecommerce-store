import Image from "next/image";
import Link from "next/link";

export default function VideoBannerSection() {
  return (
    <section className="w-full pt-10 pb-6 sm:pb-16 sm:py-16 rounded-2xl bg-black flex flex-col items-center gap-7 sm:gap-0">
      <div className="w-full max-w-7xl xl:max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <Image
          src="/brands-logos/nike.png"
          alt="Nike Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        {/* Left Video */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white">
          <video
            src="/banners/airforce-banner-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full sm:h-[450px] h-[300px] object-cover object-center"
          />
          <Link
            href="/white-shoes"
            className="absolute left-6 bottom-6 bg-black/60 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-black text-white transition-colors border border-neutral-500"
          >
            Shop Fresh White Styles →
          </Link>
        </div>
        {/* Right Video */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white">
          <video
            src="/banners/jordan-banner-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[300px] sm:h-[450px] object-cover object-center"
          />
          <Link
            href="/jordans-collection"
            className="absolute left-6 bottom-6 bg-black/60 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-black text-white transition-colors border border-neutral-500"
          >
            Shop Trendy Jordans →
          </Link>
        </div>
      </div>
    </section>
  );
}
