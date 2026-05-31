import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import trek2 from '@/assets/trek-2.jpg';
import trek3 from '@/assets/trek-3.jpg';
import trek4 from '@/assets/trek-4.jpg';

const treks = [
  { id: 'skandagiri-night-trek', title: 'Skandagiri Night Trek', image: trek2, price: '₹2,499', date: 'Every Weekend', duration: '1 Night', description: 'Experience the magic of a night trek to Skandagiri peak and witness a breathtaking sunrise above the clouds.' },
  { id: 'bheemeshwari-riverside', title: 'Bheemeshwari Riverside', image: trek3, price: '₹3,499', date: 'Sat–Sun', duration: '2 Days', description: 'Riverside camping, kayaking, and nature walks at the beautiful Bheemeshwari nature camp.' },
  { id: 'savandurga-hill-trek', title: 'Savandurga Hill Trek', image: trek4, price: '₹1,999', date: 'Every Saturday', duration: '1 Day', description: 'Conquer one of the largest monolith hills in Asia with panoramic views of the surrounding landscape.' },
];

const WeekendTreksPreview = () => {
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
            Weekend Treks <span className="text-primary">2026</span>
          </motion.h2>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 cursor-none"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {treks.map((trek, i) => (
            <motion.div
              key={trek.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[280px] h-[350px] snap-start bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden group flex-shrink-0 shadow-lg relative"
            >
              <img
                src={trek.image}
                alt={trek.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-body font-semibold z-10">
                {trek.price}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="font-display text-lg text-white mb-1 leading-tight">{trek.title}</h3>
                <div className="flex flex-wrap gap-3 text-[10px] text-white/90 font-body mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{trek.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trek.duration}</span>
                </div>
                <Link to={`/weekend-treks/${trek.id}`}>
                  <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-xs w-full h-9 cursor-none backdrop-blur-sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/weekend-treks">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 cursor-none">View All Weekend Treks →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeekendTreksPreview;
