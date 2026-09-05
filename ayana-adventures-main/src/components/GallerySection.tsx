import Image from 'next/image';
import { Camera, Play } from 'lucide-react';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import type { GalleryItem } from '@/lib/content';

const GallerySection = ({ items }: { items: GalleryItem[] }) => {
  return (
    <section id="gallery" className="relative z-10 py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Gallery"
          title="See the outdoor"
          highlight="classroom"
          description="Photos and videos help parents understand the real program feel: Himalayan memories, beach camps and Western Ghats adventures."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((item) => (
            <ClickableHomeCard key={item.id} link={item.link} ariaLabel={`Open ${item.title}`} className="p-0">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image_path}
                  alt={`${item.title} from Ayana Outdoors`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-primary/90 p-3 text-primary-foreground">
                  {item.title === 'Videos' ? <Play className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white/90 font-semibold pr-8">{item.description}</p>
              </div>
            </ClickableHomeCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
