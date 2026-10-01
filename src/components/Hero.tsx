import React, { useRef, useEffect, useState } from 'react';
import { audioManager } from '../utils/audioManager';
import { Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical iOS WebKit Safari configurations:
    // React does not always set the HTML 'muted' attribute in the DOM,
    // which causes iOS Safari to reject autoplay as non-silent media.
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy or iOS Low Power Mode
            setIsPlaying(false);
          });
      }
    };

    // Attempt autoplay immediately
    playVideo();

    // In case iOS Low Power Mode or Safari policy pauses it:
    // Resume playback on user's first touch or scroll gesture
    const handleGesture = () => {
      setHasInteracted(true);
      if (video.paused) {
        playVideo();
      }
    };

    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleGesture, { once: true, passive: true });

    // Sync video mute state with audioManager
    const unsubscribe = audioManager.subscribe((audioActive) => {
      if (video) {
        video.muted = !audioActive;
        if (audioActive) {
          video.volume = 0.9;
          playVideo();
        }
      }
    });

    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);

    return () => {
      unsubscribe();
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setHasInteracted(true);
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <section
      id="hero-section"
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black select-none"
      onClick={handleManualPlay}
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* FULL-SCREEN WATCH VIDEO & POSTER FALLBACK                   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/watchvedio2.mp4"
          poster="/hero_poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── LUXURY EDITORIAL OVERLAY (Adds depth & confirms page readiness) ── */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14">
        {/* Subtle top metadata */}
        <div className="pt-12 sm:pt-14 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-white/50 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            <span>CALIBRE ATELIER // 001</span>
          </div>
          <span className="hidden sm:inline-block">GENÈVE HOROLOGY</span>
        </div>

        {/* Center play prompt (only shows if iOS Low Power Mode blocks video & user hasn't interacted) */}
        {!isPlaying && !hasInteracted && (
          <div className="pointer-events-auto self-center flex flex-col items-center gap-3 transition-opacity duration-300">
            <button
              onClick={handleManualPlay}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-mono tracking-widest uppercase transition-all shadow-lg active:scale-95"
              aria-label="Play video"
            >
              <Play size={12} className="fill-white group-hover:scale-110 transition-transform" />
              <span>TAP TO PLAY</span>
            </button>
          </div>
        )}

        {/* Bottom Scroll Cue */}
        <div className="pb-14 sm:pb-16 flex flex-col items-center text-center">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-2">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

