// High-end Luxury Ambient Watchmaker Soundscape & Video Audio Manager
type AudioListener = (isPlaying: boolean) => void;

class AudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  // Web Audio Nodes
  private masterGain: GainNode | null = null;
  private padGain: GainNode | null = null;
  private tickInterval: number | null = null;
  private chordInterval: number | null = null;
  private currentChordIndex: number = 0;
  private activeOscillators: OscillatorNode[] = [];

  // Luxury cinematic chord progression: Dm9 -> Bbmaj7 -> Fmaj9 -> Am7
  private chordProgressions = [
    [146.83, 220.00, 261.63, 329.63, 440.00], // D3, A3, C4, E4, A4 (Dm9)
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bb2, F3, Bb3, D4, F4 (Bbmaj7)
    [174.61, 261.63, 329.63, 392.00, 523.25], // F3, C4, E4, G4, C5 (Fmaj9)
    [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4 (Am7)
  ];

  public subscribe(fn: AudioListener) {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Pad synth bus
      this.padGain = this.ctx.createGain();
      this.padGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.padGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a cinematic chord pad with soft envelope
  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.padGain) return;

    const now = this.ctx.currentTime;
    const duration = 6.0;

    // Fade out previous oscillators
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop(now + 1.2);
      } catch {
        // ignore
      }
    });
    this.activeOscillators = [];

    // Filter to give that warm, expensive analogue feel
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(700, now + duration);
    filter.Q.setValueAtTime(2.0, now);
    filter.connect(this.padGain);

    frequencies.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      // Micro-detune for lush chorus warmth
      osc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.004), now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 1.5);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(now);
      osc.stop(now + duration + 0.1);
      this.activeOscillators.push(osc);
    });
  }

  // Crisp mechanical chronometer escapement pulse
  private playEscapementTick(isTick: boolean) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const tickGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = isTick ? 3600 : 3100;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.035);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isTick ? 4400 : 3800, now);
    filter.Q.setValueAtTime(7, now);

    tickGain.gain.setValueAtTime(0, now);
    tickGain.gain.linearRampToValueAtTime(0.18, now + 0.003);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(filter);
    filter.connect(tickGain);
    tickGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  // Unmutes all DOM video elements so video soundtrack also plays!
  private unmuteAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = false;
      video.volume = 0.9;
      video.play().catch(() => {});
    });
  }

  private muteAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = true;
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    try {
      this.initContext();
      this.isPlaying = true;
      this.notify();

      // 1. Unmute videos
      this.unmuteAllVideos();

      // 2. Start Luxury Ambient Chords
      this.currentChordIndex = 0;
      this.playChord(this.chordProgressions[0]);
      this.chordInterval = window.setInterval(() => {
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;
        this.playChord(this.chordProgressions[this.currentChordIndex]);
      }, 5500);

      // 3. Start Rhythmic Horological Escapement (4Hz)
      let tickCounter = 0;
      this.tickInterval = window.setInterval(() => {
        tickCounter++;
        this.playEscapementTick(tickCounter % 2 === 0);
      }, 250);
    } catch (e) {
      console.warn('AudioContext autoplay policy blocked or error:', e);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    this.isPlaying = false;
    this.notify();

    // Mute videos
    this.muteAllVideos();

    if (this.chordInterval !== null) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }

    if (this.tickInterval !== null) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }

    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // ignore
      }
    });
    this.activeOscillators = [];
  }

  public get active(): boolean {
    return this.isPlaying;
  }
}

export const audioManager = new AudioManager();
