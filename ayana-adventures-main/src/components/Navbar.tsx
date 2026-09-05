"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: '🏠 Home', to: '/' },
  { label: '🌿 Who We Are', to: '/about' },
  { label: '🥾 Upcoming Adventures', to: '/adventures' },
  { label: '📚 Resources', to: '/resources' },
  { label: '❤️ Sankalpa', to: '/sankalpa' },
  { label: '📞 Contact', to: '/contact' },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => (
    path === '/' ? pathname === path : pathname === path || pathname.startsWith(`${path}/`)
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30" style={{ background: 'linear-gradient(180deg, hsl(150 30% 6% / 0.95), hsl(150 30% 8% / 0.85))' }}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-none">
          <span className="font-display text-xl tracking-widest text-primary">AYANA</span>
          <span className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase">Outdoors</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-xs tracking-wider font-body transition-colors cursor-none ${
                isActive(link.to) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/safety-care">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-xs tracking-wider font-body cursor-none">
              🟡 Safety & Care
            </Button>
          </Link>
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ayana Outdoors..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-40 font-body"
                autoFocus
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="cursor-none"
                aria-label="Close search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-2 text-xs tracking-wider font-body text-foreground/80 hover:text-primary transition-colors cursor-none">
              <Search className="w-4 h-4" />
              Search
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground cursor-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border/30 pb-4">
          <div className="container mx-auto px-4 pt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-body py-2 cursor-none ${
                  isActive(link.to) ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/safety-care" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full w-full mt-2 cursor-none">
                🟡 Safety & Care
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
