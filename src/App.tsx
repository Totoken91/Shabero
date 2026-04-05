import { Routes, Route, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import CategoryCard from './components/CategoryCard'
import ScenarioDetail from './components/scenarios/ScenarioDetail'
import { scenarios } from './data/scenarios'

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <ShineLogo />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {scenarios.map((scenario, i) => (
          <CategoryCard
            key={scenario.id}
            scenario={scenario}
            index={i}
            onClick={() => navigate(`/scenario/${scenario.id}`)}
          />
        ))}
      </div>
      <footer className="footer-fade mt-8 py-4 text-center text-white/40 text-[12px]">
        Fait pour les voyageurs
      </footer>
    </>
  )
}

export default function App() {
  return (
    <>
      <AeroBackground />
      <div className="relative z-10 max-w-lg mx-auto w-full px-4 pb-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scenario/:id" element={<ScenarioDetail />} />
        </Routes>
      </div>
    </>
  )
}
