import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import HomeSectionHeader from '@/components/HomeSectionHeader';
import { getJourneyWithItems } from '@/lib/content';
import WhoWeJourneyWithContent from './WhoWeJourneyWithContent';

export const metadata: Metadata = {
  title: 'Who We Journey With',
  description: 'Ayana Outdoors creates outdoor learning experiences for children, families, schools and teachers at every stage of growing up.',
  alternates: { canonical: '/who-we-journey-with' },
  openGraph: {
    title: 'Who We Journey With | Ayana Outdoors',
    description: 'Outdoor learning for children, families, schools and teachers with Ayana Outdoors.',
  },
};

export default async function WhoWeJourneyWith() {
  const items = await getJourneyWithItems();

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Who We Journey With</h1>
        <HomeSectionHeader
          eyebrow="Who We Journey With"
          title="Outdoor Learning for Every"
          highlight="Stage of Growing Up"
          description="Whether you're a child taking your first outdoor adventure, a family exploring together or a school looking beyond the classroom, Ayana Outdoors creates meaningful outdoor learning experiences for every journey."
        />
        <WhoWeJourneyWithContent items={items} />
      </div>
    </main>
  );
}
