import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WatchAssemblySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!container || !pin || !canvas) return;

    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    const frameCount = 240;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let lastDrawnFrame = -1;

    // Helper to draw a specific frame onto the canvas
    const drawFrame = (frameIndex: number) => {
      const idx = Math.max(0, Math.min(frameCount - 1, frameIndex));
      const img = images[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnFrame = idx;
      }
    };

    // Preload frames progressively
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/assembly_frames/f_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        loadedCount++;
        // As soon as the first frame loads, draw it immediately
        if (i === 0 && lastDrawnFrame === -1) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    // GSAP ScrollTrigger setup
    let st: ScrollTrigger | null = null;
    const playhead = { frame: 0 };

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? window.innerHeight * 2.5 : window.innerHeight * 3.8;

    st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: pin,
      scrub: 0.1, // Tight, synchronous scrub that perfectly pairs with Lenis smooth scroll
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const targetFrame = Math.round(self.progress * (frameCount - 1));
        playhead.frame = targetFrame;
        drawFrame(targetFrame);
      },
    });

    // Handle window resize
    const handleResize = () => {
      if (lastDrawnFrame >= 0) {
        drawFrame(lastDrawnFrame);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
    };
  }, []);

  return (
    <section
      id="assembly-section"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white overflow-visible select-none"
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* SMOOTH ENTRANCE FADE (From preceding #fafaf9 into #050505)  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-b from-[#fafaf9] via-[#050505]/60 to-[#050505] pointer-events-none z-30" />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PINNED CINEMATIC CONTAINER (Deep Dark Studio Stage)         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col items-center justify-between px-4 sm:px-8 pt-16 pb-20 md:pt-18 md:pb-24 overflow-hidden bg-[#050505]"
      >
        {/* Cinematic Neutral Studio Glow (Adds depth behind the watch, no neon/colors) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] sm:w-[650px] md:w-[800px] aspect-square rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(20,20,22,0.5)_45%,transparent_75%)] blur-2xl opacity-90" />
        </div>

        {/* ── TOP EDITORIAL HEADER (Compact, Zero Overlap) ── */}
        <div
          ref={headerRef}
          className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-1 sm:mt-2 pointer-events-none flex-shrink-0"
        >
          {/* Subtle Atelier Tag */}
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white/45 uppercase mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span>CALIBRE P-9000 // ARCHIVE FILM 01</span>
          </div>

          {/* Svelte Luxury Title */}
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-[0.16em] text-white/90 uppercase whitespace-nowrap">
            Engineered <span className="italic font-light text-white/50">in Motion</span>
          </h2>
        </div>

        {/* ── CENTER CINEMATIC STAGE: SEAMLESS ROCK-SOLID CANVAS WATCH ── */}
        <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-auto min-h-0 py-2">
          <div className="relative h-[54vh] sm:h-[58vh] md:h-[62vh] lg:h-[64vh] aspect-[9/16] flex items-center justify-center">
            {/* High-Performance Canvas for 0ms Seek Latency & Zero Shaking */}
            <canvas
              ref={canvasRef}
              width={540}
              height={960}
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>

        {/* Dedicated Bottom Gradient Fader (Guarantees bottom nav never overlaps watch elements) */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-30" />
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* SMOOTH EXIT FADE (From #050505 into next section #ffffff)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="absolute -bottom-24 left-0 w-full h-24 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#ffffff] pointer-events-none z-30" />
    </section>
  );
};
