"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel({ products }: any) {
    const [activeTab, setActiveTab] = useState("All")
    const filteredProducts = useMemo(() => {
        if (activeTab === "All") {
            return products;
        } else {
            return products.filter((product: any) =>
                product.tags &&
                product.tags.some(
                    (tag: string) => tag.toLowerCase() === activeTab.toLowerCase()
                )
            );
        }
    }, [activeTab, products]);
    const swiperRef = useRef<any>(null);

    // Helper: get a primary size label from the first available variant (fallback to first variant)
    const getPrimarySize = (product: any) => {
        const variants = Array.isArray(product?.variants) ? product.variants : [];
        if (!variants.length) return undefined;
        const candidate = variants.find((v: any) => v?.availableForSale) ?? variants[0];
        const sizeOpt = candidate?.selectedOptions?.find((o: any) => o?.name?.toLowerCase() === 'size');
        return sizeOpt?.value || candidate?.title || undefined;
    };

    return (
        <div className="w-full overflow-hidden xl:max-w-[1400px] px-5 xxs:px-4 mx-auto sm:px-6 2xl:px-6 xl:px-6 lg:px-10 md:px-8 sm:py-12">
            <div className="flex items-center justify-end sm:justify-between mb-8">
                <div className={`md:flex hidden items-center gap-2 xxs:gap-3 xs:gap-7`}>
                    <button
                        type="button"
                        onClick={() => setActiveTab("All")}
                        className={`${activeTab === "All" ? "bg-[#110b0d] text-white border-2 hover:bg[#110b0d] border-[#110b0d]" : "bg-white border-[#d3d3d3] border-2 transition-colors ease-in-out delay-75 text-gray-600 hover:bg-[#110b0d] hover:text-white hover:border-[#110b0d]"} rounded-full px-4 py-1 md:px-7 md:py-1 font-semibold`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("Nike")}
                        className={`${activeTab === "Nike" ? "bg-[#110b0d] text-white border-2 hover:bg[#110b0d] border-[#110b0d]" : "bg-white border-[#d3d3d3] border-2 transition-colors ease-in-out delay-75 text-gray-600 hover:bg-[#110b0d] hover:text-white hover:border-[#110b0d]"} rounded-full px-4 py-1 md:px-7 md:py-1 font-semibold`}
                    >
                        Nike
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("Adidas")}
                        className={`${activeTab === "Adidas" ? "bg-[#110b0d] text-white border-2 hover:bg[#110b0d] border-[#110b0d]" : "bg-white border-[#d3d3d3] border-2 transition-colors ease-in-out delay-75 text-gray-600 hover:bg-[#110b0d] hover:text-white hover:border-[#110b0d]"} rounded-full px-4 py-1 md:px-7 md:py-1 font-semibold`}
                    >
                        Adidas
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("Converse")}
                        className={`${activeTab === "Converse" ? "bg-[#110b0d] text-white border-2 hover:bg[#110b0d] border-[#110b0d]" : "bg-white border-[#d3d3d3] border-2 transition-colors ease-in-out delay-75 text-gray-600 hover:bg-[#110b0d] hover:text-white hover:border-[#110b0d]"} rounded-full px-4 py-1 md:px-7 md:py-1 font-semibold sm:block hidden`}
                    >
                        Converse
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button type="button" className=" rounded-full h-9 w-9 hover:bg-[#f2f2f2] border-[#d3d3d3] border" onClick={() => swiperRef.current?.slidePrev()}>
                        <ChevronLeftIcon className="h-6 w-6 mx-auto" />
                    </button>
                    <button type="button" className=" rounded-full h-9 w-9 hover:bg-[#f2f2f2] border-[#d3d3d3] border" onClick={() => swiperRef.current?.slideNext()}>
                        <ChevronRightIcon className="h-6 w-6 mx-auto" />
                    </button>
                </div>
            </div>
            <Swiper
                key={activeTab} // Add this line to force re-mount on tab change
                className="mySwiper w-auto xl:w-[1214px] 2xl:w-full mx-auto sm:mt-14 mt-8 mb-9 md:h-96"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    639: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    900: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    1000: {
                        slidesPerView: 4,
                        spaceBetween: 50
                    },
                }}
                loop={true}
                mousewheel={true}
                modules={[Navigation, Autoplay]}
                navigation={false}
                autoplay={{ delay: 2000 }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {filteredProducts.map((product: any, i: any) => {
                    const variants = Array.isArray(product?.variants) ? product.variants : [];
                    const hasVariants = variants.length > 0;
                    const OutOfStock = hasVariants
                        ? variants.every((v: any) => v?.availableForSale === false)
                        : product?.availableForSale === false;
                    const sizeLabel = getPrimarySize(product);
                    return (
                        <SwiperSlide className="group flex-shrink-0" key={i}>
                            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                                <div className="sm:px-3 overflow-hidden relative pb-1 sm:pt-3 bg-[#f2f2f2] group rounded-2xl shadow-lg group-hover:bg-black transition-all duration-300">
                                    {/* Size badge (top-left) */}
                                    <div className="flex absolute sm:top-6 top-2 sm:left-6 left-2 px-2 h-6 sm:h-7 justify-center items-center rounded-full bg-white/90 border border-[#e5e5e5]">
                                        <p className="text-[10px] sm:text-[12px] font-semibold text-[#191919]">Size {sizeLabel ?? '-'}</p>
                                    </div>

                                    {/* Out of stock badge (top-right) */}
                                    {OutOfStock && (
                                        <span className="absolute top-2 right-2 z-10 rounded-full bg-red-100/70 px-1 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[12px] font-semibold text-red-600">
                                            Out of stock
                                        </span>
                                    )}

                                    <Image
                                        src={product.featuredImage?.url}
                                        alt={product.title}
                                        width={400}
                                        height={400}
                                        className="w-full h-48 sm:h-52 md:h-64 object-cover rounded-2xl"
                                    />
                                    <div className="bg-white absolute h-7 w-7 flex justify-center items-center text-[30px] right-2 mt-4  rounded-full text-[#110b0d]"><span className="-mt-1.5">+</span></div>
                                    <div className="sm:pt-3 pt-4 border sm:px-2 px-3 sm:pb-0 pb-3 md:gap-2 sm:h-24 h-[102px] flex group-hover:text-white items-stretch flex-col sm:justify-center justify-between">
                                        <div className="pr-10">
                                            <h3 className="sm:text-[18px] text-[16px] font-semibold mb-2 leading-tight text-[#191919] group-hover:text-white truncate">{product.title}</h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="sm:text-xs text-[10px] text-[#6a6a6a] group-hover:text-white ">return  available</p>
                                            <p className="font-bold truncate sm:text-lg text-[18px] text-[#ff331d] group-hover:text-white">Rs. {product.priceRange.maxVariantPrice.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
} 