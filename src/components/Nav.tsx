'use client'
/* The site's one bar: a single glass bar with the links sitting directly on it
   (no inner box, border or fill). Sign in goes to the
   portal; the one loud button is Book a demo. */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AMark, WordmarkText } from './Logo'
import { Arrow } from './icons'
import { PATHS, PORTAL_URL } from '@/lib/site'

type Entry = { href: string; label: string }

/* Platform and Theia are one page each, so each is one link: no menus. */
const LINKS: Entry[] = [
  { href: PATHS.platform, label: 'Platform' },
  { href: PATHS.theia, label: 'Theia' },
  { href: PATHS.pricing, label: 'Pricing' },
  { href: PATHS.website, label: 'Websites' },
  { href: PATHS.about, label: 'About' },
]

const isActive = (path: string | null, href: string) => !!path && (path === href || path.startsWith(`${href}/`))

export default function Nav() {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <header data-aa-section="nav" className="nav">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="wrap nav-inner">
        <Link href="/" className="nav-brand" aria-label="Axia Atlas home">
          <AMark className="brand-mark" />
          <WordmarkText className="brand-word" />
        </Link>
        <nav aria-label="Main" className="nav-main">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link" aria-current={isActive(path, l.href) ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <a href={PORTAL_URL} className="nav-signin">Sign in</a>
          <Link href={PATHS.demo} className="btn btn-ink">Book a demo</Link>
          <button type="button" className="nav-menu-btn" aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span />
          </button>
        </div>
      </div>
      <div id="nav-sheet" className={`nav-sheet${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {LINKS.map((l) => (
            <div key={l.href} className="sheet-group">
              <Link href={l.href} className="sheet-link" aria-current={isActive(path, l.href) ? 'page' : undefined} tabIndex={open ? 0 : -1}>
                {l.label}<Arrow width={14} height={14} />
              </Link>
            </div>
          ))}
          <div className="sheet-actions">
            <Link href={PATHS.demo} className="btn btn-ink" tabIndex={open ? 0 : -1}>Book a demo</Link>
            <a href={PORTAL_URL} className="btn btn-quiet" tabIndex={open ? 0 : -1}>Sign in</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
