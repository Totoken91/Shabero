import type { RPGScene } from '../../types'

interface SceneCardProps {
  scene: RPGScene
  stars: number
  onClick: () => void
}

const difficultyColors: Record<RPGScene['difficulty'], string> = {
  debutant: 'var(--green)',
  moyen: 'var(--orange)',
  hardcore: '#e53e3e',
}

const difficultyLabels: Record<RPGScene['difficulty'], string> = {
  debutant: 'Debutant',
  moyen: 'Moyen',
  hardcore: 'Hardcore',
}

export default function SceneCard({ scene, stars, onClick }: SceneCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass cursor-pointer p-4 flex flex-col items-start gap-2 text-left transition-transform duration-150 active:scale-95 hover:scale-[1.03]"
    >
      <span className="text-[40px] leading-none">{scene.icon}</span>

      <span className="font-bold text-[var(--text)]">{scene.title}</span>

      <span className="text-[12px] text-[var(--text-2)] opacity-70 leading-snug">
        {scene.description}
      </span>

      <div className="flex items-center gap-2 mt-1">
        <span
          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
          style={{ background: difficultyColors[scene.difficulty] }}
        >
          {difficultyLabels[scene.difficulty]}
        </span>
        <span className="text-[11px] text-[var(--text-2)] opacity-60">
          {scene.estimatedTime}
        </span>
      </div>

      <div className="flex items-center gap-0.5 mt-1">
        {[1, 2, 3].map((i) => (
          <span key={i} className="text-[18px] leading-none">
            {i <= stars ? '⭐' : '☆'}
          </span>
        ))}
        {stars > 0 && (
          <span className="ml-2 text-[10px] font-bold text-[var(--green-2)]">
            Terminé
          </span>
        )}
      </div>
    </button>
  )
}
