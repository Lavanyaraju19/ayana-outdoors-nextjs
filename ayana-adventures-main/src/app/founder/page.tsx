import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import HomeSectionHeader from '@/components/HomeSectionHeader';
import { getFounderFacts } from '@/lib/content';
import FounderStoryContent from './FounderStoryContent';

export const metadata: Metadata = {
  title: 'Founder Story',
  description: 'Read the story of Mountain Manju, Founder, Outdoor Educator and NIM Certified Trek Leader behind Ayana Outdoors.',
  alternates: { canonical: '/founder' },
  openGraph: {
    title: 'Founder Story | Ayana Outdoors',
    description: 'Meet Mountain Manju and the vision behind Ayana Outdoors.',
  },
};

export default async function FounderStory() {
  const facts = await getFounderFacts();

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Founder Story</h1>
        <HomeSectionHeader
          eyebrow="Meet the Founder"
          title="The Vision Behind"
          highlight="Ayana Outdoors"
          description="For over a decade, Mountain Manju has dedicated his life to helping children learn, grow and discover themselves through nature. His vision is simple: every child deserves the opportunity to learn beyond the classroom."
        />
        <FounderStoryContent facts={facts} />
      </div>
    </main>
  );
}
