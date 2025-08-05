import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import Image from 'next/image'

export default function LogoCloud() {
    return (
        <section className="overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Providing the best brands</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain"
                                    src="/brands-logos/nike.png"
                                    alt="Nike Logo"
                                    height={60}
                                    width={60}
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain"
                                    src="/brands-logos/adidas.png"
                                    alt="Adidas Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain"
                                    src="/brands-logos/jordan.png"
                                    alt="Jordan Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain "
                                    src="/brands-logos/converse.png"
                                    alt="Converse Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain "
                                    src="/brands-logos/new-balance.png"
                                    alt="New Balance Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain"
                                    src="/brands-logos/puma.png"
                                    alt="Puma Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain "
                                    src="/brands-logos/reebok.png"
                                    alt="Reebok Logo"
                                    height="60"
                                    width="60"
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto object-contain "
                                    src="/brands-logos/vans.png"
                                    alt="Vans Logo"
                                    height={70}
                                    width={70}
                                />
                            </div>
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-neutral-50 absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-neutral-50 absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
