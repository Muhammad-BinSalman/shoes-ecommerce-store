import DonationCounter from "@/components/donation-counter";
import DonationForm from "@/components/donation-form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Factory, School, ShieldCheck } from "lucide-react";

export default function ShoeDonationPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Hero Header */}
            <section className="bg-custom-gradient-1 text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Shoe a Child This Ramadan
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Give the gift of dignity and comfort. Help us provide new school shoes to children in need.
                    </p>
                </div>
                {/* Background Pattern Mock */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            </section>

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

                    {/* Main Content */}
                    <div className="space-y-16">

                        {/* Intro Stats */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <Factory className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Direct from Factory</h3>
                                    <p className="text-gray-600 text-sm">We purchase directly from manufacturers to get the best price of Rs. 850/pair.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">100% Transparent</h3>
                                    <p className="text-gray-600 text-sm">Every Rupee of your Rs. 850 goes directly to purchasing the shoes.</p>
                                </div>
                            </div>
                        </div>

                        {/* How It Works */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">How Your Donation Works</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-olive text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Transparent Process</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            We have secured a deal with local manufacturers to produce high-quality, durable school shoes at a cost price of Rs. 850. This ensures your donation has maximum impact, bypassing improved retail markups.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-olive text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Distribution Through Trusted NGOs</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            We don't just buy the shoes; we ensure they reach the feet that need them most. We handover your donated shoes to the reputable NGOs for distribution and provide you the delivery receveing receipt:
                                        </p>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {["Alkhidmat Foundation", "Saylani Welfare Trust"].map((org) => (
                                                <li key={org} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    {org}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-olive text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Impact & Verification</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Upon distribution, we aim to share proof of delivery where possible, respecting the dignity of the children. You will receive a receipt for your contribution immediately.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Impact Statement */}
                        <section className="bg-[#FFF8F0] p-8 md:p-12 rounded-3xl text-center">
                            <School className="w-12 h-12 text-primary-olive mx-auto mb-6" />
                            <blockquote className="text-2xl font-serif text-gray-800 italic mb-6">
                                "Every pair of shoes means dignity, confidence, and comfort for a child walking to school."
                            </blockquote>
                            <p className="text-gray-600">Join us in making this Ramadan special for them.</p>
                        </section>

                        {/* FAQ */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is my donation Zakat eligible?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes, providing essential items like school shoes to needy children is eligible for Zakat. We ensure the shoes reach deserving candidates.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Can I donate physical shoes?</AccordionTrigger>
                                    <AccordionContent>
                                        Currently, we are only accepting monetary donations to purchase standardized new school shoes directly from manufacturers to ensure fairness and quality for all children.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>How many pairs can I sponsor?</AccordionTrigger>
                                    <AccordionContent>
                                        You can sponsor as many pairs as you like! There is no upper limit. Small contributions add up to make a big difference.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>

                    </div>

                    {/* Sidebar / Sticky Layout */}
                    <div className="space-y-6">
                        <DonationCounter />
                        <DonationForm />

                        {/* Testimonial Placeholder */}
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="flex justify-center mb-4">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <span key={s} className="text-orange-400">★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm italic mb-4">
                                "A wonderful initiative. Transparency is key and Thumb Thrift is doing a great job ensuring these kids get what they need."
                            </p>
                            <p className="font-bold text-xs text-gray-900">- Sarah A., Frequent Donor</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
