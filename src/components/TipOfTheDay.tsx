import { culturalTips } from '../data/tips'

function getTipOfTheDay(): typeof culturalTips[0] {
  // Use the day of the year as index, cycling through all 100 tips
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return culturalTips[dayOfYear % culturalTips.length]
}

export default function TipOfTheDay() {
  const tip = getTipOfTheDay()

  return (
    <div className="phrase-card p-4">
      <div className="relative z-10 flex gap-3">
        <span className="text-[24px] shrink-0">{tip.emoji}</span>
        <div>
          <p className="text-[11px] font-bold text-[var(--text-light)] uppercase tracking-wide mb-1">Tip du jour</p>
          <p className="text-[12px] text-[var(--text)] leading-relaxed">{tip.tip}</p>
        </div>
      </div>
    </div>
  )
}
