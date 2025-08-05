import { RainbowButton } from 'components/ui/rainbow-button';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import { getCollectionProducts } from 'lib/shopify';

export const metadata = {
  title: 'Kids Shoes',
  description: 'Premium refurbished branded shoes for kids. Comfortable, stylish, and affordable footwear for children with free delivery across Pakistan.',
  openGraph: {
    type: 'website'
  }
};

export default async function KidsPage() {
  // Fetch products from a collection (you can adjust this based on your Shopify setup)
  const products = await getCollectionProducts({ collection: 'kids' });

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-20 sm:py-20 md:py-20 lg:py-14 overflow-hidden">
        <div className="container mx-auto px-5 sm:px-16 md:px-28 lg:px-20 xl:px-16">
          <div className="text-center space-y-6 mb-32">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Kids Collection
              <br className='lg:block hidden' />
              Little Steps, Big Style
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Premium branded shoes for kids, carefully refurbished for comfort and style. 
              Let your little ones step out in confidence with our affordable collection.
            </p>
            <div className="flex justify-center items-center gap-7 relative">
              <span className="absolute -ml-6 -top-6 left-0 bg-pink-400 text-white text-lg px-3 py-1 rounded-full font-semibold rotate-[-8deg] shadow-md select-none">
                Coming Soon
              </span>
              <h3 className="text-3xl font-semibold text-[#ff331d]">Starting PKR.799</h3>
              <RainbowButton>
                <Link href="/search/kids" prefetch={false}>Shop Kids</Link>
              </RainbowButton>
            </div>
          </div>

          {/* Featured Kids Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 mt-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Perfect Fit for Growing Feet</h2>
              <p className="text-muted-foreground text-lg">
                Our kids collection features carefully selected branded shoes that provide 
                the perfect balance of comfort, durability, and style. Each pair is 
                professionally cleaned and refurbished to ensure the highest quality.
              </p>
              
            </div>
            <div className="relative border w-full h-80 rounded-3xl overflow-hidden">
              <div className="absolute top-3 left-6 flex gap-2">
                <div className="h-6 w-6 rounded-full bg-red-400" />
                <div className="h-6 w-6 rounded-full bg-yellow-400" />
                <div className="h-6 w-6 rounded-full bg-green-400" />
              </div>
              <Image
                src="/banners/kids-shoes-banner.jpg"
                width={800}
                height={800}
                alt="Kids Shoes Collection"
                className="right-10 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Safety First</h3>
              <p className="text-muted-foreground mb-6">
                All our kids shoes feature non-slip soles and secure fastenings for maximum safety during play.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Non-slip rubber soles</li>
                <li>• Secure velcro straps</li>
                <li>• Rounded toe protection</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">💨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Breathable Comfort</h3>
              <p className="text-muted-foreground mb-6">
                Breathable materials and cushioned insoles ensure all-day comfort for active kids.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Mesh ventilation</li>
                <li>• Cushioned footbed</li>
                <li>• Flexible construction</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Style & Fun</h3>
              <p className="text-muted-foreground mb-6">
                Colorful designs and popular brand styles that kids love to wear every day.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vibrant colors</li>
                <li>• Popular characters</li>
                <li>• Trendy designs</li>
              </ul>
            </div>
          </div>
          {/* Parent Testimonials */}
          <div className="text-center mb-24">
            <h1 className='text-9xl font-extrabold'>Launching Soon!</h1>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-12 mb-28">
            <h2 className="text-4xl font-bold mb-6">Get Notified When Available?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We will notify u whenever our children shoes stock will be available for u.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff331d]"
              />
              <RainbowButton className='rounded-none h-full w-xl'>
                Get Notified
              </RainbowButton>
            </div>
          </div>

          {/* Size Guide Section */}
          <div className="border-2 rounded-3xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Kids Size Guide</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Finding the perfect fit is important for growing feet. Use our size guide to ensure comfort and proper development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="font-bold text-lg mb-3">Toddler (1-3 years)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>UK: 3-6</p>
                  <p>EU: 19-23</p>
                  <p>US: 4-7</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="font-bold text-lg mb-3">Little Kid (4-6 years)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>UK: 7-10</p>
                  <p>EU: 24-28</p>
                  <p>US: 8-11</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="font-bold text-lg mb-3">Big Kid (7-9 years)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>UK: 11-13</p>
                  <p>EU: 29-32</p>
                  <p>US: 12-1</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="font-bold text-lg mb-3">Youth (10-12 years)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>UK: 1-3</p>
                  <p>EU: 33-36</p>
                  <p>US: 2-4</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}
