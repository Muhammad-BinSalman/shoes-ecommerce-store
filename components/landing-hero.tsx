import RotatingText from "components/reusable/animated-text-cycle";
import { RainbowButton } from "components/ui/rainbow-button";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CircularText from "./react-bits/circular-text";

export default function LandingHero() {
  return (
    <section className="w-full py-24 sm:py-20 md:py-20 lg:py-14 overflow-hidden">
      <div className=" mx-auto grid items-center gap-8 sm:gap-9 md:gap-14 px-5 xs:px-8 sm:px-16 md:px-28 lg:px-20 xl:px-16 lg:grid-cols-[48%_52%] lg:gap-12">
        <div className="relative w-full lg:w-full bg-custom-gradient-1 md:h-56 h-56 lg:h-64 rounded-full p-8">
          <div className="absolute -top-1 left-4 xxs:-top-2 xxs:left-3 xs:top-0 xs:left-6 sm:-top-3 sm:left-10 lg:-top-3 md:left-14 lg:left-20 flex sm:gap-2 gap-1">
            <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-pink-500" />
            <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-orange-500" />
            <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-primary-olive" />
          </div>
          <Image
            src="/banners/shoe-landing.png"
            width={500}
            height={500}
            alt="Hero Image"
            className="absolute -rotate-[20deg] sm:-top-32 -top-20 xxs:-top-24 xxs:right-8 right-7 sm:w-[390px] sm:h-[390px] w-[200px] h-[200px] xxs:w-[210px] xxs:h-[210px] xs:w-[240px] xs:h-[240px] object-contain"
          />
          <Image
            src="/banners/shoe-landing-1.png"
            width={500}
            height={500}
            alt="Hero Image"
            className="absolute xxs:-rotate-[10deg] sm:-top-32 xxs:top-20 top-20 xxs:-left-0 xs:-left-2 -left-4 sm:w-[390px] sm:h-[390px] xxs:w-[170px] xxs:h-[170px] w-[160px] h-[160px] xs:w-[190px] xs:h-[190px] object-contain"
          />
          <div className="absolute -bottom-1 sm:-right-4 right-1 flex items-center justify-center w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-primary-olive text-white sm:p-6">
            <div className="sm:w-8 sm:h-8 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <CircularText
              text="100%*RETURN*WARRANTY*"
              className="font-normal"
              onHover="speedUp"
              spinDuration={20}
            />
          </div>
        </div>
        <div
          className={`space-y-6 xs:space-y-7 md:space-y-7 lg:space-y-9 lg:text-left text-center lg:pl-14`}
        >
          <h1 className="text-4xl font-bold tracking-tight xxs:text-[42px] sm:text-7xl px-0 xxs:px-0 leading-11 xxs:leading-12 bg-gradient-to-r from-primary-olive to-black bg-clip-text text-transparent ">
            Your Favorite Branded Shoes
            {/* <br className="hidden lg:block" /> */}
            <RotatingText
              texts={[
                "Thrifted for Less",
                "Curated for You",
                "Cheap to Wear",
                "Easy to Flex",
              ]}
              mainClassName="px-1 mx-auto sm:px-2 md:px-3 bg-primary-olive text-white w-fit text-center overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "tween", damping: 30, stiffness: 400 }}
              rotationInterval={4000}
            />
          </h1>
          <p className="lg:max-w-md text-gray-500 max-w-56 xxs:max-w-64 xs:max-w-72 sm:max-w-md md:text-lg mx-auto lg:mx-0 text-sm">
            We have a collection of handpicked, refurbished thrifted shoes ready
            to flex, from premium branded kicks to vintage gems, all at crazy
            low prices. COD anywhere in Pakistan
          </p>
          <div className="flex justify-center lg:justify-start items-center gap-7 lg:gap-5 relative pt-4 xs:pt-5 sm:pt-0">
            <span className="absolute -ml-2 sm:-ml-6 -top-2 xs:-top-1 sm:-top-6 left-0 bg-red-400 text-white text-[10px] sm:text-xs sm:px-3 px-2 py-1 rounded-full font-semibold rotate-[-8deg] shadow-md select-none">
              Starting From Only
            </span>
            <h3
              className={`text-[26px] font-semibold text-[#ff331d] whitespace-nowrap`}
            >
              PKR 399
            </h3>
            <RainbowButton>
              <Link
                href="/products"
                prefetch={false}
                className="whitespace-nowrap flex items-center gap-2"
              >
                Shop Now <ShoppingBagIcon className="w-5 h-5" />
              </Link>
            </RainbowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
