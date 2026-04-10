function getCtx(): AudioContext | null {
  try { return new AudioContext() } catch { return null }
}

/** Ding aigu — bonne réponse */
export function playCorrect() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime

  // Two-tone ding (C6 + E6)
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()
  osc1.type = 'sine'
  osc2.type = 'sine'
  osc1.frequency.setValueAtTime(1047, t) // C6
  osc2.frequency.setValueAtTime(1319, t) // E6
  gain.gain.setValueAtTime(0.2, t)
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2)
  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(ctx.destination)
  osc1.start(t)
  osc2.start(t)
  osc1.stop(t + 0.2)
  osc2.stop(t + 0.2)
}

/** Boop sourd — mauvaise réponse */
export function playWrong() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(250, t)
  osc.frequency.exponentialRampToValueAtTime(150, t + 0.2)
  gain.gain.setValueAtTime(0.25, t)
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.25)
}

/** Jingle 3 notes montantes — étape validée */
export function playStepComplete() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  const notes = [523, 659, 784] // C5, E5, G5

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t + i * 0.12)
    gain.gain.setValueAtTime(0, t)
    gain.gain.setValueAtTime(0.25, t + i * 0.12)
    gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.12 + 0.2)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t + i * 0.12)
    osc.stop(t + i * 0.12 + 0.25)
  })
}

/** Fanfare victoire — tampon gagné */
export function playStampEarned() {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime

  // Thud impact
  const thud = ctx.createOscillator()
  const thudGain = ctx.createGain()
  thud.type = 'sine'
  thud.frequency.setValueAtTime(180, t)
  thud.frequency.exponentialRampToValueAtTime(40, t + 0.2)
  thudGain.gain.setValueAtTime(0.5, t)
  thudGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25)
  thud.connect(thudGain)
  thudGain.connect(ctx.destination)
  thud.start(t)
  thud.stop(t + 0.25)

  // Victory jingle after the thud (5 notes ascending)
  const notes = [523, 659, 784, 1047, 1319] // C5 E5 G5 C6 E6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t + 0.3 + i * 0.1)
    gain.gain.setValueAtTime(0, t)
    gain.gain.setValueAtTime(0.2, t + 0.3 + i * 0.1)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3 + i * 0.1 + 0.3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t + 0.3 + i * 0.1)
    osc.stop(t + 0.3 + i * 0.1 + 0.35)
  })
}
