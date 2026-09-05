"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClickableHomeCardProps {
  link: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
}

const MotionLink = motion.create(Link);

const isExternalLink = (link: string) => (
  link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:')
);

const ClickableHomeCard = ({ link, children, className, ariaLabel }: ClickableHomeCardProps) => {
  const cardClasses = cn(
    'group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/15 hover:shadow-primary/15 cursor-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    className,
  );

  const content = (
    <>
      <span className="absolute right-4 top-4 rounded-full border border-primary/30 bg-primary/10 p-2 text-primary opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>
      {children}
    </>
  );

  if (isExternalLink(link)) {
    return (
      <motion.a
        href={link}
        target={link.startsWith('http') ? '_blank' : undefined}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cardClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={link}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cardClasses}
    >
      {content}
    </MotionLink>
  );
};

export default ClickableHomeCard;
