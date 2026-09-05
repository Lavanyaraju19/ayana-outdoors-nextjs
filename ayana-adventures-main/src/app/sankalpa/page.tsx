import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import HomeSectionHeader from '@/components/HomeSectionHeader';
import SankalpaContent from './SankalpaContent';

export const metadata: Metadata = {
  title: 'Sankalpa',
  description: 'Explore Sankalpa, the Ayana Outdoors commitment to safe, meaningful and responsible outdoor learning for children, families and schools.',
  alternates: { canonical: '/sankalpa' },
  openGraph: {
    title: 'Sankalpa | Ayana Outdoors',
    description: 'Ayana Outdoors commitment to meaningful outdoor learning, safety, care and responsible journeys.',
  },
};

export default function Sankalpa() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Sankalpa</h1>
        <HomeSectionHeader
          eyebrow="Sankalpa"
          title="Our Promise for"
          highlight="Every Journey"
          description="Sankalpa is our commitment to create outdoor learning experiences that are safe, meaningful, responsible and rooted in care for children, families, schools and nature."
        />
        <SankalpaContent />
      </div>
    </main>
  );
}
