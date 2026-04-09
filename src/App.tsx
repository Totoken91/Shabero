import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AeroBackground from './components/AeroBackground'
import ShineLogo from './components/ShineLogo'
import BottomNav from './components/BottomNav'

// Situations
import CategoryCard from './components/CategoryCard'
import SituationDetail from './components/situations/SituationDetail'
import { scenarios } from './data/scenarios'

// Entraînement
import QuizCategorySelect from './components/quiz/QuizCategorySelect'
import QuizModeSelect from './components/quiz/QuizModeSelect'
import ListenMode from './components/quiz/ListenMode'
import SpeakMode from './components/quiz/SpeakMode'
import RepeatMode from './components/quiz/RepeatMode'

// Kana
import KanaHome from './components/kana/KanaHome'
import KanaGroupList from './components/kana/KanaGroupList'
import KanaDiscovery from './components/kana/KanaDiscovery'
import KanaExercise from './components/kana/KanaExercise'
import { KanjiCategoryList, KanjiDetail } from './components/kana/KanjiSection'

// Dico
import SignCategoryCard from './components/signs/SignCategoryCard'
import SignDetail from './components/signs/SignDetail'
import DicoToggle from './components/dico/DicoToggle'
import { signCategories } from './data/signs'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShineLogo />
      <div className="max-w-[900px] mx-auto px-4 py-4 pb-nav">{children}</div>
      <BottomNav />
    </>
  )
}

function DetailShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-lg mx-auto px-4 py-4 pb-nav">{children}</div>
      <BottomNav />
    </>
  )
}

function SituationsPage() {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {scenarios.map((s, i) => (
        <CategoryCard key={s.id} scenario={s} index={i} onClick={() => navigate(`/situations/${s.id}`)} />
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
            <CategoryCard key={s.id} scenario={s} index={i} onClick={() => navigate(`/dico/scenario/${s.id}`)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {signCategories.map((c, i) => (
            <SignCategoryCard key={c.id} category={c} index={i} onClick={() => navigate(`/dico/panneaux/${c.id}`)} />
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
          <Route path="/" element={<Navigate to="/situations" replace />} />

          {/* Situations */}
          <Route path="/situations" element={<Shell><SituationsPage /></Shell>} />
          <Route path="/situations/:id" element={<DetailShell><SituationDetail /></DetailShell>} />

          {/* Entraînement */}
          <Route path="/entrainement" element={<Shell><QuizCategorySelect /></Shell>} />
          <Route path="/entrainement/:scenarioId" element={<DetailShell><QuizModeSelect /></DetailShell>} />
          <Route path="/entrainement/:scenarioId/listen" element={<DetailShell><ListenMode /></DetailShell>} />
          <Route path="/entrainement/:scenarioId/speak" element={<DetailShell><SpeakMode /></DetailShell>} />
          <Route path="/entrainement/:scenarioId/repeat" element={<DetailShell><RepeatMode /></DetailShell>} />

          {/* Kana */}
          <Route path="/kana" element={<Shell><KanaHome /></Shell>} />
          <Route path="/kana/:type" element={<DetailShell><KanaGroupList /></DetailShell>} />
          <Route path="/kana/:type/:groupId" element={<DetailShell><KanaDiscovery /></DetailShell>} />
          <Route path="/kana/:type/:groupId/exercise" element={<DetailShell><KanaExercise /></DetailShell>} />
          <Route path="/kana/kanji" element={<DetailShell><KanjiCategoryList /></DetailShell>} />
          <Route path="/kana/kanji/:categoryId" element={<DetailShell><KanjiDetail /></DetailShell>} />

          {/* Dico */}
          <Route path="/dico" element={<Shell><DicoPage /></Shell>} />
          <Route path="/dico/scenario/:id" element={<DetailShell><SituationDetail /></DetailShell>} />
          <Route path="/dico/panneaux/:id" element={<DetailShell><SignDetail /></DetailShell>} />
        </Routes>
      </div>
    </>
  )
}
