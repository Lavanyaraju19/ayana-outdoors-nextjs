import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Activity, Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allTreks } from '@/data/treks';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const TrekDetail = () => {
  const { id } = useParams<{ id: string }>();
  const trek = allTreks.find((t) => t.id === id);

  if (!trek) {
    return (
      <main className="relative z-10 pt-24 pb-20 text-center min-h-screen">
        <PageBackgroundVideo />
        <div className="relative z-10">
          <h1 className="font-display text-3xl text-white">Trek not found</h1>
          <Link to="/" className="text-primary font-body mt-4 inline-block">Go Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img src={trek.image} alt={trek.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="font-display text-3xl md:text-5xl text-foreground mb-2">{trek.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-foreground/80 font-body">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trek.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{trek.duration}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{trek.ageGroup}</span>
              <span className="flex items-center gap-1"><Activity className="w-4 h-4" />{trek.fitnessLevel}</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-display text-xl">{trek.price}</div>
        </motion.div>

        {/* Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="font-display text-2xl text-foreground mb-3">Overview</h2>
          <p className="font-body text-muted-foreground leading-relaxed">{trek.overview}</p>
        </motion.section>

        {/* Highlights */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="font-display text-2xl text-foreground mb-3">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {trek.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />{h}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Itinerary */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="font-display text-2xl text-foreground mb-4">Day-wise Itinerary</h2>
          <div className="space-y-3">
            {trek.itinerary.map((item) => (
              <div key={item.day} className="bg-card/60 border border-border/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground text-xs font-body font-semibold px-2 py-1 rounded flex-shrink-0">{item.day}</span>
                  <div>
                    <h4 className="font-display text-sm text-foreground">{item.title}</h4>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Inclusions / Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="font-display text-xl text-foreground mb-3">Inclusions</h2>
            <div className="space-y-2">
              {trek.inclusions.map((item) => (
                <div key={item} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />{item}
                </div>
              ))}
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="font-display text-xl text-foreground mb-3">Exclusions</h2>
            <div className="space-y-2">
              {trek.exclusions.map((item) => (
                <div key={item} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />{item}
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Safety */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />Safety Measures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {trek.safety.map((s) => (
              <div key={s} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />{s}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Book Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-center">
          <Link to={`/booking/${trek.id}`}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-12 py-6 text-lg font-body cursor-none">
              Book This {trek.category === 'summer-camp' ? 'Camp' : 'Trek'} — {trek.price}
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default TrekDetail;
