"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HomeSectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  suffix?: string;
  description: string;
  align?: 'left' | 'center';
  className?: string;
}

const HomeSectionHeader = ({
  eyebrow,
  title,
  highlight,
  suffix,
  description,
  align = 'center',
  className,
}: HomeSectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('mb-10', align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl', className)}
    >
      <p className="font-body text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
        {title} <span className="text-primary">{highlight}</span>{suffix ? ` ${suffix}` : ''}
      </h2>
      <p className="font-body text-base md:text-lg text-white/90 font-semibold mt-4">{description}</p>
    </motion.div>
  );
};

export default HomeSectionHeader;
