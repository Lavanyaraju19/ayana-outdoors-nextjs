"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ClickableHomeCard from '@/components/ClickableHomeCard';
import HomeSectionHeader from '@/components/HomeSectionHeader';
import type { HomeCardItem } from '@/lib/content';

const WhoWeJourneyWithContent = ({ items }: { items: HomeCardItem[] }) => {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-white/10 p-6 md:p-8 shadow-2xl shadow-black/25 backdrop-blur-xl mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-white mb-3">Introduction</h2>
        <p className="font-body text-white/90 font-semibold leading-relaxed">
          Whether you're a child taking your first outdoor adventure, a family exploring together or a school looking beyond the classroom, Ayana Outdoors creates meaningful outdoor learning experiences for every journey.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {items.map((item) => (
          <ClickableHomeCard key={item.id} link="/contact" ariaLabel={`Connect about ${item.title}`}>
            <h2 className="font-display text-xl text-white mb-3">{item.title}</h2>
            <p className="font-body text-sm md:text-base text-white/90 font-semibold pr-8">{item.description}</p>
          </ClickableHomeCard>
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
        {items.map((item, index) => (
          <motion.article
            key={`${item.id}-detail`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ delay: index * 0.06 }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
          >
            <h2 className="font-display text-2xl text-primary mb-3">{item.title}</h2>
            <p className="font-body text-white/90 font-semibold leading-relaxed">{item.description}</p>
          </motion.article>
        ))}
      </section>

      <section className="mb-12">
        <HomeSectionHeader
          eyebrow="Why Outdoor Learning Works"
          title="Outdoor Learning for Every"
          highlight="Stage of Growing Up"
          description="Whether you're a child taking your first outdoor adventure, a family exploring together or a school looking beyond the classroom, Ayana Outdoors creates meaningful outdoor learning experiences for every journey."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={`${item.id}-works`} className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
              <p className="font-body text-sm md:text-base text-white/90 font-semibold">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <motion.section initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl border border-primary/30 bg-primary/10 p-6 md:p-8 text-center shadow-2xl shadow-primary/10 mb-10">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Who We Journey With</h2>
        <p className="font-body text-white/90 font-semibold max-w-2xl mx-auto mb-6">
          Whether you're a child taking your first outdoor adventure, a family exploring together or a school looking beyond the classroom, Ayana Outdoors creates meaningful outdoor learning experiences for every journey.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
          <Link href="/contact">Talk to Us</Link>
        </Button>
      </motion.section>

      <section className="rounded-3xl border border-white/15 bg-white/10 p-6 md:p-8 text-center shadow-2xl shadow-black/25 backdrop-blur-xl">
        <h2 className="font-display text-3xl text-white mb-3">Let's Plan Your Child's Outdoor Learning Journey</h2>
        <p className="font-body text-white/90 font-semibold max-w-2xl mx-auto mb-6">
          Whether you're a parent, school or organisation, we're here to help you choose the right outdoor learning experience. Let's start the conversation.
        </p>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 cursor-none">
          <Link href="/contact">Talk to Us</Link>
        </Button>
      </section>
    </>
  );
};

export default WhoWeJourneyWithContent;
