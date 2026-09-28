import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WatchProductItem {
  id: string;
  number: string;
  name: string;
  category: string;
  series: string;
  subtitle: string;
  price: string;
  image: string;
  panelBg: string;
  isDark: boolean;
  specs: string;
  description: string;
}

const COLLECTION_PRODUCTS: WatchProductItem[] = [
  {
    id: '01',
    number: '01',
    name: 'Chronos Premier',
    category: 'Chronograph',
    series: 'SERIES 01 // RACING TELEMETRY',
    subtitle: 'Column-Wheel Calibre',
    price: '$6,450',
    image: '/Luxury_chronograph_watch_floating_20260923234027.jpeg',
    panelBg: '#f0f0ed',
    isDark: false,
    specs: '42.0 MM • 72H RESERVE • 100M',
    description: '1/10th second column-wheel actuation with three concentric guilloché registers.',
  },
  {
    id: '02',
    number: '02',
    name: 'Aethel Heritage',
    category: 'Analog Atelier',
    series: 'SERIES 02 // ATELIER CLASSIC',
    subtitle: 'Galvanic Ocean Blue',
    price: '$5,200',
    image: "/Luxury_men's_watch_floating_20260923234044.jpeg",
    panelBg: '#e6e7e4',
    isDark: false,
    specs: '40.0 MM • 68H RESERVE • 150M',
    description: 'Deep galvanic ocean dial shifting from midnight cobalt to Prussian navy under changing light.',
  },
  {
    id: '03',
    number: '03',
    name: 'Tactical T-Hybrid',
    category: 'Hybrid Instrument',
    series: 'SERIES 03 // TACTICAL FIELD',
    subtitle: 'Kinetic Micro-OLED',
    price: '$4,800',
    image: '/Sports_watch_with_hybrid_display_20260923234049.jpeg',
    panelBg: '#151619',
    isDark: true,
    specs: '44.0 MM • TITANIUM • 200M',
    description: 'Mechanical gear-train integrated with sub-surface OLED telemetry and micro-stepper hands.',
  },
  {
    id: '04',
    number: '04',
    name: 'Monolith Noir',
    category: 'Digital Ceramic',
    series: 'SERIES 04 // MONOLITHIC REDUCTION',
    subtitle: 'Zirconia Architecture',
    price: '$7,100',
    image: '/Luxury_watch_on_white_background_20260923234055.jpeg',
    panelBg: '#e2e3df',
    isDark: false,
    specs: '39.0 MM • 8.4 MM THICK • 50M',
    description: 'Absolute reduction to pure sculptural form. Sintered zirconia ceramic with invisible gasket architecture.',
  },
  {
    id: '05',
    number: '05',
    name: 'Calibre Soleil',
    category: 'Sport Chronometer',
    series: 'SERIES 05 // OYSTERGRADE SPORT',
    subtitle: 'Fluted 904L Steel',
    price: '$6,800',
    image: '/Luxury_watch_on_white_background_20260923234101.jpeg',
    panelBg: '#eeeee9',
    isDark: false,
    specs: '41.0 MM • CHRONOMETER • 100M',
    description: 'Precision-milled fluted bezel casting rhythmic light reflections across solid 3-link Oyster steel.',
  },
  {
    id: '06',
    number: '06',
    name: 'Meridian Grand Atelier',
    category: 'Haute Horlogerie',
    series: 'SERIES 06 // PINNACLE COMPLICATION',
    subtitle: 'Flagship Dual Complication',
    price: '$8,900',
    image: '/Luxury_watch_transparent.png',
    panelBg: '#0b0c0f',
    isDark: true,
    specs: '42.5 MM • 80H DUAL-BARREL • 120M',
    description: 'The pinnacle of Swiss chronometric engineering. Dual digital apertures and mechanical acoustic resonance.',
  },
];

interface CollectionProps {
  onSelectWatch?: (watch: WatchProductItem) => void;
}

