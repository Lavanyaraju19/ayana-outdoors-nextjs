import type { Metadata } from 'next';
import { BookOpen, HelpCircle, HeartHandshake, ShieldCheck } from 'lucide-react';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import ClickableHomeCard from '@/components/ClickableHomeCard';
import HomeSectionHeader from '@/components/HomeSectionHeader';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Browse Ayana Outdoors resources for parents and schools, including FAQs, safety care, founder story and Sankalpa.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources | Ayana Outdoors',
    description: 'Helpful resources for choosing outdoor learning experiences for children, families and schools.',
  },
};

const resources = [
  {
    title: 'Frequently Asked Questions',
    description: 'Find quick answers about our outdoor learning programs, safety standards and how we create meaningful experiences for children, families and schools.',
    link: '/resources/faqs',
    icon: HelpCircle,
  },
  {
    title: 'Safety & Care',
    description: 'Understand how Ayana Outdoors thinks about preparation, supervision, parent communication and safe outdoor learning.',
    link: '/safety-care',
    icon: ShieldCheck,
  },
  {
    title: 'Founder Story',
    description: 'Read about Mountain Manju and the vision behind helping children grow beyond the classroom.',
    link: '/founder',
    icon: BookOpen,
  },
  {
    title: 'Sankalpa',
    description: 'Explore the Ayana Outdoors commitment to meaningful, responsible and accessible outdoor learning.',
    link: '/sankalpa',
    icon: HeartHandshake,
  },
];

export default function Resources() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Resources</h1>
        <HomeSectionHeader
          eyebrow="Resources"
          title="Helpful Guidance for"
          highlight="Every Journey"
          description="Find parent and school resources that help you understand outdoor learning, safety, preparation and the Ayana Outdoors approach."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {resources.map((resource) => (
            <ClickableHomeCard key={resource.title} link={resource.link} ariaLabel={`Open ${resource.title}`}>
              <resource.icon className="h-9 w-9 text-primary mb-5" />
              <h2 className="font-display text-xl text-white mb-3">{resource.title}</h2>
              <p className="font-body text-sm md:text-base text-white/90 font-semibold pr-8">{resource.description}</p>
            </ClickableHomeCard>
          ))}
        </div>
      </div>
    </main>
  );
}
