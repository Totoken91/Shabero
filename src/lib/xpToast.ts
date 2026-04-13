export function showXPToast(amount: number, bonus?: string) {
  const toast = document.createElement('div')
  toast.textContent = bonus ? `+${amount} XP ${bonus}` : `+${amount} XP`
  const isSmall = amount <= 5
  toast.style.cssText = `
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: ${isSmall ? '14px' : '18px'};
    color: ${isSmall ? '#B0B0B0' : '#FFD700'};
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    pointer-events: none;
    z-index: 9999;
    animation: xp-toast 1.2s ease-out forwards;
  `
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 1300)
}