export const Collection: React.FC<CollectionProps> = ({ onSelectWatch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProducts = COLLECTION_PRODUCTS.length; // 6

  // Desktop ScrollTrigger Interaction
  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Scroll distance for 6 products (smooth, controlled scrub)
    const scrollDistance = window.innerHeight * 4.8;
    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: pin,
        scrub: 1.0, // Smooth, cinematic scrub
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1

          // 6 discrete steps with generous hold intervals
          let idx = 0;
          if (p < 0.17) idx = 0;
          else if (p < 0.34) idx = 1;
          else if (p < 0.51) idx = 2;
          else if (p < 0.68) idx = 3;
          else if (p < 0.85) idx = 4;
          else idx = 5;

          setActiveIndex(idx);
        },
      });
    }, container);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [totalProducts]);

  // Click on inactive column to smoothly slide active panel
  const handleColumnClick = useCallback(
    (index: number) => {
      setActiveIndex(index);

      if (!containerRef.current) return;
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      const scrollDistance = window.innerHeight * 4.8;
      const containerTop = containerRef.current.offsetTop;

      // Progress milestones for each product
      const milestones = [0.08, 0.25, 0.42, 0.59, 0.76, 0.93];
      const targetScroll = containerTop + milestones[index] * scrollDistance;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    },
    []
  );

  const isFinalHero = activeIndex === 5;

  return (
    <section
      id="collection-section"
      ref={containerRef}
      className="relative w-full bg-[#fafaf9] text-[#0e0f11] overflow-visible select-none"
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. DESKTOP PINNED COLLECTION STAGE (Exact Reference Design) */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="hidden md:flex relative h-screen w-full flex-col justify-between pt-10 pb-24 md:pt-12 md:pb-28 px-6 lg:px-12 overflow-hidden"
      >

        {/* ── 03 — COLLECTION EDITORIAL INTRO ── */}
        <div className="relative z-30 w-full max-w-[1500px] mx-auto flex items-end justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <h2 className="font-serif text-3xl lg:text-4xl text-black tracking-tight font-normal leading-none">
              COLLECTION
            </h2>
            <span className="font-serif text-sm lg:text-base text-[#555] font-light italic">
              SIX EXPRESSIONS OF TIME.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono tracking-widest text-[#777] uppercase">
            <span>HOROLOGICAL ARCHIVE // COLLECTION 01</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-black font-semibold">PRECISION WATCHMAKERS</span>
          </div>
        </div>

        {/* ── 04 — MAIN CENTRAL CONTAINER (As in Reference Video) ── */}
        <div className="relative z-20 flex-1 w-full max-w-[1500px] mx-auto flex items-center justify-center my-auto min-h-0">
          <div
            className="relative w-[86vw] max-w-[1500px] h-[68vh] lg:h-[74vh] rounded-[32px] md:rounded-[40px] overflow-hidden border border-black/[0.07] shadow-[0_32px_95px_-20px_rgba(0,0,0,0.18),0_16px_36px_-10px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(0,0,0,0.04)] bg-white flex flex-row items-stretch select-none transition-colors duration-700"
          >
            {COLLECTION_PRODUCTS.map((product, idx) => {
              const isActive = activeIndex === idx;

              // Flex width weights:
              // When Watch 06 is active (Final Hero), it expands to flex-6 (takes ~60% of container like Reference 2!)
              // When Watch 01-05 is active, it takes flex-3.8 (~38% of container like Reference 1!)
              // Inactive columns take flex-1 (or flex-0.8)
              const flexClass = isActive
                ? isFinalHero
                  ? 'flex-[5.5]'
                  : 'flex-[3.6]'
                : isFinalHero
                ? 'flex-[0.8]'
                : 'flex-[1]';

              return (
                <div
                  key={product.id}
                  onClick={() => handleColumnClick(idx)}
                  className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${flexClass} ${
                    isActive
                      ? 'shadow-[-16px_0_36px_-10px_rgba(0,0,0,0.14),16px_0_36px_-10px_rgba(0,0,0,0.14),0_10px_30px_rgba(0,0,0,0.08)] z-20'
                      : 'z-10'
                  }`}
                  style={{
                    backgroundColor: isActive ? product.panelBg : 'transparent',
                  }}
                >
                  {/* ── INACTIVE COLUMN VIEW (Matching Reference Screenshot 1) ── */}
                  {!isActive && (
                    <div className="w-full h-full flex flex-col justify-between items-center py-10 px-4 text-center group hover:bg-black/[0.015] transition-colors">
                      {/* Top Large Number */}
                      <span className="font-mono text-2xl lg:text-3xl font-bold tracking-tight text-black/80 group-hover:text-black transition-colors">
                        {product.number}
                      </span>

                      {/* Center Product Title & Subtitle */}
                      <div className="flex flex-col items-center">
                        <h4 className="font-serif text-lg lg:text-xl font-normal text-black tracking-tight leading-snug">
                          {product.name}
                        </h4>
                        <span className="text-[11px] font-mono tracking-wider text-[#777] uppercase mt-1">
                          {product.subtitle}
                        </span>
                      </div>

                      {/* Bottom Pill CTA */}
                      <div className="mt-4">
                        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all text-[10px] font-mono font-medium tracking-wider uppercase text-black/80">
                          <span>View more</span>
                          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── ACTIVE EXPANDED PANEL (Matching Reference Screenshot 1 & 2) ── */}
                  {isActive && (
                    <div
                      className={`relative w-full h-full flex flex-col justify-between p-8 lg:p-10 select-none overflow-hidden transition-opacity duration-500 animate-fadeIn ${
                        product.isDark ? 'text-white' : 'text-[#0e0f11]'
                      }`}
                    >

                      {/* Top Row inside Active Panel */}
                      <div className="relative z-10 flex items-center justify-between border-b pb-3 border-current/10">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xl sm:text-2xl font-black tracking-tight">
                            {product.number}
                          </span>
                          <span className="text-xs font-mono tracking-[0.25em] uppercase font-bold opacity-70">
                            // {product.category}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono tracking-widest opacity-60 uppercase">
                          {product.specs}
                        </span>
                      </div>

                      {/* Central Stage: Large Floating Watch Image (Reference Screenshot 1 & 2) */}
                      <div className="relative z-10 flex-1 w-full flex items-center justify-center my-2 min-h-0 overflow-hidden">
                        <div
                          className={`relative w-full aspect-square flex items-center justify-center transition-all duration-700 transform ${
                            isFinalHero
                              ? 'max-w-[420px] lg:max-w-[480px] scale-105'
                              : 'max-w-[320px] lg:max-w-[380px] hover:scale-105'
                          }`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.22)] drop-shadow-[0_45px_65px_rgba(0,0,0,0.14)] pointer-events-none"
                            loading="eager"
                          />
                        </div>
                      </div>

                      {/* Bottom Row: Product Title, Description, and CTA Button */}
                      <div className="relative z-10 pt-4 border-t border-current/10 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="max-w-md">
                          <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="font-serif text-2xl lg:text-3xl font-normal tracking-tight leading-none uppercase">
                              {product.name}
                            </h3>
                            <span className="font-mono text-xs font-bold opacity-80">
                              {product.price}
                            </span>
                          </div>

                          <p className="text-xs font-sans opacity-75 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* View Watch Pill CTA */}
                        <div className="shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectWatch) onSelectWatch(product);
                            }}
                            className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 ${
                              product.isDark
                                ? 'bg-white text-black hover:bg-white/95'
                                : 'bg-black text-white hover:bg-black/90'
                            }`}
                          >
                            <span>VIEW WATCH</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. MOBILE RESPONSIVE VERTICAL CATALOG (Native Scroll)        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-col w-full px-4 xs:px-5 pt-16 pb-36 space-y-8">
        {/* Mobile Header */}
        <div className="border-b border-black/[0.08] pb-4">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#777] uppercase mb-1">
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span>HOROLOGICAL ARCHIVE // COLLECTION 01</span>
          </div>
          <h2 className="font-serif text-3xl text-black font-normal tracking-tight">
            COLLECTION
          </h2>
          <p className="font-serif text-sm text-[#555] italic">
            SIX EXPRESSIONS OF TIME.
          </p>
        </div>

        {/* Vertical Stack of Products */}
        <div className="space-y-8">
          {COLLECTION_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectWatch && onSelectWatch(prod)}
              className={`p-5 xs:p-6 rounded-3xl border border-black/[0.08] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.05)] flex flex-col justify-between cursor-pointer active:scale-[0.99] transition-all ${
                prod.isDark ? 'bg-[#151619] text-white' : 'bg-white text-black'
              }`}
            >
              <div className="flex items-center justify-between border-b border-current/10 pb-3 mb-4">
                <span className="font-mono text-sm font-bold">
                  {prod.number} // {prod.category}
                </span>
                <span className="font-mono text-xs font-bold opacity-80">
                  {prod.price}
                </span>
              </div>

              <div className="relative w-full aspect-square max-w-[280px] xs:max-w-[320px] mx-auto flex items-center justify-center my-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.20)] drop-shadow-[0_30px_45px_rgba(0,0,0,0.10)]"
                  loading="lazy"
                />
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-2xl font-normal uppercase tracking-tight">
                  {prod.name}
                </h3>
                <p className="text-xs opacity-75 font-sans line-clamp-2 leading-relaxed mt-1">
                  {prod.description}
                </p>

                <div className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono opacity-70 uppercase">
                    {prod.specs}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                    <span>VIEW</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
