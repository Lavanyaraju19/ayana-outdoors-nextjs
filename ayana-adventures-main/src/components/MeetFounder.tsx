"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, MapPinned, Mountain, Quote, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeSectionHeader from './HomeSectionHeader';
import type { FounderFact } from '@/lib/content';

const icons = [Award, Mountain, Users];

const MeetFounder = ({ facts }: { facts: FounderFact[] }) => {
  return (
    <section id="founder" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Meet the Founder"
          title="The Vision Behind"
          highlight="Ayana Outdoors"
          description="For over a decade, Mountain Manju has dedicated his life to helping children learn, grow and discover themselves through nature. His vision is simple: every child deserves the opportunity to learn beyond the classroom."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/25"
        >
          <div className="relative min-h-80">
            <Image
              src="/images/trek-1.jpg"
              alt="Mountain landscape representing Mountain Manju and Ayana Outdoors leadership"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-primary/30 bg-background/70 p-4 backdrop-blur-md">
              <p className="font-display text-2xl text-primary">Mountain Manju</p>
              <p className="font-body text-sm text-white/90 font-semibold">Founder • Outdoor Educator • NIM Certified Trek Leader</p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {facts.map((fact, index) => {
                const Icon = icons[index % icons.length] || MapPinned;

                return (
                  <Link
                    key={fact.id}
                    href="/founder"
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary cursor-none"
                  >
                    <Icon className="h-7 w-7 text-primary mb-3" />
                    <span className="font-body text-sm text-white font-semibold">{fact.title}</span>
                    {fact.subtitle && (
                      <span className="font-body text-xs text-white/75 font-semibold block mt-2">{fact.subtitle}</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6">
              <Quote className="h-9 w-9 text-primary mb-4" />
              <p className="font-display text-2xl md:text-3xl leading-tight text-white">
                &ldquo;The greatest classroom has no walls. It is found in the mountains, forests, rivers and the journeys that shape young lives.&rdquo;
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 py-6 cursor-none">
                <Link href="/founder">Read My Story</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 cursor-none">
                <Link href="/adventures">Find the Right Program</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetFounder;
