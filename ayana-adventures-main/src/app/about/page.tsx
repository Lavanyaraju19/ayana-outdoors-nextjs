import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'Learn who Ayana Outdoors is and how we help children grow beyond the classroom through trekking, travel and outdoor learning experiences.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Who We Are | Ayana Outdoors',
    description: 'Discover Ayana Outdoors, our story, our values and our approach to outdoor learning for children, families and schools.',
  },
};

export default function About() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <AboutContent />
    </main>
  );
}
