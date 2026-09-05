import HeroSection from '@/components/HeroSection';
import ImpactNumbers from '@/components/ImpactNumbers';
import UpcomingAdventures from '@/components/UpcomingAdventures';
import WhyAyanaOutdoors from '@/components/WhyAyanaOutdoors';
import WhoWeJourneyWithSection from '@/components/WhoWeJourneyWithSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import MeetFounder from '@/components/MeetFounder';
import InstagramMedia from '@/components/InstagramMedia';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import StickyEnquiryButton from '@/components/StickyEnquiryButton';
import {
  getHeroContent,
  getImpactStats,
  getAdventures,
  getWhyAyanaItems,
  getJourneyWithItems,
  getTestimonials,
  getGalleryItems,
  getFounderFacts,
  getMediaItems,
  getFaqItems,
  getContactOptions,
  getSiteSettings,
} from '@/lib/content';

export const metadata = {
  title: 'Outdoor Learning for Children',
  description: 'Ayana Outdoors builds confidence, leadership and life skills through trekking, travel and outdoor experiences for children, families and schools.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Outdoor Learning for Children | Ayana Outdoors',
    description: 'Explore outdoor learning experiences for children, families and schools with Ayana Outdoors.',
  },
};

export default async function Home() {
  const [hero, impactStats, adventures, whyItems, journeyItems, testimonials, galleryItems, founderFacts, mediaItems, faqItems, contactOptions, settings] =
    await Promise.all([
      getHeroContent(),
      getImpactStats(),
      getAdventures(),
      getWhyAyanaItems(),
      getJourneyWithItems(),
      getTestimonials(),
      getGalleryItems(),
      getFounderFacts(),
      getMediaItems(),
      getFaqItems(),
      getContactOptions(),
      getSiteSettings(),
    ]);

  return (
    <main>
      {hero && <HeroSection {...hero} />}
      <ImpactNumbers stats={impactStats} />
      <UpcomingAdventures adventures={adventures} />
      <WhyAyanaOutdoors items={whyItems} />
      <WhoWeJourneyWithSection items={journeyItems} />
      <TestimonialsSection items={testimonials} />
      <GallerySection items={galleryItems} />
      <MeetFounder facts={founderFacts} />
      <InstagramMedia items={mediaItems} instagramUrl={settings?.social_instagram ?? null} />
      <FAQSection items={faqItems} />
      <ContactSection contactOptions={contactOptions} adventures={adventures} />
      <StickyEnquiryButton />
    </main>
  );
}
