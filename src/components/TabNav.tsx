import { useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, Lightning, Book } from '@phosphor-icons/react'

const TABS = [
  { id: 'cours', label: 'Cours', icon: GraduationCap, path: '/cours' },
  { id: 'quiz', label: 'Quiz', icon: Lightning, path: '/quiz' },
  { id: 'dico', label: 'Dico', icon: Book, path: '/dico' },
] as const

export default function TabNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = TABS.find((t) =>
    location.pathname === t.path || location.pathname.startsWith(t.path + '/')
  )?.id ?? 'cours'

  return (
    <nav className="tab-nav">
      {TABS.map((tab) => {
        const active = tab.id === currentTab
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`tab-btn ${active ? 'tab-btn--active' : ''}`}
          >
            <Icon size={16} weight={active ? 'bold' : 'regular'} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
