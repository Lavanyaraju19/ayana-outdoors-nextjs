import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '../actions/auth';

const sections = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/homepage', label: 'Homepage' },
  { href: '/admin/adventures', label: 'Adventures' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/why-ayana', label: 'Why Ayana Outdoors' },
  { href: '/admin/journey-with', label: 'Who We Journey With' },
  { href: '/admin/founder', label: 'Founder' },
  { href: '/admin/media-items', label: 'Media & Press' },
  { href: '/admin/contact-options', label: 'Contact Options' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30 pt-16" style={{ cursor: 'auto' }}>
      <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
        <nav className="flex h-[calc(100vh-4rem)] flex-col justify-between overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="mb-3 px-2 font-display text-sm uppercase tracking-widest text-primary">Ayana Admin</p>
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
              >
                {section.label}
              </Link>
            ))}
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </form>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile nav */}
        <nav className="flex gap-2 overflow-x-auto border-b bg-background p-3 md:hidden">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="shrink-0 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap"
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <main className="p-6 md:p-10 [&_*]:cursor-auto">{children}</main>
      </div>
    </div>
  );
}
