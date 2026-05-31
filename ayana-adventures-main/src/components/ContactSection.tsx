import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section className="relative z-10 py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-foreground mb-4"
        >
          Begin the <span className="text-primary">Journey</span>
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-xl md:text-2xl text-primary mb-4"
        >
          Ready for an Adventure?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-8"
        >
          Every great story begins with a single step into the unknown
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/booking">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-10 py-6 text-base font-body tracking-wider cursor-none">
              BOOK NOW
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-6 text-base font-body tracking-wider cursor-none">
              GET IN TOUCH
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
