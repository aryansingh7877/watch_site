import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { escapementAudio } from '../utils/audio';

interface NavbarProps {
  onSelectWatch?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = escapementAudio.toggle();
    setSoundActive(active);
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-4 bg-[#fcfcfc]/90 backdrop-blur-md border-b border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
            : 'py-7 md:py-9 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo - Left */}
          <a
            href="#"
            className="group flex items-center gap-3 text-current no-underline"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-display font-extrabold tracking-[0.22em] text-lg md:text-xl text-[#0e0f10] uppercase transition-transform duration-300 group-hover:scale-[1.02]">
              PRECISION
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-[#7a7c80] uppercase border border-black/10 px-1.5 py-0.5 rounded">
              CHRONOMETRIE
            </span>
          </a>

          {/* Desktop Center/Right Navigation */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-12">
            <button
              onClick={() => scrollToSection('showcase')}
              className="text-[12px] font-mono tracking-[0.2em] font-medium text-[#1a1b1d] hover:text-black transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              WATCHES
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="text-[12px] font-mono tracking-[0.2em] font-medium text-[#1a1b1d] hover:text-black transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              COLLECTION
            </button>
            <button
              onClick={() => scrollToSection('anatomy')}
              className="text-[12px] font-mono tracking-[0.2em] font-medium text-[#1a1b1d] hover:text-black transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              CRAFT
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[12px] font-mono tracking-[0.2em] font-medium text-[#1a1b1d] hover:text-black transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              ABOUT
            </button>
          </nav>

          {/* Right Actions: Escapement tick sound toggle + Menu */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-full border transition-all duration-300 ${
                soundActive
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 text-[#555] hover:border-black/40 hover:text-black bg-white/60'
              }`}
              title="Calibre Escapement Audio (4Hz / 28,800 vph)"
            >
              {soundActive ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
              <span className="hidden lg:inline tracking-wider">
                {soundActive ? '28,800 VPH' : 'ACOUSTIC'}
              </span>
            </button>

            {/* Right side Menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-2 text-[12px] font-mono font-semibold tracking-[0.2em] uppercase text-[#0e0f10] hover:opacity-75 transition-opacity"
              aria-label="Toggle navigation menu"
            >
              <span className="hidden sm:inline">MENU</span>
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center bg-white/70 group-hover:border-black/50 transition-colors">
                {menuOpen ? <X size={14} /> : <Menu size={14} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Fullscreen Editorial Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#fbfbfb] text-[#111213] flex flex-col justify-between p-8 md:p-16 transition-all duration-700 ease-in-out ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="pt-24 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Navigation Links */}
          <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
            <span className="text-[11px] font-mono tracking-widest text-[#888] uppercase">
              INDEX // PRECISION HOROLOGY
            </span>
            <div className="flex flex-col gap-4 md:gap-6">
              {[
                { title: '01 / WATCH SHOWCASE', id: 'showcase', desc: 'Interactive macro examination' },
                { title: '02 / EDITORIAL COLLECTION', id: 'collection', desc: 'Analog, Digital, Chronograph & Hybrid' },
                { title: '03 / ANATOMY & MOVEMENT', id: 'anatomy', desc: 'Exploded technical architecture' },
                { title: '04 / THE CONCEPT OF TIME', id: 'time', desc: 'A diurnal cycle in pure motion' },
                { title: '05 / ATELIER CRAFT & PHILOSOPHY', id: 'about', desc: 'Built around every second' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex flex-col items-start text-left border-b border-black/10 pb-4 transition-all"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111] group-hover:italic group-hover:translate-x-3 transition-all duration-300">
                      {item.title}
                    </span>
                    <ArrowUpRight
                      size={24}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-mono text-[#777] mt-1 tracking-wider">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Side Info & Specifications */}
          <div className="md:col-span-4 flex flex-col justify-between pt-4 border-t md:border-t-0 md:border-l border-black/10 md:pl-12">
            <div className="space-y-6">
              <span className="text-[11px] font-mono tracking-widest text-[#888] uppercase block">
                ATELIER SPECIFICATIONS
              </span>
              <p className="text-sm font-sans text-[#444] leading-relaxed">
                PRECISION watches are produced in limited annual quantities in our precision facility, utilizing Grade 5 titanium, 316L austenitic steel, and hand-finished chronometer escapements.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#555]">
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span>FREQUENCY</span>
                  <span className="font-medium text-black">4 HZ (28,800 VPH)</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span>TOLERANCE</span>
                  <span className="font-medium text-black">±0.002 MM</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span>DEPTH</span>
                  <span className="font-medium text-black">150M WATERPROOF</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <span className="text-[10px] font-mono tracking-widest text-[#999] uppercase block mb-2">
                INQUIRIES & ACQUISITIONS
              </span>
              <a
                href="mailto:concierge@precision-time.com"
                className="text-sm font-mono tracking-wider text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                concierge@precision-time.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer of menu overlay */}
        <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-black/10 text-[11px] font-mono text-[#777]">
          <span>© 2026 PRECISION MANUFACTURE</span>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              INSTAGRAM
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              YOUTUBE
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
