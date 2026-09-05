"use client";

import Link from 'next/link';
import { ArrowDown, Compass, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { HeroContent } from '@/lib/content';

const HeroSection = (props: HeroContent) => {
  const scrollToImpact = () => {
    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative z-10 min-h-[100svh] min-h-[100dvh] w-full flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex max-w-[95vw] items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur-sm sm:mb-8 sm:px-5 sm:text-xs sm:tracking-[0.3em]"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            {props.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display mb-6 text-4xl leading-tight text-foreground sm:mb-8 sm:text-5xl md:text-7xl lg:text-8xl"
          >
            {props.headline} <span className="text-primary">{props.headline_highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body mx-auto mb-8 max-w-3xl px-1 text-base font-semibold text-white/90 sm:mb-10 sm:text-xl md:text-2xl"
          >
            {props.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-3"
          >
            {props.highlights.map((highlight) => (
              <Link
                key={highlight}
                href="/adventures"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-primary/15 cursor-none sm:px-5 sm:py-4 sm:text-base"
              >
                {highlight}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button asChild size="lg" aria-label={props.cta_primary_label} className="w-full bg-primary text-primary-foreground hover:bg-accent rounded-full px-6 py-5 text-sm font-body tracking-wider cursor-none gap-2 sm:w-auto sm:px-10 sm:py-6 sm:text-base">
              <Link href={props.cta_primary_link}>
                <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
                {props.cta_primary_label}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" aria-label={props.cta_secondary_label} className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 py-5 text-sm font-body tracking-wider cursor-none gap-2 sm:w-auto sm:px-10 sm:py-6 sm:text-base">
              <Link href={props.cta_secondary_link}>
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                {props.cta_secondary_label}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full text-white hover:text-primary hover:bg-primary/10 rounded-full px-6 py-5 text-sm font-body tracking-wider cursor-none gap-2 sm:w-auto sm:px-8 sm:py-6 sm:text-base">
              <Link href={props.cta_tertiary_link}>
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                {props.cta_tertiary_label}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToImpact}
        className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-none"
        aria-label="Explore More"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
        Explore More
      </button>
    </section>
  );
};

export default HeroSection;
