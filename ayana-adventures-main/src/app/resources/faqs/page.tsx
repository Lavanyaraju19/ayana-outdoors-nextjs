import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HomeSectionHeader from '@/components/HomeSectionHeader';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import { getAdditionalFaqQuestions, getFaqItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers about Ayana Outdoors outdoor learning programs, safety standards, preparation, children, families and schools.',
  alternates: { canonical: '/resources/faqs' },
  openGraph: {
    title: 'Frequently Asked Questions | Ayana Outdoors',
    description: 'Answers for parents and schools about outdoor learning, safety, preparation and program fit.',
  },
};

export default async function ResourcesFAQ() {
  const [faqItems, additionalFAQQuestions] = await Promise.all([getFaqItems(), getAdditionalFaqQuestions()]);

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Frequently Asked Questions</h1>
        <HomeSectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything Parents & Schools"
          highlight="Want to Know"
          description="Find quick answers about our outdoor learning programs, safety standards and how we create meaningful experiences for children, families and schools."
        />

        <p className="font-body text-sm md:text-base text-white/90 font-semibold text-center max-w-3xl mx-auto mb-8">
          Still have a question? Our team is always happy to help you choose the right outdoor learning experience.
        </p>

        <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-3">
          {faqItems.map((faq, index) => (
            <AccordionItem key={faq.id} value={`faq-${index}`} className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-lg px-5 shadow-xl shadow-black/20">
              <AccordionTrigger className="font-body text-sm md:text-base text-white hover:text-primary cursor-none py-4 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-white/90 font-semibold pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-6 text-center">
            Additional Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalFAQQuestions.map((faq) => (
              <div key={faq.id} className="rounded-lg border border-white/15 bg-white/10 px-5 py-4 shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="font-body text-sm md:text-base text-white font-semibold">{faq.question}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
            <Link href="/contact">Talk to Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 cursor-none">
            <Link href="/adventures">Explore Upcoming Adventures</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
