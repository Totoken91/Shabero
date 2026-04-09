import { Routes, Route, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import TabNav from './components/TabNav'
import CategoryCard from './components/CategoryCard'
import ScenarioDetail from './components/scenarios/ScenarioDetail'
import SignCategoryCard from './components/signs/SignCategoryCard'
import SignDetail from './components/signs/SignDetail'
import { scenarios } from './data/scenarios'
import { signCategories } from './data/signs'

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

function PhrasesPage() {
  const navigate = useNavigate()
  return (
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
  )
}

function PanneauxPage() {
  const navigate = useNavigate()
  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {signCategories.map((cat, i) => (
          <SignCategoryCard
            key={cat.id}
            category={cat}
            index={i}
            onClick={() => navigate(`/panneaux/${cat.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <AeroBackground />
      <div className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ShineLogo />
                <TabNav />
                <PhrasesPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/panneaux"
            element={
              <>
                <ShineLogo />
                <TabNav />
                <PanneauxPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/scenario/:id"
            element={
              <div className="max-w-lg mx-auto px-4 py-4">
                <ScenarioDetail />
              </div>
            }
          />
          <Route
            path="/panneaux/:id"
            element={
              <div className="max-w-lg mx-auto px-4 py-4">
                <SignDetail />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  )
}
