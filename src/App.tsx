import { Routes, Route } from 'react-router-dom'
import Clouds from './components/layout/Clouds'
import Header from './components/layout/Header'
import ScenarioGrid from './components/scenarios/ScenarioGrid'
import ScenarioDetail from './components/scenarios/ScenarioDetail'

export default function App() {
  return (
    <>
      <div className="bg-sky" />
      <Clouds />
      <div className="max-w-lg mx-auto w-full px-4 pb-8">
        <Header />
        <main className="mt-4">
          <Routes>
            <Route path="/" element={<ScenarioGrid />} />
            <Route path="/scenario/:id" element={<ScenarioDetail />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
