"use client";

import Link from 'next/link';
import { FileText, Instagram, Newspaper, PlayCircle, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { HomeCardItem } from '@/lib/content';

const icons = [Instagram, PlayCircle, Youtube, Newspaper, FileText];

const InstagramMedia = ({ items }: { items: HomeCardItem[] }) => {
  return (
    <section id="media" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Stories & Media"
          title="Follow the"
          highlight="learning in motion"
          description="Explore social updates, video stories, articles and media coverage that share the Ayana Outdoors journey with families, schools and children."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <ClickableHomeCard key={item.id} link={item.link} ariaLabel={`Open ${item.title}`}>
                <Icon className="h-9 w-9 text-primary mb-5" />
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white/90 font-semibold pr-8">{item.description}</p>
              </ClickableHomeCard>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 cursor-none">
            <a href="https://instagram.com/ayanaoutdoors" target="_blank" rel="noopener noreferrer">Open Instagram</a>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
            <Link href="/contact">Submit Media Enquiry</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramMedia;
