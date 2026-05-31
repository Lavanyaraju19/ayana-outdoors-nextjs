import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { summerCamps } from '@/data/treks';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const SummerCamp = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Summer Camp <span className="text-primary">2026</span>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto shadow-sm">
            Immersive outdoor camps designed to build confidence, resilience, and a love for nature in young explorers.
          </p>
        </motion.div>

        <div className="flex items-center justify-end mb-4 gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory px-4 -mx-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {summerCamps.map((camp, i) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-[280px] h-[350px] snap-start bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group flex-shrink-0 shadow-2xl relative"
            >
              <img
                src={camp.image}
                alt={camp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-body font-semibold z-10">
                {camp.price}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="font-display text-lg text-white mb-1 leading-tight">{camp.title}</h3>
                <div className="flex flex-wrap gap-3 text-[10px] text-white/90 font-body mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{camp.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{camp.duration}</span>
                </div>
                <Link to={`/summer-camp/${camp.id}`}>
                  <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-xs w-full h-9 cursor-none backdrop-blur-sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SummerCamp;
