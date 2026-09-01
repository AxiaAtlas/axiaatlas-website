'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AMark, WordmarkText } from './Logo'

const PORTAL_URL = 'https://app.axiaatlas.com'

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  return (
    <nav className="nav">
      {/* Side-by-side lockup composed the same way the portal composes it
          (AMark + WordmarkText, same path data, same 28/18 sizes) so the mark
          and the letters are each sized on their own ink. The single combined
          <Wordmark> used to be sized here at 24px total, which scaled the
          letterforms down to roughly half the portal's. */}
      <Link href="/" className="nav-brand brand-lockup" onClick={close} aria-label="Axia Atlas — home">
        <AMark className="brand-mark" />
        <WordmarkText className="brand-word" />
      </Link>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={close}
              className={pathname === l.href ? 'active' : undefined}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li className="nav-actions">
          <a href={PORTAL_URL} className="nav-login" onClick={close}>Client Portal</a>
          <Link href="/demo" className="nav-cta" onClick={close}>Book a Demo</Link>
        </li>
      </ul>

      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
