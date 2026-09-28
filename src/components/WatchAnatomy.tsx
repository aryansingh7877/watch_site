import React, { useState, useRef, useEffect } from 'react';
import { EXPLODED_PARTS, ExplodedPart } from '../data/watches';
import { Play, Pause, RotateCcw, ShieldCheck, Cpu, SlidersHorizontal } from 'lucide-react';

export const WatchAnatomy: React.FC = () => {
  const [activePartIndex, setActivePartIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePart = EXPLODED_PARTS[activePartIndex];

  // Map parts to approximate video timestamp moments in watchvedioaboutsection.mp4 (8.7 seconds total)
  const partTimestamps = [
    { number: '01', time: 1.8 }, // Crystal
    { number: '02', time: 3.2 }, // Dial
    { number: '03', time: 4.1 }, // Hands
    { number: '04', time: 5.2 }, // Movement
    { number: '05', time: 6.2 }, // Case
    { number: '06', time: 6.8 }, // Case Back
    { number: '07', time: 7.4 }, // Crown
    { number: '08', time: 7.9 }, // Strap
  ];

  const handleSelectPart = (idx: number) => {
    setActivePartIndex(idx);
    if (videoRef.current) {
      videoRef.current.currentTime = partTimestamps[idx].time;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const reassembleWatch = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setActivePartIndex(0);
    }
  };

  // Sync active part automatically as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const cur = video.currentTime;
      if (cur < 2.2) setActivePartIndex(0); // Crystal
      else if (cur < 3.8) setActivePartIndex(1); // Dial
      else if (cur < 4.8) setActivePartIndex(2); // Hands
      else if (cur < 5.8) setActivePartIndex(3); // Movement
      else if (cur < 6.5) setActivePartIndex(4); // Case
      else if (cur < 7.2) setActivePartIndex(5); // Case Back
      else if (cur < 7.7) setActivePartIndex(6); // Crown
      else setActivePartIndex(7); // Strap
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section
      id="anatomy"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-[#ffffff] border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#777] uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span>CHAPTER 04 // STRUCTURAL DECONSTRUCTION</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight font-normal">
              0.002 MM TOLERANCE. <br />
              <span className="italic font-light text-[#555]">EXPLODED ARCHITECTURE.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-[#555] leading-relaxed">
            The anatomy of a PRECISION chronometer. Every component is machined from monolithic billets and hand-regulated to withstand extreme gravitational forces and hydrostatic pressures.
          </p>
        </div>

        {/* Exploded Watch Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Video of Exploded Components & Reassembly */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-[#fbfbfb] rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
            <video
              ref={videoRef}
              src="/watchvedioaboutsection.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-colors"
                  aria-label={isPlaying ? 'Pause film' : 'Play film'}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                </button>
                <button
                  onClick={reassembleWatch}
                  className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono uppercase tracking-wider hover:bg-white/40 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw size={10} />
                  <span>REASSEMBLE</span>
                </button>
              </div>

              <div className="text-[11px] font-mono tracking-widest text-white/90">
                ACTIVE LAYER: {activePart.number} / 08
              </div>
            </div>
          </div>

          {/* Right: Component Telemetry & Exploded Part Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Active Component Card */}
            <div className="bg-[#fafafa] rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#888] border-b border-black/[0.06] pb-3">
                <span className="tracking-widest uppercase">COMPONENT SPECIFICATION</span>
                <span className="font-semibold text-black">{activePart.number} — 08</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl text-black tracking-tight font-medium">
                  {activePart.name}
                </h3>
                <p className="text-xs font-mono text-[#666] tracking-wider uppercase mt-1">
                  ROLE: {activePart.role}
                </p>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#444] leading-relaxed">
                {activePart.spec}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-black/[0.06] text-xs font-mono">
                <div>
                  <span className="block text-[10px] text-[#999] uppercase">MATERIAL COMPOSITION</span>
                  <span className="font-medium text-black text-[11px]">{activePart.material}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#999] uppercase">MACHINING TOLERANCE</span>
                  <span className="font-medium text-black text-[11px]">{activePart.tolerance}</span>
                </div>
              </div>
            </div>

            {/* Exploded Parts Sequence Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase block">
                EXPLODED SEQUENCE SELECTOR
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {EXPLODED_PARTS.map((part, idx) => (
                  <button
                    key={part.number}
                    onClick={() => handleSelectPart(idx)}
                    className={`p-2 rounded-lg text-left text-[11px] font-mono transition-all border ${
                      activePartIndex === idx
                        ? 'bg-black text-white border-black shadow'
                        : 'bg-white text-[#555] border-black/10 hover:border-black/30'
                    }`}
                  >
                    <span className="block text-[9px] opacity-60">{part.number}</span>
                    <span className="truncate block font-medium uppercase mt-0.5">
                      {part.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
