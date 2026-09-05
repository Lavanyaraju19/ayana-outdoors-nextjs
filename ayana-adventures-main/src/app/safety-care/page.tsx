import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import SafetyContent from './SafetyContent';

export const metadata: Metadata = {
  title: 'Safety & Care',
  description: 'Learn how Ayana Outdoors approaches Safety & Care with guided preparation, parent communication, emergency planning, and structured outdoor learning practices.',
  alternates: { canonical: '/safety-care' },
  openGraph: {
    title: 'Safety & Care | Ayana Outdoors',
    description: 'Discover our safety and care systems for children, families and schools.',
  },
};

export default function Safety() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <SafetyContent />
    </main>
  );
}
