'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wordmark } from './Logo'
import ThemeToggle from './ThemeToggle'

const PORTAL_URL = 'https://app.axiaatlas.com'

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" onClick={close} aria-label="Axia Atlas — home">
        <Wordmark className="logo" />
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
          <ThemeToggle />
          <a href={PORTAL_URL} className="nav-login" onClick={close}>Client Login</a>
          <Link href="/contact" className="nav-cta" onClick={close}>Book a Free Audit</Link>
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
