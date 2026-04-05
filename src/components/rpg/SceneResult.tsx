const XP_REWARDS: Record<number, number> = {
  1: 30,
  2: 50,
  3: 80,
}

interface SceneResultProps {
  stars: 1 | 2 | 3
  summary: string
  onRestart: () => void
  onBack: () => void
}

export default function SceneResult({ stars, summary, onRestart, onBack }: SceneResultProps) {
  const xpEarned = XP_REWARDS[stars]

  return (
    <div className="flex flex-col items-center gap-5 p-6 animate-fade-up">
      <div className="text-[48px] leading-none flex gap-1">
        {Array.from({ length: stars }, (_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>

      <p className="text-center text-[15px] text-[var(--text)] leading-snug max-w-[300px]">
        {summary}
      </p>

      <div
        className="text-[14px] font-bold text-white px-4 py-1.5 rounded-full"
        style={{ background: 'linear-gradient(135deg, var(--blue), var(--teal))' }}
      >
        +{xpEarned} XP
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onRestart}
          className="glass-sm px-5 py-2.5 font-bold text-[var(--text)] cursor-pointer transition-transform active:scale-95"
        >
          Rejouer
        </button>
        <button
          onClick={onBack}
          className="btn-cta px-5 py-2.5"
        >
          Retour
        </button>
      </div>
    </div>
  )
}
