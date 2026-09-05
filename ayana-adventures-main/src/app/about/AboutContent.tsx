"use client";

import { motion } from 'framer-motion';

const AboutContent = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
          Who <span className="text-primary">We Are</span>
        </h1>
        <p className="font-body text-lg text-white/80">
          Helping children grow beyond the classroom.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 font-body text-foreground/80 leading-relaxed">
        <p>
          Ayana Outdoors was founded with a simple belief: every child deserves the opportunity to learn beyond the classroom. We create trekking, travel and outdoor experiences that help children build confidence, leadership, independence and a lifelong love for nature.
        </p>
        <p>
          Our journeys are designed for children, families, schools and teachers who believe learning happens through real places, real challenges and meaningful relationships. Forests, rivers, mountains, communities and different landscapes become living classrooms.
        </p>
        <p>
          Safety, care and learning guide every decision we make. Every experience is planned around age, readiness, interests and learning goals so each journey is safe, meaningful and memorable.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutContent;
