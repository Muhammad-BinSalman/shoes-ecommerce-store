import CircularText from 'components/react-bits/circular-text';
import { RainbowButton } from 'components/ui/rainbow-button';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingHero() {
    return (
        <section className="w-full py-20 sm:py-20 md:py-20 lg:py-14 overflow-hidden">
            <div className="container mx-auto grid items-center gap-8 sm:gap-9 md:gap-14 px-5 sm:px-16 md:px-28 lg:px-20 xl:px-16 lg:grid-cols-[48%_52%] lg:gap-12">
                <div className="relative w-full lg:w-full bg-custom-gradient-1 md:h-56 h-52 lg:h-64 rounded-full p-8">
                    <div className="absolute -top-1 left-8 sm:-top-3 sm:left-10 lg:-top-3 md:left-14 lg:left-20 flex gap-2">
                        <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-pink-500" />
                        <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-orange-500" />
                        <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-gray-950" />
                    </div>
                    <Image
                        src="/banners/shoe-landing.png"
                        width={500}
                        height={500}
                        alt="Hero Image"
                        className="absolute -rotate-[26deg] -top-32 right-10 sm:w-[390px] sm:h-[390px] w-[320px] h-[320px] object-contain"
                    />
                    <div className="absolute -bottom-1 -right-4 flex items-center justify-center w-32 h-32 rounded-full bg-custom-gradient-2 text-white p-6">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <CircularText text="100%*FREE*DELIVERY*" className="font-normal" onHover="speedUp" spinDuration={20} />
                    </div>
                </div>
                <div className={` space-y-4 sm:space-y-5 md:space-y-7 lg:space-y-9 lg:text-left text-center lg:pl-14`}>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                        Refurbished Branded Shoes
                        <br className='lg:block hidden' />
                        Thrifted for Less
                    </h1>
                    <p className="lg:max-w-md text-muted-foreground max-w-80 sm:max-w-md md:text-lg mx-auto lg:mx-0">
                        Discover top-quality, authentic branded shoes—refurbished and thrifted for unbeatable prices. Shop premium footwear for men and women, all with free delivery across Pakistan.
                    </p>
                    <div className="flex justify-center lg:justify-start items-center gap-7 lg:gap-5 relative">
                        <span className="absolute -ml-6 -top-6 left-0 bg-red-400 text-white text-xs px-3 py-1 rounded-full font-semibold rotate-[-8deg] shadow-md select-none">
                            Starting From Only
                        </span>
                        <h3 className={`text-3xl font-semibold text-[#ff331d]`}>PKR.999</h3>
                        <RainbowButton>
                          <Link href="#" prefetch={false}>Explore Now</Link>
                        </RainbowButton>
                    </div>
                </div>
            </div>
        </section>
    );
} 