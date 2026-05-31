import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const Programs = () => {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl text-white mb-4">
          Our <span className="text-primary">Programs</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-body text-lg text-white/80 mb-8">
          Choose from our curated outdoor experiences designed for every age and adventure level.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-primary mb-3">Summer Camp 2026</h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Multi-day immersive camps in the mountains and forests. Perfect for building independence and outdoor skills.</p>
            <Link to="/summer-camp">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full cursor-none">
                Explore Camps →
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-primary mb-3">Weekend Treks 2026</h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Quick weekend adventures around Bangalore. Perfect for families and first-time trekkers.</p>
            <Link to="/weekend-treks">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full cursor-none">
                Explore Treks →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Programs;
