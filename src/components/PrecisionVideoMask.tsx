import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioManager } from '../utils/audioManager';

gsap.registerPlugin(ScrollTrigger);

interface PrecisionVideoMaskProps {
  videoSrc?: string;
}

export const PrecisionVideoMask: React.FC<PrecisionVideoMaskProps> = ({
  videoSrc = '/watchvedioaboutsection.mp4',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskScaleRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Audio manager integration (sync muted state if user toggles global audio)
    const unsubscribe = audioManager.subscribe((isPlaying) => {
      if (video) {
        video.muted = !isPlaying;
        if (isPlaying) {
          video.volume = 0.8;
          video.play().catch(() => {});
        }
      }
    });

    // Ensure video is playing
    video.play().catch(() => {
      // Autoplay with muted is allowed by all browsers
      video.muted = true;
      video.play().catch(() => {});
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const maskScale = maskScaleRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;
    const topMeta = topMetaRef.current;
    const bottomMeta = bottomMetaRef.current;

    if (!section || !pin || !maskScale || !videoWrap) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(maskScale, { scale: 1 });
      gsap.set(videoWrap, { scale: 1.1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state:
      // Starts slightly smaller (approx 65vw width)
      gsap.set(maskScale, {
        scale: 0.82,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      // Video subtle initial parallax offset
      gsap.set(videoWrap, {
        scale: 1.08,
        yPercent: -6,
        xPercent: -2,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      if (topMeta && bottomMeta) {
        gsap.set([topMeta, bottomMeta], { opacity: 0.35 });
      }

      // Main Scroll-Driven Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
          onEnter: () => {
            video?.play().catch(() => {});
          },
          onLeave: () => {
            video?.pause();
          },
          onEnterBack: () => {
            video?.play().catch(() => {});
          },
          onLeaveBack: () => {
            video?.pause();
          },
        },
      });

      // PHASE 1 (0 -> 50% scroll):
      // "PRECISION" scales smoothly from ~65vw -> ~85vw
      // Video subtly shifts vertically and horizontally (parallax)
      tl.to(
        maskScale,
        {
          scale: 1.0,
          ease: 'none',
          duration: 1,
        },
        0
      );

      tl.to(
        videoWrap,
        {
          yPercent: 2,
          xPercent: 1,
          scale: 1.15,
          ease: 'none',
          duration: 1,
        },
        0
      );

      if (topMeta && bottomMeta) {
        tl.to(
          [topMeta, bottomMeta],
          {
            opacity: 0.7,
            ease: 'none',
            duration: 1,
          },
          0
        );
      }

      // PHASE 2 (50% -> 100% scroll):
      // "PRECISION" slowly expands toward the edges of the viewport (~92-95vw)
      // The video reveals more movement through the enlarged letterforms
      tl.to(
        maskScale,
        {
          scale: 1.16,
          ease: 'none',
          duration: 1,
        },
        1
      );

      tl.to(
        videoWrap,
        {
          yPercent: 8,
          xPercent: 3,
          scale: 1.22,
          ease: 'none',
          duration: 1,
        },
        1
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="precision-mask-section"
      ref={sectionRef}
      className="relative w-full h-[240vh] bg-[#000000] text-white overflow-visible select-none"
      aria-label="Precision Horological Cinema"
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* PINNED FULLSCREEN VIEWPORT STAGE                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000]"
      >
        {/* Subtle Luxury Top Architectural Label */}
        <div
          ref={topMetaRef}
          className="absolute top-16 sm:top-14 left-0 w-full z-30 px-4 sm:px-16 flex items-center justify-between pointer-events-none text-[9px] sm:text-xs font-mono tracking-[0.20em] sm:tracking-[0.28em] text-neutral-400 uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            <span>SWISS HOROLOGICAL CINEMA</span>
          </div>
          <span className="hidden sm:inline-block opacity-60">CHAPTER // HOROLOGY IN MOTION</span>
        </div>

        {/* ── LAYER 1: HARDWARE-ACCELERATED WATCH VIDEO ── */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
            style={{ filter: 'contrast(1.08) brightness(1.04)' }}
          />
        </div>

        {/* ── LAYER 2: THE SVG KNOCKOUT MASK & TYPOGRAPHY STAGE ── */}
        {/*
          This container scales from 0.82 (~65vw) to 1.0 (~85vw) to 1.16 (~94vw).
          Inside, a solid #000000 rectangle with an SVG knockout mask covers 100%
          of the viewport, leaving transparent holes ONLY in the shapes of the letters.
        */}
        <div
          ref={maskScaleRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg
            className="w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Luminance Knockout Mask: White = opaque black rect, Black = transparent cutout hole */}
              <mask
                id="precision-letter-mask"
                maskUnits="userSpaceOnUse"
                x="-1200"
                y="-800"
                width="4000"
                height="2600"
              >
                {/* 1. White covers the entire infinite canvas -> renders black rect 100% opaque */}
                <rect x="-1200" y="-800" width="4000" height="2600" fill="#ffffff" />

                {/* 2. Black text cuts transparent windows in the exact shapes of "PRECISION" */}
                <text
                  x="800"
                  y="450"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="2.5"
                  style={{
                    fontFamily: '"Cormorant Garamond", "Didot", "Bodoni MT", Georgia, serif',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    fontSize: '156px',
                  }}
                  className="select-none uppercase"
                >
                  PRECISION
                </text>
              </mask>
            </defs>

            {/* 3. The Solid #000000 Blackout Screen Masked by the Letter Cutouts */}
            <rect
              x="-1200"
              y="-800"
              width="4000"
              height="2600"
              fill="#000000"
              mask="url(#precision-letter-mask)"
            />

            {/* 4. Diamond-cut luxury hairline outline (subtle 0.25 opacity) to define pristine serif geometry */}
            <text
              x="800"
              y="450"
              textAnchor="middle"
              dominantBaseline="central"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.85"
              strokeOpacity="0.28"
              style={{
                fontFamily: '"Cormorant Garamond", "Didot", "Bodoni MT", Georgia, serif',
                fontWeight: 600,
                letterSpacing: '0.22em',
                fontSize: '156px',
              }}
              className="select-none uppercase"
            >
              PRECISION
            </text>
          </svg>
        </div>

        {/* Subtle Luxury Bottom Architectural Coordinates */}
        <div
          ref={bottomMetaRef}
          className="absolute bottom-20 sm:bottom-14 left-0 w-full z-30 px-4 sm:px-16 flex items-center justify-between pointer-events-none text-[9px] sm:text-xs font-mono tracking-[0.20em] sm:tracking-[0.28em] text-neutral-400 uppercase"
        >
          <span className="opacity-60">MANUFACTURE EN SUISSE</span>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span>TIMELESS ARTISTRY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
