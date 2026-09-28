import React, { useRef, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Sync video mute state with audioManager
    const unsubscribe = audioManager.subscribe((isPlaying) => {
      if (video) {
        video.muted = !isPlaying;
        if (isPlaying) {
          video.volume = 0.9;
          video.play().catch(() => {});
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-screen w-full overflow-hidden bg-black select-none"
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/* FULL-SCREEN WATCH VIDEO                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/watchvedio2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};
