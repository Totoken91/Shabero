import { create } from 'zustand'
import { ui, type UIKey } from '../i18n/ui'

export type Lang = 'fr' | 'en'

interface LocaleState {
  lang: Lang
  setLang: (lang: Lang) => void
}

function detectLang(): Lang {
  const stored = localStorage.getItem('shabero-lang')
  if (stored === 'fr' || stored === 'en') return stored
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('fr') ? 'fr' : 'en'
}

export const useLocale = create<LocaleState>((set) => ({
  lang: detectLang(),
  setLang: (lang) => {
    localStorage.setItem('shabero-lang', lang)
    set({ lang })
  },
}))

/** Pick between fr/en data fields */
export function useT() {
  const lang = useLocale((s) => s.lang)
  return (fr: string, en?: string): string => {
    if (lang === 'en' && en) return en
    return fr
  }
}

/** Get a UI translation by key */
export function useUI() {
  const lang = useLocale((s) => s.lang)
  return (key: UIKey): string => ui[key][lang]
}
