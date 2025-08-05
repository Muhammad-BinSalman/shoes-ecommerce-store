import ConverseCtaSection from '@/components/converse-cta-section';
import LandingHero from '@/components/landing-hero';
import NewSportsSection from '@/components/new-sports-section';
import Testimonials from '@/components/testimonials';
import LogoCloud from '@/components/logo-cloud';
import ContentSection from '@/components/green-promise';
import VideoBannerSection from '@/components/video-banner-section';
import Carousel from 'components/carousel-swiper';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getCollectionProducts } from 'lib/shopify';
import CallToAction from '@/components/call-to-action';
import FAQsection from '@/components/faq/faq-section';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  // Fetch products from the hidden-homepage-carousel collection
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  return (
    <>
      <LandingHero/>
      <Carousel products={products} />
      <LogoCloud />
      <VideoBannerSection />
      <ConverseCtaSection />
      <ThreeItemGrid />
      <NewSportsSection />
      <Testimonials />
      <ContentSection />
      <FAQsection />
      <CallToAction />
    </>
  );
}
