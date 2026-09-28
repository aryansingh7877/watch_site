import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUp } from 'lucide-react';
import { escapementAudio } from '../utils/audio';

interface CompactNavProps {
  activeNav: string;
  onNavClick: (item: string) => void;
}

export const CompactNav: React.FC<CompactNavProps> = ({ activeNav, onNavClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['WATCHES', 'COLLECTION', 'CRAFT', 'ABOUT'];

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact bar only once user scrolls past 70% of hero height
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = escapementAudio.toggle();
    setSoundActive(active);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        } bg-[#fcfcfc]/90 backdrop-blur-md border-b border-black/[0.08] shadow-[0_2px_15px_rgba(0,0,0,0.03)] py-3 sm:py-3.5`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand - Left */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 group text-left"
          >
            <span className="font-display font-extrabold tracking-[0.2em] text-sm md:text-base text-[#0f1011] uppercase">
              PRECISION
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-[#777] uppercase border border-black/10 px-1 py-0.5 rounded">
              CHRONOMETRIE
            </span>
          </button>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => onNavClick(item)}
                  className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors relative py-1 ${
                    isActive ? 'text-black font-semibold' : 'text-[#666] hover:text-black font-medium'
                  }`}
                >
                  <span>{item}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                soundActive
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 text-[#555] hover:text-black bg-white/70'
              }`}
              title="Calibre Escapement Audio"
            >
              {soundActive ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
              <span className="hidden lg:inline">{soundActive ? '28,800 VPH' : 'AUDIO'}</span>
            </button>

            {/* Back to Hero */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center bg-white/80 hover:border-black/40 transition-colors"
              title="Return to Hero"
            >
              <ArrowUp size={13} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full border border-black/15 flex items-center justify-center bg-white/80 hover:border-black/40 transition-colors"
            >
              {mobileMenuOpen ? <X size={13} /> : <Menu size={13} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Bar */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-black/[0.08] px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavClick(item);
                }}
                className="text-left text-xs font-mono tracking-widest uppercase py-1.5 text-black border-b border-black/5 flex justify-between items-center"
              >
                <span>{item}</span>
                {activeNav === item && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
