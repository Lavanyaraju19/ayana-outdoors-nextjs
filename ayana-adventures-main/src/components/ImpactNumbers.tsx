"use client";

import { useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Mountain, Route, School } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { ImpactStat } from '@/lib/content';

const icons = [Award, GraduationCap, Mountain, Route, School];

const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const hasNumber = !Number.isNaN(numericValue);

  const count = useMotionValue(0);
  const springValue = useSpring(count, { stiffness: 45, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && hasNumber) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count, hasNumber]);

  if (!hasNumber) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const ImpactNumbers = ({ stats }: { stats: ImpactStat[] }) => {
  return (
    <section id="impact" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Our Journey in Numbers"
          title="Outdoor education with"
          highlight="measurable trust"
          description="Ayana Outdoors positions adventure as a child-development journey for confidence, leadership and real-world learning."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = icons[index] || GraduationCap;

            return (
              <ClickableHomeCard key={stat.id} link="/about" ariaLabel={`Learn about ${stat.label}`} className="text-center">
                <Icon className="w-9 h-9 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <div className="font-display text-3xl md:text-4xl text-primary mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <h3 className="font-display text-base text-white mb-2">{stat.label}</h3>
                <p className="font-body text-sm text-white/90 font-semibold">{stat.description}</p>
              </ClickableHomeCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
