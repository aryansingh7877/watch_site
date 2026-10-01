import React from 'react';

export const AboutSection: React.FC = () => {
  const marqueeWords = [
    'PRECISION',
    'PRECISION',
    'PRECISION',
    'PRECISION',
    'PRECISION',
    'PRECISION',
  ];

  return (
    <section
      id="about-section"
      className="relative min-h-screen w-full bg-[#fcfcfb] overflow-hidden flex flex-col justify-center items-center py-28 md:py-36 select-none"
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* LAYER 02: VERTICAL "PRECISION" MARQUEE BACKGROUND LAYER     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-start z-[5]"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center animate-vertical-marquee-up will-change-transform">
          {/* Column Set 1 */}
          <div className="flex flex-col items-center gap-20 sm:gap-28 md:gap-36 pb-20 sm:pb-28 md:pb-36">
            {marqueeWords.map((word, idx) => (
              <span
                key={`m1-${idx}`}
                className="font-serif font-light text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] tracking-[0.18em] sm:tracking-[0.22em] text-black/[0.05] uppercase select-none leading-none whitespace-nowrap text-center"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Column Set 2 (Identical duplicate for seamless continuous loop) */}
          <div className="flex flex-col items-center gap-20 sm:gap-28 md:gap-36 pb-20 sm:pb-28 md:pb-36">
            {marqueeWords.map((word, idx) => (
              <span
                key={`m2-${idx}`}
                className="font-serif font-light text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] tracking-[0.18em] sm:tracking-[0.22em] text-black/[0.05] uppercase select-none leading-none whitespace-nowrap text-center"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FOREGROUND LAYERS (z-20 / z-30): Content, Watch & Text      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-14 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 my-auto">
        {/* Left Side: Statement "WE DON'T MEASURE TIME." */}
        <div className="flex-1 text-left space-y-1 lg:max-w-md z-20">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-[#777] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>ARCHIVE DOSSIER // CHAPTER 01</span>
          </div>

          <h2 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black font-normal leading-[0.9]">
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block font-medium">WE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block font-medium">DON'T</span>
            </span>
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block italic font-light text-[#333]">MEASURE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block font-medium">TIME.</span>
            </span>
          </h2>

          <p className="pt-4 text-xs sm:text-sm font-sans text-[#555] leading-relaxed max-w-sm">
            At PRECISION, time is not treated as a passive measurement. It is an exacting physical constraint engineered into micro-machined titanium, silicon, and hand-finished austenitic steel.
          </p>
        </div>

        {/* Center: The Clean Watch Image (No Card) */}
        <div className="relative z-30 flex items-center justify-center my-4">
          <img
            src="/Luxury_watch_transparent.png"
            alt="PRECISION Atelier Calibre Watch"
            className="w-auto h-[260px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[560px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.14)] select-none pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Right Side: Statement "WE ENGINEER IT." */}
        <div className="flex-1 text-left lg:text-right space-y-1 lg:max-w-md z-20">
          <div className="flex lg:justify-end items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-[#777] uppercase mb-4">
            <span>MANUFACTURE D'HORLOGERIE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>

          <h2 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black font-normal leading-[0.9]">
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block font-medium">WE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block italic font-light text-[#333]">ENGINEER</span>
            </span>
            <span className="block overflow-hidden">
              <span className="editorial-line-inner block font-medium">IT.</span>
            </span>
          </h2>

          <p className="pt-4 text-xs sm:text-sm font-sans text-[#555] leading-relaxed max-w-sm lg:ml-auto">
            From single-block CNC machining to master-watchmaker escapement calibration, every second is accounted for through pure mechanical fidelity.
          </p>

          <div className="pt-4 flex lg:justify-end items-center gap-4 text-xs font-mono text-black">
            <span className="border-b border-black pb-0.5 font-semibold">28,800 BEATS / HOUR</span>
            <span>•</span>
            <span className="border-b border-black pb-0.5 font-semibold">4 HERTZ FREQUENCY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
