import React from 'react';
import { BRAND_STATS } from '../data/watches';
import { Compass, Hammer, Shield, Feather, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-40 bg-[#fdfdfd] border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Index Marker */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#777] uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-black rounded-full" />
          <span>CHAPTER 06 // ATELIER MANIFESTO</span>
        </div>

        {/* Large Statement Typography */}
        <div className="max-w-5xl">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0f1011] font-normal leading-[0.94]">
            BUILT AROUND <br />
            <span className="italic font-light text-[#333]">EVERY SECOND.</span>
          </h2>

          <p className="mt-8 text-lg sm:text-2xl font-serif text-[#444] font-light max-w-3xl leading-relaxed">
            PRECISION creates watches where engineering, material and design come together to create an experience that feels as precise as time itself.
          </p>
        </div>

        {/* Editorial Visual Composition with Studio Watch Imagery */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Visual: Floating Studio Model */}
          <div className="md:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f7f7f9] border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.03)] group">
            <img
              src="/Luxury_watch_floating_in_studio_20260923233749.jpeg"
              alt="PRECISION Aethel Studio Floating Watch"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-[#777] uppercase bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5">
              STUDIO CAPTURE // ATELIER AETHEL
            </div>
          </div>

          {/* Secondary Visual: Alligator Strap & Deployant Clasp Floating */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#f7f7f9] border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.03)] group">
              <img
                src="/Luxury_men's_watch_floating_20260923234044.jpeg"
                alt="PRECISION Automatic Sunburst Dial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-[#777] uppercase bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5">
                SUNBURST GUILLOCHÉ
              </div>
            </div>

            {/* Editorial Philosophy Statement */}
            <div className="p-6 bg-white rounded-2xl border border-black/[0.08] shadow-sm space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase block">
                THE FIVE PILLARS
              </span>
              <p className="font-serif text-lg text-[#111] font-light">
                Precision • Engineering • Craftsmanship • Time • Design
              </p>
              <p className="text-xs font-sans text-[#555] leading-relaxed">
                We believe that time is not merely a quantitative measurement, but the singular dimension governing human achievement. Each bevel is cut by hand; each hairspring is breathed upon before casing.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Stats Row */}
        <div className="mt-20 pt-12 border-t border-black/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8">
          {BRAND_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-black font-light">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-[#777] uppercase font-semibold">
                  {stat.unit}
                </span>
              </div>
              <span className="text-[11px] font-mono tracking-widest text-[#555] uppercase block pt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
