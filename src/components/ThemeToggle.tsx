'use client'

/* Light / dark switch. With no choice saved, the site follows the OS
   (color-scheme: light dark on :root). A click pins the opposite of what is
   showing now, on <html data-theme>, and saves it; THEME_INIT in
   app/layout.tsx re-applies it before first paint on the next page load. */
export const THEME_KEY = 'aa-theme'

function current(): 'light' | 'dark' {
  const pinned = document.documentElement.getAttribute('data-theme')
  if (pinned === 'light' || pinned === 'dark') return pinned
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const toggle = () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem(THEME_KEY, next) } catch { /* private mode: this page only */ }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch between light and dark">
      <svg className="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
      <svg className="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
    </button>
  )
}
