import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SecondSectionProps {
  onExplore: (category: string) => void;
}

export const SecondSection: React.FC<SecondSectionProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Story Chapter DOM Refs for GSAP direct manipulation (Zero React state re-renders during scroll)
  const chapter1Ref = useRef<HTMLDivElement>(null);
  const chapter2Ref = useRef<HTMLDivElement>(null);
  const chapter3Ref = useRef<HTMLDivElement>(null);
  const chapter4Ref = useRef<HTMLDivElement>(null);
  const chapter5Ref = useRef<HTMLDivElement>(null);
  const chapter6Ref = useRef<HTMLDivElement>(null);

  // Technical component annotation pins
  const techAnnotationsRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!container || !pin || !canvas) return;

    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    const frameCount = 240;
    const images: HTMLImageElement[] = [];
    let lastDrawnFrame = -1;

    // Helper to draw a specific frame onto the canvas
    const drawFrame = (frameIndex: number) => {
      const idx = Math.max(0, Math.min(frameCount - 1, frameIndex));
      const img = images[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx2d.imageSmoothingEnabled = true;
        ctx2d.imageSmoothingQuality = 'high';
        ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnFrame = idx;
      }
    };

    // Preload about frames (240 WebP frames, total ~5.1MB)
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/about_frames/f_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        if (i === 0 && lastDrawnFrame === -1) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? window.innerHeight * 3.5 : window.innerHeight * 5.5;

    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: pin,
          scrub: 0.1, // Tight, synchronous scrub aligned with Lenis smooth scroll
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Frame scrubbing (0 to 239)
            const targetFrame = Math.round(p * (frameCount - 1));
            drawFrame(targetFrame);
          },
        },
      });

      // ── CINEMATIC CAMERA & SCALE CHOREOGRAPHY ──
      // Dynamic Apple-style camera motion: expands, moves softly across the mechanism, settles cleanly
      if (videoWrapperRef.current) {
        tl.fromTo(
          videoWrapperRef.current,
          { scale: 0.91, x: -8, y: 6 },
          { scale: 1.0, x: 0, y: 0, duration: 0.35, ease: 'sine.out' },
          0
        );
        tl.to(
          videoWrapperRef.current,
          { scale: 1.06, x: 10, y: -8, duration: 0.35, ease: 'sine.inOut' },
          0.35
        );
        tl.to(
          videoWrapperRef.current,
          { scale: 0.98, x: 0, y: 0, duration: 0.3, ease: 'sine.inOut' },
          0.7
        );
      }

      // ── CHAPTER 01: MANIFESTO (0.00 -> 0.17) ──
      // Starts visible, holds, exits upward with blur
      if (chapter1Ref.current) {
        tl.fromTo(
          chapter1Ref.current,
          { opacity: 1, y: 0, filter: 'blur(0px)' },
          { opacity: 0, y: -45, filter: 'blur(8px)', duration: 0.09, ease: 'power2.in' },
          0.08
        );
      }

      // ── CHAPTER 02: ENGINEERED FOR PRECISION (0.17 -> 0.36) ──
      // Enters from bottom, holds, exits upward
      if (chapter2Ref.current) {
        tl.fromTo(
          chapter2Ref.current,
          { opacity: 0, y: 45, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out' },
          0.17
        );
        tl.to(
          chapter2Ref.current,
          { opacity: 0, y: -45, filter: 'blur(8px)', duration: 0.07, ease: 'power2.in' },
          0.29
        );
      }

      // ── CHAPTER 03: THE MOVEMENT IS THE HEART (0.36 -> 0.58) ──
      if (chapter3Ref.current) {
        tl.fromTo(
          chapter3Ref.current,
          { opacity: 0, y: 45, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out' },
          0.37
        );
        tl.to(
          chapter3Ref.current,
          { opacity: 0, y: -45, filter: 'blur(8px)', duration: 0.07, ease: 'power2.in' },
          0.51
        );
      }

      // ── CHAPTER 04: EVERY COMPONENT HAS A PURPOSE (0.58 -> 0.78) ──
      if (chapter4Ref.current) {
        tl.fromTo(
          chapter4Ref.current,
          { opacity: 0, y: 45, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out' },
          0.59
        );
        tl.to(
          chapter4Ref.current,
          { opacity: 0, y: -45, filter: 'blur(8px)', duration: 0.07, ease: 'power2.in' },
          0.72
        );
      }

      // Technical Callout Pins during Chapter 04
      if (techAnnotationsRef.current) {
        tl.fromTo(
          techAnnotationsRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' },
          0.6
        );
        tl.to(
          techAnnotationsRef.current,
          { opacity: 0, scale: 0.96, duration: 0.06, ease: 'power2.in' },
          0.72
        );
      }

      // ── CHAPTER 05: PRECISION IN EVERY DETAIL (0.78 -> 0.92) ──
      if (chapter5Ref.current) {
        tl.fromTo(
          chapter5Ref.current,
          { opacity: 0, y: 45, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out' },
          0.78
        );
        tl.to(
          chapter5Ref.current,
          { opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in' },
          0.89
        );
      }

      // ── CHAPTER 06: FINAL STATEMENT (0.92 -> 1.00) ──
      if (chapter6Ref.current) {
        tl.fromTo(
          chapter6Ref.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out' },
          0.93
        );
      }
    }, container);

    const handleResize = () => {
      if (lastDrawnFrame >= 0) {
        drawFrame(lastDrawnFrame);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full bg-[#fafaf9]">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. CINEMATIC FULL-SCREEN SCROLL STORYTELLING ABOUT SECTION  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        id="watches-section"
        ref={containerRef}
        className="relative w-full bg-[#fafaf9] text-[#0e0f11] overflow-visible select-none"
      >
        <div
          ref={pinRef}
          className="relative h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden"
        >

          {/* ── FULL HERO CINEMATIC VIEWPORT STAGE ── */}
          <div className="relative z-20 w-full flex items-center justify-center min-h-0">
            {/* The Grand Centerpiece: 88vw - 92vw wide, 72vh - 86vh high */}
            <div
              ref={videoWrapperRef}
              className="relative w-[88vw] md:w-[90vw] lg:w-[92vw] max-w-[1550px] h-[72vh] sm:h-[78vh] md:h-[82vh] lg:h-[86vh] flex items-center justify-center will-change-transform rounded-2xl md:rounded-3xl overflow-hidden select-none bg-[#e8e8e8]"
              style={{
                boxShadow: '0 30px 90px -25px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                className="w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Ultra-subtle studio ambient lighting vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/[0.04] via-transparent to-black/[0.02]" />
            </div>

            {/* ── STORY CHAPTER 01: INITIAL MANIFESTO (Over Left Side) ── */}
            <div
              ref={chapter1Ref}
              className="absolute left-4 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-30 max-w-sm sm:max-w-xl lg:max-w-2xl px-2 pointer-events-none"
            >
              <span className="text-[10px] sm:text-sm font-mono tracking-[0.24em] sm:tracking-[0.3em] text-black font-extrabold uppercase block mb-2 sm:mb-3">
                01 // MANIFESTO
              </span>
              <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black leading-[0.94] sm:leading-[0.92] font-black">
                <span className="block font-black">PRECISION</span>
                <span className="block font-bold text-black">
                  IN EVERY SECOND.
                </span>
              </h2>
              <p className="mt-3 sm:mt-5 text-xs sm:text-lg md:text-xl font-sans text-black font-bold max-w-lg leading-relaxed">
                PRECISION creates watches where engineering, material and design come
                together to create an experience that feels as precise as time itself.
              </p>
            </div>

            {/* ── STORY CHAPTER 02: ENGINEERED FOR PRECISION (Over Right Side) ── */}
            <div
              ref={chapter2Ref}
              className="absolute right-4 sm:right-12 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-30 max-w-sm sm:max-w-lg lg:max-w-xl px-2 text-right pointer-events-none opacity-0"
            >
              <span className="text-[10px] sm:text-sm font-mono tracking-[0.24em] sm:tracking-[0.3em] text-black font-extrabold uppercase block mb-2 sm:mb-3">
                02 // TOLERANCE & CHRONOMETRY
              </span>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-black leading-[0.96] sm:leading-[0.94] font-black">
                <span className="block font-black">ENGINEERED</span>
                <span className="block font-bold text-black">
                  FOR PRECISION.
                </span>
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg font-sans text-black font-bold leading-relaxed max-w-md ml-auto">
                Every contour, gear, and surface is machined to sub-micron accuracy.
                Calibrated to eliminate mechanical resistance at every escapement oscillation.
              </p>
            </div>

            {/* ── STORY CHAPTER 03: THE MOVEMENT IS THE HEART (Floating Center) ── */}
            <div
              ref={chapter3Ref}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-0"
            >
              <span className="text-[10px] sm:text-sm font-mono tracking-[0.24em] sm:tracking-[0.3em] text-black font-extrabold uppercase block mb-2 sm:mb-3">
                CALIBRE P-9000 // IN-HOUSE ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black leading-tight font-black">
                THE MOVEMENT <br />
                <span className="font-bold text-black">IS THE HEART.</span>
              </h2>
              <div className="mt-4 sm:mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/95 backdrop-blur-md border border-black/20 text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-black uppercase shadow-lg max-w-[90vw]">
                <span>28,800 VPH</span>
                <span className="text-black/50">•</span>
                <span>4 HERTZ FREQUENCY</span>
                <span className="text-black/50">•</span>
                <span>72H CHRONOMETER RESERVE</span>
              </div>
            </div>

            {/* ── STORY CHAPTER 04: EVERY COMPONENT HAS A PURPOSE ── */}
            <div
              ref={chapter4Ref}
              className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-30 max-w-md lg:max-w-lg px-2 pointer-events-none opacity-0"
            >
              <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-black font-extrabold uppercase block mb-2">
                04 // ARCHITECTURAL PURITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black font-black leading-tight">
                EVERY COMPONENT <br />
                <span className="font-bold text-black">HAS A PURPOSE.</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base font-sans text-black font-bold leading-relaxed max-w-sm">
                No superfluous ornament. Pure functional horology engineered for a lifetime of rigorous timekeeping.
              </p>
            </div>

            {/* Floating Sleek Precision Callout Pins during Chapter 04 */}
            <div
              ref={techAnnotationsRef}
              className="absolute inset-0 z-35 pointer-events-none hidden md:block opacity-0"
            >
              {/* Callout 1: Top Right */}
              <div className="absolute top-[22%] right-[10%] lg:right-[14%] bg-white/95 backdrop-blur-md border border-black/20 px-4 py-2.5 rounded-xl text-xs font-mono shadow-md flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-black" />
                <div>
                  <span className="font-black block text-black">01 // SAPPHIRE CORUNDUM</span>
                  <span className="text-black font-bold text-[9px] uppercase tracking-wider">9 MOHS • DUAL ANTI-REFLECTIVE</span>
                </div>
              </div>

              {/* Callout 2: Bottom Right */}
              <div className="absolute bottom-[24%] right-[12%] lg:right-[16%] bg-white/95 backdrop-blur-md border border-black/20 px-4 py-2.5 rounded-xl text-xs font-mono shadow-md flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-black" />
                <div>
                  <span className="font-black block text-black">02 // COLUMN WHEEL ESCAPEMENT</span>
                  <span className="text-black font-bold text-[9px] uppercase tracking-wider">LATERAL FRICTION INTERFACE</span>
                </div>
              </div>

              {/* Callout 3: Bottom Left */}
              <div className="absolute bottom-[26%] left-[10%] lg:left-[14%] bg-white/95 backdrop-blur-md border border-black/20 px-4 py-2.5 rounded-xl text-xs font-mono shadow-md flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-black" />
                <div>
                  <span className="font-black block text-black">03 // GRADE 5 TITANIUM</span>
                  <span className="text-black font-bold text-[9px] uppercase tracking-wider">AUSTENITIC 316L ATELIER FINISH</span>
                </div>
              </div>
            </div>

            {/* ── STORY CHAPTER 05: PRECISION IN EVERY DETAIL (Left Statement) ── */}
            <div
              ref={chapter5Ref}
              className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-30 max-w-xl lg:max-w-2xl px-2 pointer-events-none opacity-0"
            >
              <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-black font-extrabold uppercase block mb-2">
                05 // METROLOGICAL FIDELITY
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black leading-tight font-black">
                PRECISION <br />
                <span className="font-bold text-black">IN EVERY DETAIL.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-sans text-black font-bold leading-relaxed max-w-lg">
                Micro-machined to ±0.002mm tolerances. Hand-beveled anglage on every interior bridge.
                Every component polished by master artisans in Genève.
              </p>
            </div>

            {/* ── STORY CHAPTER 06: FINAL STATEMENT (Grand Climax) ── */}
            <div
              ref={chapter6Ref}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-0"
            >
              <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-black font-black uppercase block mb-3">
                ATELIER HORLOGERIE // COMPLETE
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black leading-tight font-black">
                PRECISION <br />
                <span className="font-bold text-black">IN EVERY SECOND.</span>
              </h2>
              <p className="mt-5 text-sm sm:text-base font-mono font-bold tracking-[0.25em] text-black uppercase">
                SWISS CHRONOMETRY • LIMITED ATELIER BATCHES
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
