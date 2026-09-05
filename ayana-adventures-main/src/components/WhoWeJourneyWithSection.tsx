import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { HomeCardItem } from '@/lib/content';

const WhoWeJourneyWithSection = ({ items }: { items: HomeCardItem[] }) => {
  return (
    <section id="journey-with" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Who We Journey With"
          title="Outdoor Learning for Every"
          highlight="Stage of Growing Up"
          description="Whether you're a child taking your first outdoor adventure, a family exploring together or a school looking beyond the classroom, Ayana Outdoors creates meaningful outdoor learning experiences for every journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <ClickableHomeCard key={item.id} link={item.link} ariaLabel={`Explore ${item.title}`}>
              <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
              <p className="font-body text-sm md:text-base text-white/90 font-semibold pr-8">{item.description}</p>
            </ClickableHomeCard>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 cursor-none">
            <Link href="/who-we-journey-with">Explore Who We Journey With</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeJourneyWithSection;
