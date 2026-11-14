'use client'
/* The site's one bar: a single glass bar with the links sitting directly on it
   (no inner box, border or fill). Platform and Theia open a small menu naming
   their modules, so the header says what the product is. Sign in goes to the
   portal; the one loud button is Book a demo. */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AMark, WordmarkText } from './Logo'
import { Arrow } from './icons'
import { PATHS, PORTAL_URL, PRODUCTS } from '@/lib/site'

type Item = { href: string; label: string; desc: string }
type Entry = { href: string; label: string; menu?: Item[] }

const LINKS: Entry[] = [
  {
    href: PATHS.platform, label: 'Platform', menu: [
      { href: `${PATHS.platform}#live-campaigns`, label: PRODUCTS.live, desc: 'Every ad platform and campaign, live, in one view.' },
      { href: `${PATHS.platform}#raise-ledger`, label: PRODUCTS.ledger, desc: 'Every dollar behind the raise against the investors it brought.' },
    ],
  },
  {
    href: PATHS.theia, label: 'Theia', menu: [
      { href: `${PATHS.theia}#ask`, label: PRODUCTS.ask, desc: 'Why a number moved, with the evidence, in seconds.' },
      { href: `${PATHS.theia}#reports`, label: PRODUCTS.reports, desc: 'Weekly and monthly investor reports that build themselves.' },
    ],
  },
  { href: PATHS.security, label: 'Security' },
  { href: PATHS.pricing, label: 'Pricing' },
  { href: PATHS.website, label: 'Websites' },
  { href: PATHS.about, label: 'About' },
]

const isActive = (path: string | null, href: string) => !!path && (path === href || path.startsWith(`${href}/`))

function Menu({ entry, path }: { entry: Entry; path: string | null }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number>(0)
  const root = useRef<HTMLLIElement>(null)
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); root.current?.querySelector<HTMLButtonElement>('button')?.focus() } }
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown) }
  }, [open])
  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { timer.current = window.setTimeout(() => setOpen(false), 160) }
  const id = `menu-${entry.label.toLowerCase()}`

  return (
    <li ref={root} className="nav-item" onPointerEnter={(e) => e.pointerType === 'mouse' && enter()} onPointerLeave={(e) => e.pointerType === 'mouse' && leave()}>
      <button
        type="button"
        className="nav-link nav-trigger"
        aria-expanded={open}
        aria-controls={id}
        aria-current={isActive(path, entry.href) ? 'page' : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {entry.label}
        <svg className="nav-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
      </button>
      <div id={id} className={`nav-menu${open ? ' open' : ''}`}>
        <ul>
          {entry.menu!.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="nav-menu-link" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span className="nav-menu-title">{m.label}</span>
                <span className="nav-menu-desc">{m.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={entry.href} className="nav-menu-all" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          {entry.label === 'Theia' ? 'Meet Theia' : 'Platform overview'} <Arrow width={13} height={13} />
        </Link>
      </div>
    </li>
  )
}

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
            {LINKS.map((l) => l.menu
              ? <Menu key={l.href} entry={l} path={path} />
              : (
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
              {l.menu && (
                <div className="sheet-sub">
                  {l.menu.map((m) => <Link key={m.href} href={m.href} tabIndex={open ? 0 : -1}>{m.label}</Link>)}
                </div>
              )}
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
