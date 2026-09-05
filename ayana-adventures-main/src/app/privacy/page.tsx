import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Ayana Outdoors privacy policy.',
  alternates: { canonical: '/privacy' },
  robots: { index: false },
};

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <h1 className="font-display text-4xl md:text-5xl text-white mb-8">Privacy Policy</h1>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-xl">
          <p className="font-body text-white/90 font-semibold leading-relaxed">
            Our full privacy policy is being finalised and will be published here shortly. In the
            meantime, if you have any question about how Ayana Outdoors handles enquiry or contact
            information you've shared with us, please reach out directly via the{' '}
            <a href="mailto:info@ayanaoutdoors.com" className="text-primary underline">contact details on our Contact page</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
