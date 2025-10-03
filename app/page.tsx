import CallToAction from '@/components/call-to-action';
import ConverseCtaSection from '@/components/converse-cta-section';
import FAQsection from '@/components/faq/faq-section';
import ContentSection from '@/components/green-promise';
import LandingHero from '@/components/landing-hero';
import LogoCloud from '@/components/logo-cloud';
import NewSportsSection from '@/components/new-sports-section';
import Testimonials from '@/components/testimonials';
import VideoBannerSection from '@/components/video-banner-section';
import Carousel from 'components/carousel-swiper';
import { ThreeItemGrid } from 'components/grid/three-items';
import { getCollectionProducts } from 'lib/shopify';

export const metadata = {
  description:
    "Thumb Thrift PK — Pakistan's best online thrift store for cheap, authentic branded shoes: Nike Jordans, Converse, Adidas Sambas, Nike Air, football boots, canvas and more. Fast nationwide delivery.",
  openGraph: {
    type: 'website',
    title: 'Thumb Thrift PK',
    description:
      "Pakistan's trusted online thrift shoe store for Nike Jordans, Converse, Adidas, Nike Air, football and canvas shoes at cheap prices.",
    url: 'https://www.thumb-thrift.shop/'
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
