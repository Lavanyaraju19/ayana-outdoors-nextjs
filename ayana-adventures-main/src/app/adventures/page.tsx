import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import UpcomingAdventures from '@/components/UpcomingAdventures';
import { getAdventures } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Upcoming Adventures',
  description: 'Explore upcoming outdoor learning experiences for children, families, schools and teachers with Ayana Outdoors.',
  alternates: { canonical: '/adventures' },
  openGraph: {
    title: 'Upcoming Adventures | Ayana Outdoors',
    description: 'Explore trekking, travel and outdoor learning experiences designed for confidence, leadership and life skills.',
  },
};

export default async function Adventures() {
  const adventures = await getAdventures();

  return (
    <main className="relative min-h-screen pt-16 pb-10 overflow-hidden">
      <PageBackgroundVideo />
      <h1 className="sr-only">Upcoming Adventures</h1>
      <UpcomingAdventures adventures={adventures} />
    </main>
  );
}
