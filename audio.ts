/**
 * Web Audio synthesizer for Leon Vasari VHS Filmography.
 * Synthesizes vintage mechanical tape, foley paper, and film-specific signature audio.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private lastSlideTime: number = 0;
  private lastTickTime: number = 0;

  constructor() {
    // Initialized on first user interaction
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.muted = !this.muted;
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  // Soft tactile spine hover tick (brushing against cardboard VHS spines)
  public playSpineTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = performance.now();
    if (now - this.lastTickTime < 40) return; // throttle
    this.lastTickTime = now;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(2, t);

    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  // Wooden shelf slide / tape friction when scrolling
  public playShelfSlide(intensity: number = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = performance.now();
    if (now - this.lastSlideTime < 80) return;
    this.lastSlideTime = now;

    const t = this.ctx.currentTime;
    const dur = 0.08 + Math.min(intensity * 0.04, 0.08);

    // Filtered noise buffer for cardboard friction
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700 + intensity * 300, t);
    filter.frequency.exponentialRampToValueAtTime(250, t + dur);

    const gain = this.ctx.createGain();
    const peakGain = Math.min(0.04 * intensity, 0.07);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(peakGain, t + dur * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
    whiteNoise.stop(t + dur);
  }

  /**
   * Unique acoustic / cinematic signature for each of the 5 films!
   * 0: The Silent Valley (1958) - Mountain solitude, meditative wooden flute / singing bowl chime
   * 1: The Last Summer (1966) - Warm nostalgic Rhodes 60s vibraphone chord with tape tremolo
   * 2: Noon in Ashes (1971) - Gritty Western slide guitar resonance & desert whistle
   * 3: Light in the Storm (1978) - Maritime storm swell, low cello bow & distant foghorn chime
   * 4: Red Door (1989) - 80s analog synthwave brass shimmer & cassette spin-up
   */
  public playFilmSignature(filmIndex: number) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (filmIndex % 5) {
      case 0: {
        // Film 0: The Silent Valley (1958) - Meditative mist & mountain temple bells
        const freqs = [587.33, 880, 1174.66]; // D5, A5, D6 pentatonic
        freqs.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.05);

          const start = t + idx * 0.05;
          const dur = 1.1;
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + dur + 0.05);
        });

        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(146.83, t); // D3
        subGain.gain.setValueAtTime(0.08, t);
        subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
        subOsc.connect(subGain);
        subGain.connect(this.ctx.destination);
        subOsc.start(t);
        subOsc.stop(t + 0.85);
        break;
      }

      case 1: {
        // Film 1: The Last Summer (1966) - Warm 60s vibraphone chord (Fmaj7) with flutter
        const chord = [349.23, 440.0, 523.25, 659.25]; // F4, A4, C5, E5
        chord.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          osc.frequency.linearRampToValueAtTime(freq + (i % 2 === 0 ? 1.5 : -1.5), t + 0.6);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1800, t);

          const dur = 1.2;
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.045, t + 0.04 + i * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + dur + 0.05);
        });
        break;
      }

      case 2: {
        // Film 2: Noon in Ashes (1971) - Western slide dobro guitar bend & whistle
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(185, t + 0.35);
        osc.frequency.exponentialRampToValueAtTime(146.83, t + 0.7);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, t);
        filter.Q.setValueAtTime(3.5, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.95);

        const whistle = this.ctx.createOscillator();
        const wGain = this.ctx.createGain();
        whistle.type = 'sine';
        whistle.frequency.setValueAtTime(880, t + 0.08);
        whistle.frequency.linearRampToValueAtTime(740, t + 0.5);
        wGain.gain.setValueAtTime(0.001, t + 0.08);
        wGain.gain.linearRampToValueAtTime(0.03, t + 0.15);
        wGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        whistle.connect(wGain);
        wGain.connect(this.ctx.destination);
        whistle.start(t + 0.08);
        whistle.stop(t + 0.75);
        break;
      }

      case 3: {
        // Film 3: Light in the Storm (1978) - Oceanic low cello drone + distant lighthouse foghorn
        // Low oceanic drone (C2 + G2)
        const celloLow = this.ctx.createOscillator();
        const celloGain = this.ctx.createGain();
        const celloFilter = this.ctx.createBiquadFilter();

        celloLow.type = 'sawtooth';
        celloLow.frequency.setValueAtTime(65.41, t); // C2
        celloLow.frequency.linearRampToValueAtTime(64.2, t + 1.2);

        celloFilter.type = 'lowpass';
        celloFilter.frequency.setValueAtTime(320, t);
        celloFilter.frequency.exponentialRampToValueAtTime(180, t + 1.4);

        celloGain.gain.setValueAtTime(0.001, t);
        celloGain.gain.linearRampToValueAtTime(0.07, t + 0.18);
        celloGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);

        celloLow.connect(celloFilter);
        celloFilter.connect(celloGain);
        celloGain.connect(this.ctx.destination);
        celloLow.start(t);
        celloLow.stop(t + 1.55);

        // Distant brass foghorn chord (C3 + E3)
        const foghorn = this.ctx.createOscillator();
        const fogGain = this.ctx.createGain();
        foghorn.type = 'triangle';
        foghorn.frequency.setValueAtTime(130.81, t + 0.12);
        fogGain.gain.setValueAtTime(0.001, t + 0.12);
        fogGain.gain.linearRampToValueAtTime(0.05, t + 0.35);
        fogGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);

        foghorn.connect(fogGain);
        fogGain.connect(this.ctx.destination);
        foghorn.start(t + 0.12);
        foghorn.stop(t + 1.35);
        break;
      }

      case 4: {
        // Film 4: Red Door (1989) - 80s analog synthwave brass shimmer & cassette spin-up
        const chord = [220, 277.18, 329.63, 440]; // A3, C#4, E4, A4
        chord.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq * 0.92, t);
          osc.frequency.exponentialRampToValueAtTime(freq, t + 0.12);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400, t);
          filter.frequency.exponentialRampToValueAtTime(2600, t + 0.25);
          filter.frequency.exponentialRampToValueAtTime(600, t + 1.1);
          filter.Q.setValueAtTime(4, t);

          const dur = 1.3;
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.04, t + 0.08 + idx * 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + dur + 0.05);
        });
        break;
      }
    }
  }

  // Tape eject + paper expansion sound when opening detail
  public playOpenDetail(filmIndex: number) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Mechanical cassette release click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(420, t);
    clickOsc.frequency.exponentialRampToValueAtTime(60, t + 0.04);
    clickGain.gain.setValueAtTime(0.09, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.05);

    // 2. Paper unfolding swoosh (air whoosh)
    const dur = 0.35;
    const bufSize = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const pFilter = this.ctx.createBiquadFilter();
    pFilter.type = 'bandpass';
    pFilter.frequency.setValueAtTime(400, t + 0.04);
    pFilter.frequency.exponentialRampToValueAtTime(1400, t + 0.22);
    pFilter.frequency.exponentialRampToValueAtTime(500, t + dur);
    pFilter.Q.setValueAtTime(1.8, t);

    const pGain = this.ctx.createGain();
    pGain.gain.setValueAtTime(0.001, t + 0.04);
    pGain.gain.linearRampToValueAtTime(0.06, t + 0.15);
    pGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    noise.connect(pFilter);
    pFilter.connect(pGain);
    pGain.connect(this.ctx.destination);
    noise.start(t + 0.04);
    noise.stop(t + dur + 0.05);

    // 3. Ink bloom harmonic resonance (echoes the film signature)
    setTimeout(() => {
      this.playFilmSignature(filmIndex);
    }, 450);
  }

  // Detail close: soft paper snap and case return
  public playCloseDetail() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);

    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Red directorial seal stamp sound
  public playStampSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.08);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }
}

export const sound = new SoundEngine();
