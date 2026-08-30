/** Procedural mixer. Unlock on first gesture. */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let music: GainNode | null = null;
let muted = false;
let marching: { osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode } | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfx = ctx.createGain();
    music = ctx.createGain();
    sfx.gain.value = 0.55;
    music.gain.value = 0.18;
    master.gain.value = muted ? 0 : 0.7;
    sfx.connect(master);
    music.connect(master);
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
}

export function setMuted(v: boolean) {
  muted = v;
  if (master && ctx) {
    master.gain.setTargetAtTime(v ? 0 : 0.7, ctx.currentTime, 0.03);
  }
  if (v) stopMarch();
}

export function isMuted() {
  return muted;
}

function envGain(duration: number, peak = 0.2, attack = 0.01): GainNode | null {
  const c = ac();
  if (!c || !sfx) return null;
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(peak, c.currentTime + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  g.connect(sfx);
  return g;
}

function noiseBuffer(seconds: number) {
  const c = ac();
  if (!c) return null;
  const n = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

export function blip(freq: number, dur = 0.08, type: OscillatorType = "square", peak = 0.08) {
  const c = ac();
  const g = envGain(dur, peak);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  o.connect(g);
  o.start();
  o.stop(c.currentTime + dur);
}

export function thud() {
  const c = ac();
  const g = envGain(0.22, 0.22, 0.005);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(90, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(40, c.currentTime + 0.18);
  o.connect(g);
  o.start();
  o.stop(c.currentTime + 0.22);
  const buf = noiseBuffer(0.12);
  if (!buf) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const ng = envGain(0.1, 0.08, 0.002);
  if (!ng) return;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 400;
  src.connect(f);
  f.connect(ng);
  src.start();
}

export function clash() {
  thud();
  const c = ac();
  const g = envGain(0.15, 0.1, 0.001);
  if (!c || !g) return;
  const buf = noiseBuffer(0.12);
  if (!buf) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 1800;
  src.connect(f);
  f.connect(g);
  src.playbackRate.value = 0.9 + Math.random() * 0.3;
  src.start();
}

export function uiTick() {
  blip(520 + Math.random() * 40, 0.05, "triangle", 0.05);
}

export function uiOk() {
  blip(440, 0.07, "triangle", 0.06);
  setTimeout(() => blip(660, 0.09, "triangle", 0.05), 70);
}

export function uiBad() {
  blip(180, 0.16, "sawtooth", 0.07);
}

export function horn() {
  const c = ac();
  const g = envGain(0.55, 0.12, 0.04);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(220, c.currentTime);
  o.frequency.linearRampToValueAtTime(280, c.currentTime + 0.2);
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 700;
  o.connect(f);
  f.connect(g);
  o.start();
  o.stop(c.currentTime + 0.55);
}

export function startMarch(rate = 1) {
  if (muted) return;
  const c = ac();
  if (!c || !music) return;
  stopMarch();
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.value = 62;
  const g = c.createGain();
  g.gain.value = 0.04;
  const lfo = c.createOscillator();
  lfo.frequency.value = 1.6 * rate;
  const lg = c.createGain();
  lg.gain.value = 0.03;
  lfo.connect(lg);
  lg.connect(g.gain);
  o.connect(g);
  g.connect(music);
  o.start();
  lfo.start();
  marching = { osc: o, gain: g, lfo };
}

export function setMarchRate(rate: number) {
  if (marching && ctx) marching.lfo.frequency.setTargetAtTime(1.6 * rate, ctx.currentTime, 0.08);
}

export function stopMarch() {
  if (!marching) return;
  try {
    marching.osc.stop();
    marching.lfo.stop();
  } catch {
    /* already stopped */
  }
  marching = null;
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const c = ac();
      if (c?.state === "suspended") void c.resume();
    }
  });
}
