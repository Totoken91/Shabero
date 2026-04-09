import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import TabNav from './components/TabNav'

// Cours
import LessonCard from './components/cours/LessonCard'
import LessonPlayer from './components/cours/LessonPlayer'
import { lessons } from './data/lessons'

// Quiz
import QuizModeSelect from './components/quiz/QuizModeSelect'
import QuizSession from './components/quiz/QuizSession'

// Dico
import CategoryCard from './components/CategoryCard'
import ScenarioDetail from './components/scenarios/ScenarioDetail'
import SignCategoryCard from './components/signs/SignCategoryCard'
import SignDetail from './components/signs/SignDetail'
import DicoToggle from './components/dico/DicoToggle'
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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShineLogo />
      <TabNav />
      <div className="max-w-[900px] mx-auto px-4 py-6">{children}</div>
      <Footer />
    </>
  )
}

function CoursPage() {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {lessons.map((lesson, i) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          index={i}
          onClick={() => navigate(`/cours/${lesson.id}`)}
        />
      ))}
    </div>
  )
}

function DicoPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'phrases' | 'panneaux'>('phrases')

  return (
    <>
      <DicoToggle active={tab} onChange={setTab} />
      {tab === 'phrases' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {scenarios.map((scenario, i) => (
            <CategoryCard
              key={scenario.id}
              scenario={scenario}
              index={i}
              onClick={() => navigate(`/dico/scenario/${scenario.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {signCategories.map((cat, i) => (
            <SignCategoryCard
              key={cat.id}
              category={cat}
              index={i}
              onClick={() => navigate(`/dico/panneaux/${cat.id}`)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <>
      <AeroBackground />
      <div className="relative z-10">
        <Routes>
          {/* Redirect root to cours */}
          <Route path="/" element={<Navigate to="/cours" replace />} />

          {/* Cours */}
          <Route path="/cours" element={<Shell><CoursPage /></Shell>} />
          <Route path="/cours/:id" element={<div className="max-w-lg mx-auto px-4 py-4"><LessonPlayer /></div>} />

          {/* Quiz */}
          <Route path="/quiz" element={<Shell><QuizModeSelect /></Shell>} />
          <Route path="/quiz/:mode" element={<div className="max-w-lg mx-auto px-4 py-4"><QuizSession /></div>} />

          {/* Dico */}
          <Route path="/dico" element={<Shell><DicoPage /></Shell>} />
          <Route path="/dico/scenario/:id" element={<div className="max-w-lg mx-auto px-4 py-4"><ScenarioDetail /></div>} />
          <Route path="/dico/panneaux/:id" element={<div className="max-w-lg mx-auto px-4 py-4"><SignDetail /></div>} />
        </Routes>
      </div>
    </>
  )
}
