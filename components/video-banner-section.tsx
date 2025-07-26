import Link from 'next/link';
import CurvedLoop from './react-bits/curved-loop-text';

export default function VideoBannerSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center">
      <div className="w-full max-w-7xl xl:max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Left Video */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white">
          <video
            src="/banners/airforce-banner-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[450px] object-cover object-center"
          />
          <Link
            href="/white-shoes"
            className="absolute left-6 bottom-6 bg-white/90 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-black hover:text-white transition-colors border border-neutral-200"
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
            className="w-full h-[450px] object-cover object-center"
          />
          <Link
            href="/jordans-collection"
            className="absolute left-6 bottom-6 bg-white/90 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-black hover:text-white transition-colors border border-neutral-200"
          >
            Shop Trendy Jordans →
          </Link>
        </div>
      </div>
      <CurvedLoop marqueeText="Thrift ✦ hard. ✦ Look rich. ✦ " speed={1.5} curveAmount={200} interactive={true} className="text-black bg-white" />
    </section>
  );
} 