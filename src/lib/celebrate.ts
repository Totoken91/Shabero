// Confetti animation — pure CSS, no library
export function launchConfetti() {
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none; z-index: 9999; overflow: hidden;
  `
  document.body.appendChild(container)

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFD700', '#FF8C00']

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = Math.random() * 100
    const delay = Math.random() * 0.5
    const rotation = Math.random() * 360
    const size = Math.random() * 8 + 4

    confetti.style.cssText = `
      position: absolute;
      top: -10px;
      left: ${left}%;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${color};
      border-radius: 2px;
      animation: confetti-fall 2.5s ease-in ${delay}s forwards;
      transform: rotate(${rotation}deg);
    `
    container.appendChild(confetti)
  }

  setTimeout(() => container.remove(), 3500)
}

// Stamp sound — Web Audio API, no file
export function playStampSound() {
  try {
    const ctx = new AudioContext()

    // Low thud
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.2)

    // High click
    const click = ctx.createOscillator()
    const clickGain = ctx.createGain()
    click.type = 'square'
    click.frequency.setValueAtTime(800, ctx.currentTime)
    clickGain.gain.setValueAtTime(0.15, ctx.currentTime)
    clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    click.connect(clickGain)
    clickGain.connect(ctx.destination)
    click.start()
    click.stop(ctx.currentTime + 0.05)
  } catch {}
}

export function celebrate() {
  launchConfetti()
  playStampSound()
}
