import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Sun, Moon, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TimeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeHeadingRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeHour, setActiveHour] = useState('12:30');

  const timeMoments = [
    { label: '10:00', note: 'A New Moment Begins', time: 0 },
    { label: '12:30', note: 'Precision in Motion', time: 2.2 },
    { label: '15:45', note: 'Every Second Counts', time: 4.1 },
    { label: '18:20', note: 'Design Remains Constant', time: 6.0 },
    { label: '23:59', note: 'Time, Redefined', time: 7.8 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal shift of typography and vertical parallax of watch video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // TIME shifts horizontally from right to left
      if (timeHeadingRef.current) {
        tl.fromTo(
          timeHeadingRef.current,
          { xPercent: 15 },
          { xPercent: -20, ease: 'none' },
          0
        );
      }

      // Watch video moves vertically with subtle scale and parallax
      if (videoWrapperRef.current) {
        tl.fromTo(
          videoWrapperRef.current,
          { y: 80, scale: 0.95 },
          { y: -80, scale: 1.05, ease: 'none' },
          0
        );
      }
    }, containerRef);

    // Pause video when outside viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  const scrubToMoment = (m: (typeof timeMoments)[0]) => {
    setActiveHour(m.label);
    if (videoRef.current) {
      videoRef.current.currentTime = m.time;
    }
  };

  return (
    <section
      id="time"
      ref={containerRef}
      className="relative min-h-screen w-full py-28 md:py-40 bg-[#f5f5f7] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Top Section Metadata */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between text-xs font-mono tracking-widest text-[#777] uppercase">
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-black" />
          <span>CHAPTER 05 // THE CONTINUUM</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>86,400 SECONDS DAILY</span>
          <span>CHRONOMETRIC RESONANCE</span>
        </div>
      </div>

      {/* Centerpiece: Giant TIME typography + Watch Video interaction */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-8 md:my-16">
        {/* Giant Typographic Horizon */}
        <div className="w-full overflow-hidden flex items-center justify-center">
          <h2
            ref={timeHeadingRef}
            className="font-display font-black text-[28vw] md:text-[24vw] leading-none tracking-[-0.04em] uppercase text-black/[0.04] whitespace-nowrap will-change-transform select-none"
          >
            TIME TIME TIME
          </h2>
        </div>

        {/* Floating Watch Video intersecting the typography */}
        <div
          ref={videoWrapperRef}
          className="absolute z-20 w-11/12 max-w-3xl aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-black/[0.08] bg-white will-change-transform"
        >
          <video
            ref={videoRef}
            src="/watchvedio3.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Clean minimal lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Video bottom status */}
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white z-20">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 block">
                DIURNAL CYCLE
              </span>
              <p className="font-serif text-xl sm:text-2xl text-white font-light">
                {timeMoments.find((m) => m.label === activeHour)?.note || 'Precision in Motion'}
              </p>
            </div>
            <div className="font-mono text-sm tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              {activeHour}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Time Dial & Diurnal Phase Buttons */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-black/[0.06]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase block">
            CHRONOMETRIC DIURNAL SCRUBBER
          </span>
          <div className="flex items-center gap-2 mt-2">
            {timeMoments.map((m) => (
              <button
                key={m.label}
                onClick={() => scrubToMoment(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all uppercase tracking-wider ${
                  activeHour === m.label
                    ? 'bg-black text-white shadow'
                    : 'bg-white/80 text-[#555] border border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md text-right hidden lg:block">
          <p className="font-serif italic text-lg text-[#222]">
            “Time, redefined. Designed for every second.”
          </p>
          <span className="text-[10px] font-mono text-[#888] tracking-widest uppercase">
            MANUFACTURE PRINCIPLE NO. 01
          </span>
        </div>
      </div>
    </section>
  );
};
