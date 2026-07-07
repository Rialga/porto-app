import { useEffect } from 'react'
import { create } from 'zustand'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggle: () => void
  set: (theme: Theme) => void
}

const STORAGE_KEY = 'theme'

const readInitial = (): Theme => {
  if (typeof document === 'undefined') return 'dark'
  // The pre-paint script in index.html has already set the right class —
  // we mirror it here to keep the store in sync without flicker.
  const fromClass = document.documentElement.classList.contains('light') ? 'light' : null
  if (fromClass) return fromClass
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* localStorage unavailable */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: readInitial(),
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },
  set: (theme: Theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Mounts once at the app root. Applies the initial class and syncs if
 * the OS preference changes while the app is open.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useThemeStore(s => s.theme)

  // Keep DOM in sync (handles external `set()` calls).
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // React to OS preference changes only if the user hasn't set one explicitly.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* ignore */
      }
      useThemeStore.getState().set(e.matches ? 'dark' : 'light')
    }
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    mq.addListener(onChange)
    return () => mq.removeListener(onChange)
  }, [])

  return <>{children}</>
}