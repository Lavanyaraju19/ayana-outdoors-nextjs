import { Phone, Mail, Globe, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 md:py-10" style={{ background: 'linear-gradient(135deg, #1F5E3A, #2E7D4F)' }}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <p className="font-body text-xs text-primary uppercase tracking-widest mb-1 opacity-80">By Ayana Outdoors</p>
        <h2 className="font-display text-[10vw] sm:text-[8vw] md:text-7xl lg:text-8xl text-primary font-extrabold uppercase leading-none mb-8 whitespace-nowrap overflow-visible text-center lg:text-left">
          Let's Collaborate
        </h2>

        {/* Yellow Contact Box - full width */}
        <div className="bg-primary rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Phone</h4>
                <a href="tel:+919876543210" className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Email</h4>
                <a href="mailto:info@ayanaoutdoors.com" className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  info@ayanaoutdoors.com
                </a>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Website</h4>
                <a href="https://www.ayanaoutdoors.com" target="_blank" rel="noopener noreferrer" className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  ayanaoutdoors.com
                </a>
              </div>
            </div>

            {/* Social Links Group */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Follow Us</h4>
                <div className="flex gap-4 items-center">
                  <a href="https://instagram.com/ayanaoutdoors" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com/ayanaoutdoors" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/company/ayanaoutdoors" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@ayanaoutdoors" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/60 font-body uppercase tracking-wider border-t border-white/10 pt-4">
          <span>© 2026 Ayana Outdoors. All rights reserved.</span>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <a href="/privacy" className="hover:text-primary transition-colors cursor-none">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors cursor-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
