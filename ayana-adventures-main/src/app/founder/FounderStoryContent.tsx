"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Mountain, Quote, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FounderFact } from '@/lib/content';

const icons = [Award, Mountain, Users];

const FounderStoryContent = ({ facts }: { facts: FounderFact[] }) => {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-white/10 p-6 md:p-8 shadow-2xl shadow-black/25 backdrop-blur-xl mb-10">
        <p className="font-display text-3xl text-primary mb-2">Mountain Manju</p>
        <p className="font-body text-white/90 font-semibold mb-6">Founder • Outdoor Educator • NIM Certified Trek Leader</p>
        <p className="font-body text-white/90 font-semibold leading-relaxed">
          Mountain Manju created Ayana Outdoors to help children learn beyond walls, screens and routine. His work brings trekking, travel and outdoor experiences together so children discover confidence, responsibility, resilience and connection with nature.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {facts.map((fact, index) => {
          const Icon = icons[index % icons.length];

          return (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-display text-xl text-white mb-2">{fact.title}</h2>
              {fact.subtitle && <p className="font-body text-sm text-white/90 font-semibold">{fact.subtitle}</p>}
            </motion.div>
          );
        })}
      </div>

      <motion.section initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-primary/10 p-6 md:p-8 shadow-2xl shadow-primary/10 mb-10">
        <Quote className="h-9 w-9 text-primary mb-4" />
        <p className="font-display text-2xl md:text-3xl leading-tight text-white">
          &ldquo;The greatest classroom has no walls. It is found in the mountains, forests, rivers and the journeys that shape young lives.&rdquo;
        </p>
      </motion.section>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
          <Link href="/adventures">Find the Right Program</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 cursor-none">
          <Link href="/contact">Talk to Us</Link>
        </Button>
      </div>
    </>
  );
};

export default FounderStoryContent;
