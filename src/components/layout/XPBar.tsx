import { useAppStore } from '../../store/appStore'
import { getLevelInfo } from '../../lib/xp'

export default function XPBar() {
  const xp = useAppStore((s) => s.xp)
  const { level, xpInLevel, xpForLevel, progress } = getLevelInfo(xp)

  return (
    <div className="glass-sm rounded-xl p-3">
      <div className="flex items-center justify-between text-sm text-white mb-1">
        <span>⭐ Niveau {level}</span>
        <span>{xpInLevel} / {xpForLevel} XP</span>
      </div>
      <div className="h-3 rounded-full bg-white/20 overflow-hidden">
        <div
          className="xp-fill h-full rounded-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  )
}
