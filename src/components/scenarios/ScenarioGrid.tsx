import { useNavigate } from 'react-router-dom'
import { scenarios } from '../../data/scenarios'
import ScenarioCard from './ScenarioCard'

export default function ScenarioGrid() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 gap-3">
      {scenarios.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          onClick={() => navigate(`/scenario/${scenario.id}`)}
        />
      ))}
    </div>
  )
}
