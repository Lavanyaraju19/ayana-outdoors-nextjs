import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Ayana Outdoors terms of service.',
  alternates: { canonical: '/terms' },
  robots: { index: false },
};

export default function TermsOfService() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <h1 className="font-display text-4xl md:text-5xl text-white mb-8">Terms of Service</h1>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-xl">
          <p className="font-body text-white/90 font-semibold leading-relaxed">
            Our full terms of service — including booking, cancellation and refund policies — are
            being finalised and will be published here shortly. For any question in the meantime,
            please reach out via the{' '}
            <a href="mailto:info@ayanaoutdoors.com" className="text-primary underline">contact details on our Contact page</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
