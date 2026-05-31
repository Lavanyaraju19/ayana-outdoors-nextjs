import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const reviews = [
  { name: 'Priya Sharma', text: 'My son came back a completely different kid — more confident, independent, and full of stories! Best camp experience ever.', rating: 5 },
  { name: 'Rajesh Kumar', text: 'The safety measures are top-notch. As a parent, I felt completely at ease knowing my daughter was in great hands.', rating: 5 },
  { name: 'Anita Desai', text: 'Ayana Outdoors transformed our family weekends. The Skandagiri night trek was absolutely magical!', rating: 5 },
  { name: 'Vikram Reddy', text: 'Professional, well-organized, and genuinely passionate about what they do. Highly recommend for all age groups.', rating: 5 },
];

const faqs = [
  { q: 'What age groups are your programs designed for?', a: 'Our programs cater to children aged 6–16 years. We have age-appropriate activities and groups to ensure every child has the best experience.' },
  { q: 'What safety measures do you have in place?', a: 'We maintain a 1:5 instructor-to-child ratio, carry first-aid kits, have emergency evacuation plans, and all our guides are certified wilderness first responders.' },
  { q: 'What should my child pack for a camp?', a: 'We provide a detailed packing list after booking. Essentials include comfortable clothing, sturdy shoes, sunscreen, water bottle, and any personal medications.' },
  { q: 'Can parents accompany their children?', a: 'For Summer Camps, children attend independently. Weekend treks offer family-friendly options where parents can join.' },
  { q: 'What is the cancellation policy?', a: 'Full refund if cancelled 15+ days before the trip. 50% refund for 7–14 days. No refund within 7 days of the trip date.' },
  { q: 'Are meals included in the program fee?', a: 'Yes, all meals are included — vegetarian and non-vegetarian options available. We accommodate dietary restrictions with prior notice.' },
  { q: 'How do I track my booking status?', a: 'After booking, you\'ll receive a confirmation email. You can also log in to your account to track your booking status and upload any pending documents.' },
];

const ReviewsFAQ = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((p) => (p + 1) % reviews.length);
  const prevReview = () => setCurrentReview((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-8 md:p-12 mb-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl text-foreground mb-8">What Parents <span className="text-primary">Say</span></h2>
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: reviews[currentReview].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/90 font-body text-lg italic mb-4">"{reviews[currentReview].text}"</p>
            <p className="text-primary font-body font-medium">{reviews[currentReview].name}</p>
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={prevReview} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-none">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextReview} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-none">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl text-center text-foreground mb-8">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg px-5">
                <AccordionTrigger className="font-body text-sm text-foreground hover:text-primary cursor-none py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsFAQ;
