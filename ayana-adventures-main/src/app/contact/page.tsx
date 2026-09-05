import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import { getAdventures, getContactOptions } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Speak to Our Team',
  description: 'Connect with Ayana Outdoors to plan your child\'s outdoor learning journey with the right experience for parents, schools or organisations.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Connect With Us | Ayana Outdoors',
    description: 'Talk to Ayana Outdoors and choose the right outdoor learning experience for your child, family or school.',
  },
};

export default async function Contact() {
  const [contactOptions, adventures] = await Promise.all([getContactOptions(), getAdventures()]);

  return (
    <main className="relative z-10 pt-16">
      <h1 className="sr-only">Contact Ayana Outdoors</h1>
      <ContactSection contactOptions={contactOptions} adventures={adventures} />
    </main>
  );
}
