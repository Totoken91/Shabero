import { useNavigate } from 'react-router-dom'
import { scenes } from '../../data/scenes'
import { useAppStore } from '../../store/appStore'
import SceneCard from './SceneCard'

export default function SceneList() {
  const navigate = useNavigate()
  const rpgStars = useAppStore((s) => s.rpgStars)

  return (
    <div className="grid grid-cols-2 gap-3 p-4 pb-tab">
      {scenes.map((scene) => (
        <SceneCard
          key={scene.id}
          scene={scene}
          stars={rpgStars[scene.id] ?? 0}
          onClick={() => navigate(`/rpg/${scene.id}`)}
        />
      ))}
    </div>
  )
}
