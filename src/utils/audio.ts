// Web Audio API horological escapement synthesizer
class EscapementSynthesizer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private intervalId: number | null = null;
  private tickCount: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generates a delicate, high-precision Swiss mechanical escapement sound
  private playEscapementTick(isTick: boolean) {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Alternate frequency slightly between 'tick' (balance wheel unlocking) and 'tock' (impulse pin contact)
    const baseFreq = isTick ? 3400 : 2900;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.025);

    // Filter to emulate metallic jewel pallet contact
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isTick ? 4200 : 3800, now);
    filter.Q.setValueAtTime(6, now);

    // Very short, crisp mechanical impulse envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  public toggle(enable?: boolean): boolean {
    const targetState = enable !== undefined ? enable : !this.isRunning;
    if (targetState) {
      this.start();
    } else {
      this.stop();
    }
    return this.isRunning;
  }

  public start() {
    if (this.isRunning) return;
    try {
      this.initContext();
      this.isRunning = true;
      // 28,800 vph is 8 beats per second (every 125ms) or a comfortable rhythm
      this.intervalId = window.setInterval(() => {
        this.tickCount++;
        this.playEscapementTick(this.tickCount % 2 === 0);
      }, 250);
    } catch (e) {
      console.warn('AudioContext not allowed yet', e);
      this.isRunning = false;
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public get active(): boolean {
    return this.isRunning;
  }
}

export const escapementAudio = new EscapementSynthesizer();
