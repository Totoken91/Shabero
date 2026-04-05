import { useLocation, Link } from 'react-router-dom'

const tabs = [
  { icon: '🗾', label: 'Scénarios', path: '/' },
  { icon: '🃏', label: 'Flashcards', path: '/flashcards' },
  { icon: '⚡', label: 'Quiz', path: '/quiz' },
  { icon: '🎮', label: 'RPG', path: '/rpg' },
] as const

export default function TabBar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 glass flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
      {tabs.map((tab) => {
        const isActive =
          tab.path === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.path)

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] rounded-xl px-3 py-1 transition-colors ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
