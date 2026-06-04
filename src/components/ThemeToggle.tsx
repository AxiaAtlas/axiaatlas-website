'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from './icons'

/* Reads the theme set by the no-FOUC inline script, lets the user flip it,
   and persists the choice. The <html data-theme> attribute is the source of truth. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('aa-theme', next) } catch {}
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title="Toggle theme"
      type="button"
    >
      <Sun className="sun" />
      <Moon className="moon" />
    </button>
  )
}
