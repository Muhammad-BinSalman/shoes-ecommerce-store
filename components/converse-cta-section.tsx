import Image from 'next/image';

export default function ConverseCtaSection() {
  return (
    <section className="w-full bg-[#fcf8f5] py-16 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10 px-4 md:px-12">
        {/* Text Block */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Throwback Essentials</h2>
          <p className="text-lg sm:text-xl text-neutral-700 mb-6 max-w-md">
            Level up your look with trending picks like the adidas Samba
          </p>
          <a
            href="/search?q=converse"
            className="inline-flex items-center gap-2 px-6 py-2 mt-2 bg-black text-white text-lg font-extrabold tracking-widest uppercase rounded-full shadow hover:bg-neutral-800 transition-colors border-2 border-black"
          >
            Shop Converse
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
            </svg>
          </a>
        </div>
        {/* Converse Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/banners/converse-banner.jpg"
            alt="Converse Throwback Essentials"
            width={500}
            height={500}
            className="object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
} 