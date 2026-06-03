'use client'
import { useState } from 'react'
import Link from 'next/link'

const PORTAL_URL = 'https://app.axiaatlas.com'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" onClick={close}>
        {/* Bone wordmark lockup (includes the a-mark) on the dark nav. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-wordmark-bone.svg" alt="Axia Atlas" />
      </Link>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><Link href="/services" onClick={close}>Services</Link></li>
        <li><Link href="/pricing" onClick={close}>Pricing</Link></li>
        <li><Link href="/case-studies" onClick={close}>Case Studies</Link></li>
        <li><Link href="/about" onClick={close}>About</Link></li>
        <li><Link href="/blog" onClick={close}>Blog</Link></li>
        <li><Link href="/contact" onClick={close}>Contact</Link></li>
        <li className="nav-actions">
          <a href={PORTAL_URL} className="nav-login" onClick={close}>Client Login</a>
          <Link href="/contact" className="nav-cta" onClick={close}>Book a Free Audit</Link>
        </li>
      </ul>

      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
