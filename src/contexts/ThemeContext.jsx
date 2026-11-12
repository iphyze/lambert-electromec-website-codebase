'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'lambert-theme'

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setTheme(getPreferredTheme())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return undefined

    const root = document.documentElement
    const shouldAnimateTheme = root.dataset.theme && root.dataset.theme !== theme

    if (shouldAnimateTheme) {
      root.classList.add('theme-transitioning')
    }

    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)

    if (!shouldAnimateTheme) return undefined

    const timeout = window.setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 680)

    return () => window.clearTimeout(timeout)
  }, [theme, isHydrated])

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
