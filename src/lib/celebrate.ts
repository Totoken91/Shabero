import { playStampEarned } from './sounds'

export function launchConfetti() {
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none; z-index: 9999; overflow: hidden;
  `
  document.body.appendChild(container)

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFD700', '#FF8C00']

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = Math.random() * 100
    const delay = Math.random() * 0.6
    const rotation = Math.random() * 360
    const size = Math.random() * 10 + 4
    const isCircle = Math.random() > 0.5

    confetti.style.cssText = `
      position: absolute;
      top: -10px;
      left: ${left}%;
      width: ${size}px;
      height: ${isCircle ? size : size * 0.5}px;
      background: ${color};
      border-radius: ${isCircle ? '50%' : '2px'};
      animation: confetti-fall ${2 + Math.random()}s ease-in ${delay}s forwards;
      transform: rotate(${rotation}deg);
    `
    container.appendChild(confetti)
  }

  setTimeout(() => container.remove(), 4000)
}

export function celebrate() {
  launchConfetti()
  playStampEarned()
}
