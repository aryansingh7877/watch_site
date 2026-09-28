import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let xPos1 = 0;
      let xPos2 = 0;
      let currentVelocity = 0;
      let targetSkew = 0;
      const baseSpeed = 0.8;

      // Observe scroll velocity
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity(); // pixels per second
          // Normalize velocity impact
          currentVelocity = v / 350;
          // Subtly skew typography based on velocity
          targetSkew = gsap.utils.clamp(-8, 8, v / 400);
        },
      });

      // Continuous RAF loop with smooth dampening
      const ticker = () => {
        // Smoothly decay velocity back to zero
        currentVelocity = gsap.utils.interpolate(currentVelocity, 0, 0.08);
        targetSkew = gsap.utils.interpolate(targetSkew, 0, 0.08);

        // Row 1 moves Left
        xPos1 -= baseSpeed + Math.abs(currentVelocity);
        if (xPos1 <= -50) {
          xPos1 = 0;
        }

        // Row 2 moves Right
        xPos2 += baseSpeed * 0.85 + Math.abs(currentVelocity);
        if (xPos2 >= 50) {
          xPos2 = 0;
        }

        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${xPos1}%, 0, 0) skewX(${targetSkew}deg)`;
        }

        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${-xPos2}%, 0, 0) skewX(${-targetSkew}deg)`;
        }
      };

      gsap.ticker.add(ticker);

      return () => {
        gsap.ticker.remove(ticker);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'PRECISION — TIME — CRAFT — ENGINEERING — ';

  return (
    <section
      id="marquee-section"
      ref={containerRef}
      className="relative w-full py-16 md:py-24 bg-[#fafafa] overflow-hidden border-y border-black/[0.06] select-none"
    >
      {/* Subtle background coordinate line */}
      <div className="absolute top-4 left-6 md:left-12 text-[10px] font-mono tracking-widest text-[#999] uppercase">
        REF. 00-HOROLOGY // VELOCITY CONTINUUM
      </div>

      <div className="flex flex-col gap-6 md:gap-8 pt-4">
        {/* Row 1 - Bold Solid Typography */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={row1Ref}
            className="flex whitespace-nowrap will-change-transform font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#0f1011] uppercase font-light"
          >
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
          </div>
        </div>

        {/* Row 2 - Editorial Outlined Typography in Opposite Direction */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={row2Ref}
            className="flex whitespace-nowrap will-change-transform font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] uppercase font-bold text-stroke-bold text-transparent"
          >
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
            <span className="inline-block px-4">{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Spec Note */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono tracking-widest text-[#777] uppercase gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-full" />
          <span>SYNCHRONIZED CONTINUOUS ESCAPEMENT MOTION</span>
        </div>
        <span>ATELIER GENÈVE // LIMITED ANNUAL SERIES</span>
      </div>
    </section>
  );
};
