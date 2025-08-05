import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32 bg-[rgba(253,253,251,255)]">
            <div className="mx-auto max-w-7xl space-y-8 px-5 md:space-y-12">
                <Image
                    className="rounded-lg w-[80%] mx-auto"
                    src="/banners/recycling-banner.jpeg"
                    alt="recycling shoes image"
                    height={500}
                    width={500}
                    loading="lazy"
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">The ThumbThrift ecosystem brings together our shoes, sustainability, and purpose.</h2>
                    <div className="space-y-6">
                        <p className="text-lg">
                            Every pair you choose gives our planet a second chance. We curate pre-loved football, cricket, and lifestyle shoes—rescuing them from landfills, reducing waste, and slashing carbon footprints. Join our mission: look good, feel good, and do good for Mother Earth.
                        </p>
                        <Link href="/green-promise">
                        <button className="flex justify-center gap-1 rounded-lg px-6 py-2 items-center text-white bg-[#5c844a] hover:bg-[#4a6d40] transition-colors cursor-pointer">
                                <span>Learn More about Our Green Promise</span>
                                <ChevronRight className="h-4 w-4" />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section >
    )
}
