import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import BottomNav from './components/BottomNav'

// Situations
import CategoryCard from './components/CategoryCard'
import SituationDetail from './components/situations/SituationDetail'
import { scenarios } from './data/scenarios'

// Entraînement (quiz)
import QuizModeSelect from './components/quiz/QuizModeSelect'
import QuizSession from './components/quiz/QuizSession'

// Dico
import SignCategoryCard from './components/signs/SignCategoryCard'
import SignDetail from './components/signs/SignDetail'
import DicoToggle from './components/dico/DicoToggle'
import { signCategories } from './data/signs'

function Shell({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  return (
    <>
      {showHeader && <ShineLogo />}
      <div className="max-w-[900px] mx-auto px-4 py-4 pb-nav">{children}</div>
      <BottomNav />
    </>
  )
}

function SituationsPage() {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {scenarios.map((scenario, i) => (
        <CategoryCard
          key={scenario.id}
          scenario={scenario}
          index={i}
          onClick={() => navigate(`/situations/${scenario.id}`)}
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
          {scenarios.map((s, i) => (
            <CategoryCard
              key={s.id}
              scenario={s}
              index={i}
              onClick={() => navigate(`/dico/scenario/${s.id}`)}
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

function KanaPlaceholder() {
  return (
    <div className="phrase-card p-6 text-center">
      <p className="relative z-10 font-jp text-[32px] font-bold text-[var(--text)]">あ ア</p>
      <p className="relative z-10 text-[16px] font-bold text-[var(--text)] mt-2">Kana — Bientôt disponible</p>
      <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-1">
        Apprends les hiragana et katakana pour lire le japonais
      </p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <AeroBackground />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/situations" replace />} />

          {/* Situations */}
          <Route path="/situations" element={<Shell><SituationsPage /></Shell>} />
          <Route
            path="/situations/:id"
            element={
              <>
                <div className="max-w-lg mx-auto px-4 py-4 pb-nav">
                  <SituationDetail />
                </div>
                <BottomNav />
              </>
            }
          />

          {/* Entraînement */}
          <Route path="/entrainement" element={<Shell><QuizModeSelect /></Shell>} />
          <Route
            path="/entrainement/:mode"
            element={
              <>
                <div className="max-w-lg mx-auto px-4 py-4 pb-nav">
                  <QuizSession />
                </div>
                <BottomNav />
              </>
            }
          />

          {/* Kana */}
          <Route path="/kana" element={<Shell><KanaPlaceholder /></Shell>} />

          {/* Dico */}
          <Route path="/dico" element={<Shell><DicoPage /></Shell>} />
          <Route
            path="/dico/scenario/:id"
            element={
              <>
                <div className="max-w-lg mx-auto px-4 py-4 pb-nav">
                  <SituationDetail />
                </div>
                <BottomNav />
              </>
            }
          />
          <Route
            path="/dico/panneaux/:id"
            element={
              <>
                <div className="max-w-lg mx-auto px-4 py-4 pb-nav">
                  <SignDetail />
                </div>
                <BottomNav />
              </>
            }
          />
        </Routes>
      </div>
    </>
  )
}
