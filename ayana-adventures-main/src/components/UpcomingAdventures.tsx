"use client";

import type { KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Gauge, GraduationCap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeSectionHeader from './HomeSectionHeader';
import type { Adventure } from '@/lib/content';

const stopCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.stopPropagation();
};

const UpcomingAdventures = ({ adventures }: { adventures: Adventure[] }) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(checkScroll, 450);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, link: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(link);
    }
  };

  return (
    <section id="adventures" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Upcoming Adventures"
          title="Choose the right"
          highlight="growth journey"
          description="Each adventure card gives parents the quick decision details they need: purpose, duration, difficulty and age readiness."
        />

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-body text-sm md:text-base text-white/90 font-semibold">
            Swipe, scroll, or use arrows to explore treks, trips and camps.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll adventures left"
              className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll adventures right"
              className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-1 -mx-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {adventures.map((adventure, index) => (
            <motion.article
              key={adventure.id}
              role="link"
              tabIndex={0}
              aria-label={`Learn more about ${adventure.title}`}
              onClick={() => router.push(adventure.learn_link)}
              onKeyDown={(event) => handleKeyDown(event, adventure.learn_link)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -8 }}
              className="group w-[84vw] sm:w-[360px] lg:w-[380px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-black/25 backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:bg-white/15 hover:shadow-primary/15 cursor-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={adventure.image_path}
                  alt={`${adventure.title} outdoor learning program`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 360px, 84vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl text-white group-hover:text-primary transition-colors">{adventure.title}</h3>
                <p className="font-body text-sm text-white/90 font-semibold mt-3 min-h-20">{adventure.description}</p>

                <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white font-semibold">
                  <span className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2 backdrop-blur-md">
                    <Clock className="h-4 w-4 text-primary" />
                    {adventure.duration}
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2 backdrop-blur-md">
                    <Gauge className="h-4 w-4 text-primary" />
                    {adventure.difficulty}
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2 backdrop-blur-md">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {adventure.age_group}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full cursor-none">
                    <Link href={adventure.learn_link} onClick={stopCardClick}>
                      Learn More
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-accent rounded-full cursor-none">
                    <Link href={adventure.enquiry_link} onClick={stopCardClick}>
                      <MessageCircle className="h-4 w-4" />
                      Talk to Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAdventures;
