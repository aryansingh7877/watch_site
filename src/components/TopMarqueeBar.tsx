import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

interface TopMarqueeBarProps {
  isDark?: boolean;
}

export const TopMarqueeBar: React.FC<TopMarqueeBarProps> = ({ isDark = false }) => {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    // Subscribe to global audio state
    const unsubscribe = audioManager.subscribe((active) => {
      setSoundActive(active);
    });

    if (!marqueeTrackRef.current) return unsubscribe;

    gsap.set(marqueeTrackRef.current, { xPercent: 0 });

    const marqueeTween = gsap.to(marqueeTrackRef.current, {
      xPercent: -50,
      duration: 85, // Ultra-slow, luxurious continuous pace
      ease: 'none',
      repeat: -1,
    });

    return () => {
      marqueeTween.kill();
      unsubscribe();
    };
  }, []);

  const toggleMusic = () => {
    audioManager.toggle();
  };

  const marqueeText =
    'PRECISION WATCHMAKERS • SWISS ENGINEERING • ATELIER CHRONOMETRIE • CALIBRE P-9000 • SAPPHIRE CORUNDUM • TITANIUM GRADE 5 • ';

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full h-12 md:h-14 border-b flex items-center overflow-hidden pointer-events-auto select-none transition-colors duration-500 backdrop-blur-md md:backdrop-blur-none md:bg-transparent ${
        isDark
          ? 'bg-black/90 md:bg-transparent border-white/10 md:border-white/10 text-white'
          : 'bg-[#fafaf9]/90 md:bg-transparent border-black/[0.06] md:border-black/[0.08] text-black'
      }`}
    >
      {/* Brand Tag on Left */}
      <div
        className={`flex-shrink-0 px-3 sm:px-4 md:px-6 h-full flex items-center gap-2 border-r md:bg-transparent z-10 transition-colors duration-500 ${
          isDark ? 'border-white/10' : 'border-black/[0.06] md:border-black/[0.08]'
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`font-display font-black text-[11px] sm:text-xs md:text-sm tracking-[0.20em] md:tracking-[0.24em] uppercase transition-colors duration-500 ${
            isDark ? 'text-white hover:text-white/80' : 'text-black hover:opacity-80'
          }`}
        >
          PRECISION
        </a>
        <span
          className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
            isDark ? 'bg-white' : 'bg-black'
          }`}
        />
      </div>

      {/* Slow Continuous Infinite Track */}
      <div className="flex-1 overflow-hidden flex items-center h-full">
        <div
          ref={marqueeTrackRef}
          className={`flex whitespace-nowrap will-change-transform font-mono text-[10px] sm:text-[11px] md:text-[11px] tracking-[0.22em] sm:tracking-[0.28em] uppercase font-bold transition-colors duration-500 ${
            isDark ? 'text-white/75' : 'text-black'
          }`}
        >
          <span className="inline-block">{marqueeText}</span>
          <span className="inline-block">{marqueeText}</span>
          <span className="inline-block">{marqueeText}</span>
          <span className="inline-block">{marqueeText}</span>
        </div>
      </div>

      {/* Music & Audio Button on Far Right */}
      <div
        className={`flex-shrink-0 px-2.5 sm:px-4 md:px-6 h-full flex items-center border-l md:bg-transparent z-10 transition-colors duration-500 ${
          isDark ? 'border-white/10' : 'border-black/[0.06] md:border-black/[0.08]'
        }`}
      >
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono tracking-widest px-2.5 sm:px-3 md:px-3.5 py-1 sm:py-1.5 rounded-full border transition-all cursor-pointer ${
            soundActive
              ? isDark
                ? 'border-white bg-white text-black shadow-lg'
                : 'border-black bg-black text-white shadow-md'
              : isDark
              ? 'border-white/30 text-white hover:border-white hover:bg-white/10 bg-white/5 backdrop-blur-sm font-semibold'
              : 'border-black/40 text-black hover:border-black hover:bg-black/5 bg-white/40 md:bg-white/40 backdrop-blur-sm font-bold'
          }`}
          title={soundActive ? 'Mute Soundtrack & Calibre' : 'Play Soundtrack & Calibre Music'}
        >
          {soundActive ? (
            <>
              <Volume2 size={13} className={`animate-pulse ${isDark ? 'text-black' : 'text-white'}`} />
              <span className="flex items-center gap-1">
                <span className="hidden md:inline">SOUND ON</span>
                <span className="md:hidden">SOUND</span>
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-black' : 'bg-white'}`} />
              </span>
            </>
          ) : (
            <>
              <VolumeX size={13} className={isDark ? 'text-white' : 'text-black'} />
              <span className="hidden md:inline">MUSIC / SOUND</span>
              <span className="md:hidden hidden xs:inline">SOUND</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
