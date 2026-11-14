'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AMark, WordmarkText } from './Logo'
import { PATHS, PORTAL_URL } from '@/lib/site'

/* The product first (the platform, then Theia), then the one-off service,
   then trust, price and the company. */
const LINKS = [
  { href: PATHS.platform, label: 'Platform' },
  { href: PATHS.theia, label: 'Theia' },
  { href: PATHS.website, label: 'Website Design' },
  { href: PATHS.security, label: 'Security' },
  { href: PATHS.pricing, label: 'Pricing' },
  { href: PATHS.about, label: 'About' },
  { href: PATHS.contact, label: 'Contact' },
]

const isActive = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(`${href}/`))

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  return (
    <nav data-aa-section="nav" className="nav">
      {/* Side-by-side lockup composed the way the portal composes it (AMark +
          WordmarkText, same path data, same 28/18 sizes). */}
      <Link href="/" className="nav-brand brand-lockup" onClick={close} aria-label="Axia Atlas home">
        <AMark className="brand-mark" />
        <WordmarkText className="brand-word" />
      </Link>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={close}
              className={isActive(pathname, l.href) ? 'active' : undefined}
              aria-current={isActive(pathname, l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li className="nav-actions">
          <a href={PORTAL_URL} className="nav-login" onClick={close}>Sign In</a>
          <Link href={PATHS.demo} className="nav-cta" onClick={close}>Book a Demo</Link>
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
