import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HomeSectionHeader from './HomeSectionHeader';
import type { FaqItem } from '@/lib/content';

const FAQSection = ({ items }: { items: FaqItem[] }) => {
  return (
    <section id="faqs" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything Parents & Schools"
          highlight="Want to Know"
          description="Find quick answers about our outdoor learning programs, safety standards and how we create meaningful experiences for children, families and schools."
        />

        <p className="font-body text-sm md:text-base text-white/90 font-semibold text-center max-w-3xl mx-auto mb-8">
          Still have a question? Our team is always happy to help you choose the right outdoor learning experience.
        </p>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
          {items.map((faq, index) => (
            <AccordionItem key={faq.id} value={`faq-${index}`} className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-lg px-5 shadow-xl shadow-black/20">
              <AccordionTrigger className="font-body text-sm text-white hover:text-primary cursor-none py-4 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-white/90 font-semibold pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
            <Link href="/resources/faqs">View All FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
