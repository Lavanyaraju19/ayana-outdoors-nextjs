"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartHandshake, Leaf, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClickableHomeCard from '@/components/ClickableHomeCard';

const commitments = [
  {
    title: 'Meaningful Outdoor Learning',
    description: 'Every journey is designed to help children build confidence, leadership, independence and practical life skills through real experiences.',
    icon: Leaf,
  },
  {
    title: 'Safety & Care First',
    description: 'Every experience is planned around age, readiness, route preparation, supervision, parent communication and emotional care.',
    icon: ShieldCheck,
  },
  {
    title: 'Community & Responsibility',
    description: 'Children learn to respect people, places, communities, traditions, biodiversity and the natural world they journey through.',
    icon: Users,
  },
];

const SankalpaContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {commitments.map((commitment) => (
          <ClickableHomeCard key={commitment.title} link="/contact" ariaLabel={`Connect about ${commitment.title}`}>
            <commitment.icon className="h-9 w-9 text-primary mb-5" />
            <h2 className="font-display text-xl text-white mb-3">{commitment.title}</h2>
            <p className="font-body text-sm md:text-base text-white/90 font-semibold pr-8">{commitment.description}</p>
          </ClickableHomeCard>
        ))}
      </div>

      <motion.section initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-primary/10 p-6 md:p-8 text-center shadow-2xl shadow-primary/10">
        <HeartHandshake className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">A Shared Step Forward</h2>
        <p className="font-body text-white/90 font-semibold max-w-2xl mx-auto mb-6">
          We journey with children, parents, teachers and communities so outdoor learning becomes a source of confidence, connection and responsibility.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
          <Link href="/contact">Talk to Us</Link>
        </Button>
      </motion.section>
    </>
  );
};

export default SankalpaContent;
