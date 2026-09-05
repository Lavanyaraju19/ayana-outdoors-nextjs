import { Brain, Leaf, Lightbulb, ShieldCheck, Smartphone, Users } from 'lucide-react';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { HomeCardItem } from '@/lib/content';

const icons = [ShieldCheck, Users, Lightbulb, Leaf, Smartphone, Brain];

const WhyAyanaOutdoors = ({ items }: { items: HomeCardItem[] }) => {
  return (
    <section id="why" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Why Ayana Outdoors"
          title="More Than Adventure."
          highlight="Learning for Life."
          description="We use trekking, travel and real-world experiences to help children understand themselves, discover the world and grow into confident, responsible individuals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <ClickableHomeCard key={item.id} link={item.link} ariaLabel={`Explore ${item.title}`}>
                <Icon className="h-9 w-9 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-sm md:text-base text-white/90 font-semibold pr-8">{item.description}</p>
              </ClickableHomeCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAyanaOutdoors;
