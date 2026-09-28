import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WATCH_COLLECTION, WatchProduct } from '../data/watches';
import { Eye, ZoomIn, ZoomOut, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WatchShowcaseProps {
  onSelectWatch: (watch: WatchProduct) => void;
}

export const WatchShowcase: React.FC<WatchShowcaseProps> = ({ onSelectWatch }) => {
  const [activeWatchIndex, setActiveWatchIndex] = useState(0);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const currentWatch = WATCH_COLLECTION[activeWatchIndex];

  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dialGlowRef = useRef<HTMLDivElement>(null);

  // Transition watch with distinct animation language
  useEffect(() => {
    if (!imageRef.current) return;

    // Reset zoom whenever watch changes
    setActiveDetail(null);

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Entrance animation based on watch category
    switch (currentWatch.animationType) {
      case 'analog-rotate':
        // Slow elegant rotation and subtle rise
        tl.fromTo(
          imageRef.current,
          { scale: 0.85, rotate: -6, opacity: 0, y: 30 },
          { scale: 1, rotate: 0, opacity: 1, y: 0, duration: 1.2 }
        );
        break;

      case 'chrono-sweep':
        // Snappy scale with tachymeter focus
        tl.fromTo(
          imageRef.current,
          { scale: 0.9, rotate: 3, opacity: 0, filter: 'contrast(1.2)' },
          { scale: 1, rotate: 0, opacity: 1, filter: 'contrast(1.03)', duration: 1.0 }
        );
        break;

      case 'hybrid-pulse':
        // Digital flash activation and sharp settle
        tl.fromTo(
          imageRef.current,
          { scale: 0.88, opacity: 0, filter: 'brightness(1.5)' },
          { scale: 1, opacity: 1, filter: 'brightness(1.0)', duration: 0.9 }
        );
        break;

      case 'digital-activate':
        // Sleek fade-in from pitch black
        tl.fromTo(
          imageRef.current,
          { scale: 0.92, opacity: 0, filter: 'brightness(0.6)' },
          { scale: 1, opacity: 1, filter: 'brightness(1.0)', duration: 1.1 }
        );
        break;

      case 'sport-dynamic':
        // High-velocity dynamic push
        tl.fromTo(
          imageRef.current,
          { scale: 1.12, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        );
        break;

      case 'automatic-macro':
      default:
        // Deep camera push into movement
        tl.fromTo(
          imageRef.current,
          { scale: 0.82, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 1.3, ease: 'power2.out' }
        );
        break;
    }
  }, [activeWatchIndex, currentWatch]);

  // Handle camera zoom to hotspot details (dial, crown, case, strap)
  const zoomToHotspot = (hotspot: NonNullable<WatchProduct['hotspots']>[0]) => {
    if (!imageRef.current) return;
    setActiveDetail(hotspot.id);

    const xOffset = (50 - hotspot.x) * 1.5;
    const yOffset = (50 - hotspot.y) * 1.5;

    gsap.to(imageRef.current, {
      scale: hotspot.detailZoom,
      xPercent: xOffset,
      yPercent: yOffset,
      duration: 1.0,
      ease: 'power3.inOut',
    });
  };

  const resetCameraZoom = () => {
    if (!imageRef.current) return;
    setActiveDetail(null);
    gsap.to(imageRef.current, {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-[#fbfbfb] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#7a7c80] uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span>CHAPTER 02 // CINEMATIC SHOWCASE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0e0f10] tracking-tight">
              THE ANATOMY OF MOTION.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-[#555] leading-relaxed">
            Click on any component — dial, hands, crown, or strap — to execute a precision optical macro zoom into hand-finished micro-architecture.
          </p>
        </div>

        {/* Model Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar border-b border-black/[0.04]">
          {WATCH_COLLECTION.map((watch, idx) => (
            <button
              key={watch.id}
              onClick={() => setActiveWatchIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeWatchIndex === idx
                  ? 'bg-[#111213] text-white shadow-md'
                  : 'bg-white/80 text-[#666] border border-black/10 hover:border-black/30 hover:text-black'
              }`}
            >
              <span>{watch.category}</span>
              <span className="text-[10px] opacity-60">0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Interactive Showcase Studio Stage */}
        <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Product Information & Camera Hotspots */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-block text-[11px] font-mono tracking-widest text-[#888] uppercase bg-black/5 px-2.5 py-1 rounded">
                {currentWatch.series}
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#111213] tracking-tight font-medium">
                {currentWatch.name}
              </h3>

              <p className="font-mono text-xl text-[#1a1b1d] font-semibold tracking-wide">
                {currentWatch.price}
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#555] leading-relaxed">
                {currentWatch.description}
              </p>
            </div>

            {/* Macro Detail Inspection Buttons */}
            <div className="space-y-3 pt-4 border-t border-black/10">
              <div className="flex items-center justify-between text-xs font-mono text-[#777] uppercase tracking-wider">
                <span>MACRO CALLOUTS</span>
                {activeDetail && (
                  <button
                    onClick={resetCameraZoom}
                    className="flex items-center gap-1 text-black font-semibold hover:underline"
                  >
                    <ZoomOut size={12} />
                    <span>RESET ZOOM</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {currentWatch.hotspots?.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => zoomToHotspot(hs)}
                    className={`text-left p-2.5 rounded-lg border text-xs font-mono transition-all flex flex-col justify-between ${
                      activeDetail === hs.id
                        ? 'border-black bg-black text-white shadow'
                        : 'border-black/10 bg-white/70 text-[#444] hover:border-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium tracking-wide uppercase">{hs.label}</span>
                      <ZoomIn size={12} className="opacity-70" />
                    </div>
                    <span className="text-[10px] opacity-75 mt-1 line-clamp-1">{hs.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectWatch(currentWatch)}
                className="group flex-1 flex items-center justify-center gap-2 bg-[#111213] text-white px-6 py-3.5 rounded-lg text-xs font-mono uppercase tracking-widest hover:bg-black transition-all shadow"
              >
                <span>EXPLORE TECHNICAL DATA</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Studio Watch Presentation with Physical Shadows & Interactive Macro Canvas */}
          <div
            ref={stageRef}
            className="lg:col-span-8 order-1 lg:order-2 relative aspect-[4/3] md:aspect-[16/10] bg-gradient-to-b from-[#ffffff] to-[#f4f4f6] rounded-2xl border border-black/[0.06] overflow-hidden flex items-center justify-center p-6 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.04)]"
          >
            {/* Subtle Studio Radial Glow */}
            <div
              ref={dialGlowRef}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(240,241,243,0.4)_70%,transparent_100%)] pointer-events-none"
            />

            {/* Subtle Grid Watermark */}
            <div className="absolute top-4 left-6 text-[9px] font-mono tracking-widest text-[#aaa] uppercase pointer-events-none">
              OPTICAL ZOOM AXIS // {activeDetail ? activeDetail.toUpperCase() : 'FULL VIEW'}
            </div>
            <div className="absolute bottom-4 right-6 text-[9px] font-mono tracking-widest text-[#aaa] uppercase pointer-events-none flex items-center gap-2">
              <Sparkles size={10} />
              <span>PRECISION ATELIER // {currentWatch.diameter}</span>
            </div>

            {/* Physical Watch Image Canvas with GSAP camera transforms */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                ref={imageRef}
                src={currentWatch.image}
                alt={currentWatch.name}
                className="max-h-[88%] max-w-[88%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] transition-transform duration-700 will-change-transform cursor-pointer select-none"
                onClick={resetCameraZoom}
              />

              {/* Interactive Hotspot Dots on the watch image */}
              {!activeDetail &&
                currentWatch.hotspots?.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => zoomToHotspot(hs)}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute group -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-20 cursor-pointer"
                    title={hs.label}
                  >
                    <span className="absolute inset-0 rounded-full bg-black/20 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-black border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 transition-transform" />
                    <span className="opacity-0 group-hover:opacity-100 absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg transition-opacity pointer-events-none">
                      {hs.label}
                    </span>
                  </button>
                ))}
            </div>

            {/* Active Detail Overlay Banner if zoomed */}
            {activeDetail && (
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/90 backdrop-blur-md border border-black/10 p-4 rounded-xl shadow-xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#888] uppercase block text-[10px]">INSPECTING DETAIL:</span>
                  <p className="font-semibold text-black tracking-wider uppercase">
                    {currentWatch.hotspots?.find((h) => h.id === activeDetail)?.label}
                  </p>
                  <p className="text-[#555] font-sans text-xs mt-0.5 max-w-lg">
                    {currentWatch.hotspots?.find((h) => h.id === activeDetail)?.desc}
                  </p>
                </div>
                <button
                  onClick={resetCameraZoom}
                  className="px-3 py-1.5 bg-black text-white rounded text-[11px] font-mono uppercase tracking-wider hover:opacity-80 transition-opacity whitespace-nowrap ml-4"
                >
                  RETURN (1X)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
