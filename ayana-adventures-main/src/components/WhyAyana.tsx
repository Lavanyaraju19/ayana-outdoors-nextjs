import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Shield, Mountain, Users, Award, LucideIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Users, value: '2000+', label: 'Himalayan Kids' },
  { icon: Award, value: '11+', label: 'Years Experience' },
  { icon: Shield, value: '100%', label: 'Safety Record' },
  { icon: Mountain, value: '9000+', label: 'Children Impacted' },
];

const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const springValue = useSpring(count, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const WhyAyana = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl text-center text-foreground mb-4"
        >
          Why <span className="text-primary">Ayana</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-12"
        >
          For over a decade, we've been shaping young adventurers through immersive outdoor experiences. Our commitment to safety, learning, and fun makes every journey transformative.
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-display text-3xl text-primary mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAyana;

