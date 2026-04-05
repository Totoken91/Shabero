import { Routes, Route } from 'react-router-dom'
import Clouds from './components/layout/Clouds'
import Header from './components/layout/Header'
import XPBar from './components/layout/XPBar'
import TabBar from './components/layout/TabBar'
import ScenarioGrid from './components/scenarios/ScenarioGrid'
import ScenarioDetail from './components/scenarios/ScenarioDetail'
import FlashcardDeck from './components/flashcards/FlashcardDeck'
import QuizPage from './components/quiz/QuizPage'
import SceneList from './components/rpg/SceneList'
import ScenePlayer from './components/rpg/ScenePlayer'

export default function App() {
  return (
    <>
      <div className="bg-sky" />
      <Clouds />
      <div className="pb-tab max-w-lg mx-auto w-full px-4">
        <Header />
        <XPBar />
        <main className="mt-4">
          <Routes>
            <Route path="/" element={<ScenarioGrid />} />
            <Route path="/scenario/:id" element={<ScenarioDetail />} />
            <Route path="/flashcards" element={<FlashcardDeck />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/rpg" element={<SceneList />} />
            <Route path="/rpg/:id" element={<ScenePlayer />} />
          </Routes>
        </main>
      </div>
      <TabBar />
    </>
  )
}
