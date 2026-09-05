import { GraduationCap, Heart, MessageSquareQuote, PlayCircle } from 'lucide-react';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { HomeCardItem } from '@/lib/content';

const icons = [Heart, MessageSquareQuote, PlayCircle, GraduationCap];

const TestimonialsSection = ({ items }: { items: HomeCardItem[] }) => {
  return (
    <section id="testimonials" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Voices from Our Community"
          title="Trusted by Families. Valued by Schools."
          highlight="Loved by Children."
          description="Hear from parents, children and educators who have experienced the impact of outdoor learning with Ayana Outdoors."
        />

        <p className="font-body text-sm md:text-base text-white/90 font-semibold text-center max-w-3xl mx-auto mb-8">
          Every story shared here comes from real families, children and schools who have participated in Ayana Outdoors programs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <ClickableHomeCard key={item.id} link={item.link} ariaLabel={`Open ${item.title}`}>
                <Icon className="h-9 w-9 text-primary mb-5" />
                {item.label && (
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-4">
                    {item.label}
                  </span>
                )}
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

export default TestimonialsSection;
