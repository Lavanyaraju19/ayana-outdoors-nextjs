"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const StickyEnquiryButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-6 left-4 right-24 z-40 md:left-6 md:right-auto"
    >
      <Link
        href="/contact"
        className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-primary/50 bg-background/85 px-5 py-3 font-display text-sm uppercase tracking-wider text-primary shadow-2xl shadow-primary/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground cursor-none"
      >
        <MessageCircle className="h-4 w-4" />
        Enquire
      </Link>
    </motion.div>
  );
};

export default StickyEnquiryButton;
