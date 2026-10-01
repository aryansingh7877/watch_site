import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TopMarqueeBar } from './components/TopMarqueeBar';
import { BottomNavBar } from './components/BottomNavBar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WatchAssemblySection } from './components/WatchAssemblySection';
import { SecondSection } from './components/SecondSection';
import { Collection } from './components/Collection';
import { PrecisionVideoMask } from './components/PrecisionVideoMask';

gsap.registerPlugin(ScrollTrigger);
// Prevent iOS Safari address bar collapse/expand from triggering jarring ScrollTrigger recalculations
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const [activeNav, setActiveNav] = useState('WATCHES');
  const [isDarkNav, setIsDarkNav] = useState(false);
  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Let iOS Safari use native momentum touch scroll
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Track active section automatically as user scrolls
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const maskElement = document.getElementById('precision-mask-section');
      if (maskElement) {
        const maskTop = maskElement.offsetTop - windowHeight * 0.4;
        if (scrollY >= maskTop) {
          setActiveNav('COLLECTION');
          setIsDarkNav(true);
          return;
        }
      }

      const collectionElement = document.getElementById('collection-section');
      if (collectionElement) {
        const collectionTop = collectionElement.offsetTop - windowHeight * 0.4;
        if (scrollY >= collectionTop) {
          setActiveNav('COLLECTION');
          setIsDarkNav(false);
          return;
        }
      }

      const manifestoElement = document.getElementById('watches-section');
      if (manifestoElement) {
        const manifestoTop = manifestoElement.offsetTop - windowHeight * 0.4;
        if (scrollY >= manifestoTop) {
          setActiveNav('WATCHES');
          setIsDarkNav(false);
          return;
        }
      }

      const assemblyElement = document.getElementById('assembly-section');
      if (assemblyElement) {
        const assemblyTop = assemblyElement.offsetTop - windowHeight * 0.4;
        if (scrollY >= assemblyTop) {
          setActiveNav('CRAFT');
          setIsDarkNav(true);
          return;
        }
      }

      const aboutElement = document.getElementById('about-section');
      if (aboutElement) {
        const aboutTop = aboutElement.offsetTop - windowHeight * 0.4;
        if (scrollY >= aboutTop) {
          setActiveNav('ABOUT');
          setIsDarkNav(false);
          return;
        }
      }

      setActiveNav('WATCHES');
      setIsDarkNav(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (item: string) => {
    setActiveNav(item);

    const lenis = lenisRef.current;
    if (item === 'WATCHES') {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item === 'ABOUT') {
      if (lenis) lenis.scrollTo('#about-section');
      else document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'CRAFT') {
      if (lenis) lenis.scrollTo('#assembly-section');
      else document.getElementById('assembly-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'COLLECTION') {
      if (lenis) lenis.scrollTo('#collection-section');
      else document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fafaf9] text-[#0f1011] overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* PERSISTENT GLOBAL TOP MARQUEE (Always Visible)              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <TopMarqueeBar isDark={isDarkNav} />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PERSISTENT GLOBAL BOTTOM NAVIGATION (Always Visible)        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <BottomNavBar activeNav={activeNav} onNavClick={handleNavClick} isDark={isDarkNav} />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION (Full-Screen Video Experience)              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. ABOUT SECTION (Vertical Marquees + Editorial Watch)      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <AboutSection />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. CINEMATIC SCROLL-CONTROLLED WATCH ASSEMBLY SECTION        */}
      {/*    (Deconstruct & Reassemble 240 Horological Components)    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <WatchAssemblySection />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. MANIFESTO HOROLOGICAL SECTION                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      <SecondSection onExplore={handleNavClick} />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. INTERACTIVE COLLECTION ARCHIVE (Active-Panel Accordion)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Collection onSelectWatch={(w) => console.log('Selected watch:', w.name)} />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 6. "PRECISION" VIDEO-MASKED CINEMATIC FINALE SECTION         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <PrecisionVideoMask />

      {/* Bottom breathing space so page doesn't squish at the end */}
      <div className="h-24 w-full bg-[#000000]" />
    </div>
  );
}
