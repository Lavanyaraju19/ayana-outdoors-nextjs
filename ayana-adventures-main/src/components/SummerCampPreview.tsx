import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import trek1 from '@/assets/trek-1.jpg';
import campHero from '@/assets/camp-hero.jpg';
import trek3 from '@/assets/trek-3.jpg';

const camps = [
  { id: 'himalayan-adventure', title: 'Himalayan Adventure Camp', image: trek1, price: '₹15,999', date: 'May 15 – May 22, 2026', duration: '8 Days', description: 'An immersive trek through the majestic Himalayan trails with camping under the stars.' },
  { id: 'western-ghats-explorer', title: 'Western Ghats Explorer', image: campHero, price: '₹12,499', date: 'Jun 1 – Jun 7, 2026', duration: '7 Days', description: 'Discover the biodiversity of the Western Ghats with guided nature walks and wildlife spotting.' },
  { id: 'coorg-wilderness', title: 'Coorg Wilderness Camp', image: trek3, price: '₹11,999', date: 'Jun 15 – Jun 21, 2026', duration: '7 Days', description: 'Riverside camping, waterfall trekking, and adventure sports in the Scotland of India.' },
];

const SummerCampPreview = () => {
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
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl text-foreground">
            Summer Camp <span className="text-primary">2026</span>
          </motion.h2>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {camps.map((camp, i) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[280px] h-[350px] snap-start bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden group flex-shrink-0 shadow-lg relative"
            >
              <img
                src={camp.image}
                alt={camp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

        <div className="text-center mt-8">
          <Link to="/summer-camp">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 cursor-none">View All Summer Camps →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SummerCampPreview;
