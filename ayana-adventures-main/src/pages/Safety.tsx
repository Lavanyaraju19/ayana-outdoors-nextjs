import { motion } from 'framer-motion';
import { ShieldCheck, Users, Radio, CloudSun, Heart, Phone, Award, AlertTriangle } from 'lucide-react';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const safetyItems = [
  { icon: Users, title: '1:5 Instructor Ratio', description: 'Every group of 5 children is supervised by a certified instructor ensuring personalized attention and safety at all times.' },
  { icon: Heart, title: 'Certified First Responders', description: 'All our trek leaders are certified in wilderness first aid and carry comprehensive medical kits on every expedition.' },
  { icon: Radio, title: 'Satellite Communication', description: 'We carry satellite phones and GPS trackers on every trek for emergency communication in remote areas.' },
  { icon: CloudSun, title: 'Weather Monitoring', description: 'Real-time weather monitoring systems help us make informed decisions about route changes and safety protocols.' },
  { icon: AlertTriangle, title: 'Emergency Evacuation', description: 'Pre-planned evacuation routes and partnerships with local rescue services ensure rapid response in emergencies.' },
  { icon: Phone, title: 'Parent Updates', description: 'Regular WhatsApp updates and photo sharing keep parents informed throughout the journey.' },
  { icon: Award, title: 'Safety Certifications', description: 'Our organization holds certifications from the Adventure Tour Operators Association of India (ATOAI).' },
  { icon: ShieldCheck, title: 'Equipment Standards', description: 'All safety gear is ISI/CE certified and regularly inspected. Life jackets, helmets, and harnesses are mandatory for relevant activities.' },
];

const Safety = () => {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
            Your Child's <span className="text-primary">Safety</span>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto shadow-sm">
            Safety is not just a priority — it's our promise. Every expedition is backed by rigorous protocols, trained professionals, and industry-leading standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-green rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">100% Safety Record</h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            In over 11 years and 9000+ children impacted, we maintain a spotless safety record. Every child who joins us returns home with unforgettable memories and zero incidents.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Safety;
