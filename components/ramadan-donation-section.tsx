import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import Link from "next/link";

export default function RamadanDonationSection() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-[#FFF8F0] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <Moon className="w-64 h-64 md:w-96 md:h-96 text-primary-olive -rotate-12" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center justify-center p-2 bg-primary-olive/10 rounded-full mb-4">
                        <Moon className="w-5 h-5 text-primary-olive mr-2 fill-primary-olive" />
                        <span className="text-primary-olive font-medium text-sm">Ramadan Kareem</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                        Shoe a Child This Ramadan
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        This Ramadan, help us provide brand new school shoes to children in need across Pakistan.
                        Many children are forced to attend school in torn and worn-out shoes — together, we can change that.
                    </p>

                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-primary-olive/20 inline-block mb-8">
                        <p className="text-gray-800 font-medium">
                            We purchase new school shoes directly from manufacturers for
                            <span className="font-bold text-primary-olive mx-1">Rs. 850</span>
                            per pair, and every donation of
                            <span className="font-bold text-primary-olive mx-1">Rs. 850</span>
                            sponsors one child.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto text-lg h-12 px-8 bg-primary-olive hover:bg-primary-olive/90 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <Link href="/shoe-donation">
                                Donate Rs. 850
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto text-lg h-12 px-8 border-primary-olive text-primary-olive hover:bg-primary-olive/10 rounded-full bg-transparent"
                        >
                            <Link href="/shoe-donation">
                                Read More <span className="ml-2">→</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
