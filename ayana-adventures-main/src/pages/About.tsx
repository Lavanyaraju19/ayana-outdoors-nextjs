import { motion } from 'framer-motion';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const About = () => {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
            About <span className="text-primary">Ayana</span>
          </h1>
          <p className="font-body text-lg text-white/80">
            Building confident, nature-loving young explorers since 2015.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 font-body text-foreground/80 leading-relaxed">
          <p>
            Ayana Outdoors was founded with a simple belief: every child deserves the transformative power of nature. Over 11 years, we've taken more than 2,000 Himalayan kids and impacted 9,000+ children through our carefully designed outdoor programs.
          </p>
          <p>
            Our team consists of certified wilderness guides, child psychologists, and adventure sports experts who create safe, enriching experiences. From summer camps in the Western Ghats to weekend treks around Bangalore, every journey is crafted to build resilience, confidence, and a deep respect for the environment.
          </p>
          <p>
            We maintain a 100% safety record through rigorous protocols, trained first responders, and a commitment to responsible adventure. Parents trust us because we treat every child as our own.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
