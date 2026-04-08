import { Routes, Route, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import CategoryCard from './components/CategoryCard'
import ScenarioDetail from './components/scenarios/ScenarioDetail'
import { scenarios } from './data/scenarios'

function Footer() {
  return (
    <footer className="footer-aero mt-8">
      <p className="relative z-10">
        Fait avec <span role="img" aria-label="bubble">🫧</span> pour les voyageurs curieux
      </p>
      <p className="relative z-10 mt-1 text-[11px] opacity-60">
        Shabero — しゃべろう
      </p>
    </footer>
  )
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <ShineLogo />
      <div className="max-w-[900px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {scenarios.map((scenario, i) => (
            <CategoryCard
              key={scenario.id}
              scenario={scenario}
              index={i}
              onClick={() => navigate(`/scenario/${scenario.id}`)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <AeroBackground />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/scenario/:id"
            element={
              <div className="max-w-lg mx-auto px-4 py-4">
                <ScenarioDetail />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  )
}
