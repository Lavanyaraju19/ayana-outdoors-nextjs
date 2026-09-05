import Link from 'next/link';
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';

export interface FooterSettings {
  phone: string;
  whatsappNumber: string;
  email: string;
  addressLocality: string;
  addressRegion: string;
  socialInstagram: string | null;
  socialYoutube: string | null;
  socialFacebook: string | null;
  socialLinkedin: string | null;
}

const Footer = ({ settings }: { settings: FooterSettings }) => {
  return (
    <footer className="relative z-10 py-8 md:py-10" style={{ background: 'linear-gradient(135deg, #1F5E3A, #2E7D4F)' }}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <p className="font-body text-xs text-primary uppercase tracking-widest mb-1 opacity-80">By Ayana Outdoors</p>
        <h2 className="font-display text-[10vw] sm:text-[8vw] md:text-7xl lg:text-8xl text-primary font-extrabold uppercase leading-none mb-8 whitespace-nowrap overflow-visible text-center lg:text-left">
          Let's Explore Together
        </h2>

        {/* Yellow Contact Box - full width */}
        <div className="bg-primary rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Phone</h4>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Email</h4>
                <a href={`mailto:${settings.email}`} className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Website</h4>
                <a href="https://www.ayanaoutdoors.com" target="_blank" rel="noopener noreferrer" className="text-base text-primary-foreground font-display font-bold hover:opacity-80 transition-opacity cursor-none block">
                  ayanaoutdoors.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-0.5">Location</h4>
                <span className="text-base text-primary-foreground font-display font-bold block">
                  {settings.addressLocality}, {settings.addressRegion}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-primary-foreground/20 pt-5">
            <h4 className="font-display text-[10px] text-primary-foreground/70 font-semibold uppercase tracking-wider mb-3">Social</h4>
            <div className="flex flex-wrap gap-4 items-center">
              <a href={settings.socialInstagram ?? 'https://instagram.com/ayanaoutdoors'} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.socialYoutube ?? 'https://youtube.com/@ayanaoutdoors'} target="_blank" rel="noopener noreferrer" title="YouTube" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={settings.socialFacebook ?? 'https://facebook.com/ayanaoutdoors'} target="_blank" rel="noopener noreferrer" title="Facebook" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings.socialLinkedin ?? 'https://linkedin.com/company/ayanaoutdoors'} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-primary-foreground hover:scale-110 transition-transform cursor-none">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="font-body text-sm md:text-base text-primary-foreground font-semibold mt-5">
              Every great adventure begins with a single step. We'd love to be part of your child's journey.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/60 font-body uppercase tracking-wider border-t border-white/10 pt-4">
          <span>© {new Date().getFullYear()} Ayana Outdoors. All rights reserved.</span>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors cursor-none">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors cursor-none">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
