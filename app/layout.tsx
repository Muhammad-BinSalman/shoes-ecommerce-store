import Footer from '@/components/layout/footer';
import UtmCollector from '@/components/UtmCollector.client';
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL("https://www.thumb-thrift.shop"),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Thumb Thrift PK is Pakistan's trusted online thrift shoe store for authentic Nike Jordans, Converse, Adidas Sambas, Nike Air, football boots, canvas and more — at unbeatable prices. Nationwide delivery.",
  keywords: [
    "Thumb Thrift PK",
    "thrift shoes Pakistan",
    "used shoes Pakistan",
    "second hand shoes Karachi",
    "Nike Jordans Pakistan",
    "Converse Pakistan",
    "Adidas Samba Pakistan",
    "Nike Air Pakistan",
    "football shoes Pakistan",
    "canvas shoes Pakistan",
    "cheap branded shoes Pakistan"
  ],
  applicationName: SITE_NAME!,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "https://www.thumb-thrift.shop/",
    siteName: SITE_NAME!,
    title: SITE_NAME!,
    description:
      "Pakistan's trusted online thrift shoe store for Jordans, Converse, Adidas, Nike Air, football and canvas shoes at cheap prices.",
    locale: "en_PK",
    images: [
      {
        url: "https://www.thumb-thrift.shop/logo/logo-main.png",
        width: 800,
        height: 800,
        alt: "Thumb Thrift PK Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME!,
    description:
      "Pakistan's trusted online thrift shoe store for Jordans, Converse, Adidas, Nike Air, football and canvas shoes at cheap prices.",
    images: [
      "https://www.thumb-thrift.shop/logo/logo-main.png"
    ]
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <Analytics />
        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img height="1" width="1" style={{display:'none'}}
                   src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        )}
        {/* Organization JSON-LD */}
        <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">{
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME ?? 'Thumb Thrift PK',
            url: 'https://www.thumb-thrift.shop/',
            logo: 'https://www.thumb-thrift.shop/logo/logo-main.png',
            sameAs: [
              'https://www.instagram.com/thumbthrift.pk/',
              'https://wa.me/923343170959'
            ],
            contactPoint: [{
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: '+92 334 3170959',
              areaServed: 'PK'
            }],
            description:
              "Thumb Thrift PK is Pakistan's trusted online thrift shoe store for authentic Nike Jordans, Converse, Adidas Sambas, Nike Air, football boots, canvas and more — at unbeatable prices.",
            brand: [
              'Nike',
              'Jordan',
              'Converse',
              'Adidas',
              'Puma',
              'New Balance',
              'Reebok',
              'Vans'
            ]
          })
        }</Script>
        {/* LocalBusiness JSON-LD (ShoeStore) */}
        <Script id="localbusiness-ld" type="application/ld+json" strategy="afterInteractive">{
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoeStore',
            name: SITE_NAME ?? 'Thumb Thrift PK',
            url: 'https://www.thumb-thrift.shop/',
            image: 'https://www.thumb-thrift.shop/logo/logo-main.png',
            telephone: '+92 334 3170959',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Karachi',
              addressCountry: 'PK'
            },
            areaServed: {
              '@type': 'Country',
              name: 'Pakistan'
            },
            sameAs: [
              'https://www.instagram.com/thumbthrift.pk/',
              'https://wa.me/923343170959'
            ]
          })
        }</Script>
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300">
        <CartProvider cartPromise={cart}>
          <UtmCollector />
          <Navbar />
          <Toaster closeButton />
          <main>
            {children}
            <WelcomeToast />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
