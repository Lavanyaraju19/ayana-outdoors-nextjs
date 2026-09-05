import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

const sections = [
  { href: '/admin/homepage', label: 'Homepage', description: 'Hero headline, highlights and impact numbers' },
  { href: '/admin/adventures', label: 'Adventures', description: 'The programs shown on Upcoming Adventures' },
  { href: '/admin/gallery', label: 'Gallery', description: 'Photos on the Gallery page' },
  { href: '/admin/faqs', label: 'FAQs', description: 'Questions and answers' },
  { href: '/admin/testimonials', label: 'Testimonials', description: 'Homepage community voices section' },
  { href: '/admin/why-ayana', label: 'Why Ayana Outdoors', description: 'Homepage value-proposition cards' },
  { href: '/admin/journey-with', label: 'Who We Journey With', description: 'Children / Families / Schools cards' },
  { href: '/admin/founder', label: 'Founder', description: 'Founder facts shown on the homepage and founder page' },
  { href: '/admin/media-items', label: 'Media & Press', description: 'Instagram, YouTube and press links' },
  { href: '/admin/contact-options', label: 'Contact Options', description: 'Call / WhatsApp / Email cards' },
  { href: '/admin/enquiries', label: 'Enquiries', description: 'Messages submitted through the contact form' },
  { href: '/admin/settings', label: 'Settings', description: 'Phone, email, address and social links' },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count: newEnquiries } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Dashboard</h1>
      <p className="mb-8 text-muted-foreground">
        {newEnquiries ? (
          <>
            You have <span className="font-semibold text-foreground">{newEnquiries}</span> new{' '}
            {newEnquiries === 1 ? 'enquiry' : 'enquiries'} to review.
          </>
        ) : (
          'No new enquiries right now.'
        )}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:border-primary"
          >
            <h2 className="font-display text-lg">{section.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
