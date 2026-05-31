import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight"
        >
          Explore the <span className="text-primary">Wild</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Adventure camps and treks designed for young explorers. Building courage, resilience, and lifelong memories in nature.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/programs">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 text-base font-body tracking-wider cursor-none gap-2">
              <Compass className="w-5 h-5" />
              PICK MY TREK
            </Button>
          </Link>
          <Link to="/safety">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 text-base font-body tracking-wider cursor-none gap-2">
              <ShieldCheck className="w-5 h-5" />
              SAFETY
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
