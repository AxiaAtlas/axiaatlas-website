'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-sidebar.png" alt="Axia Atlas" />
        <span className="nav-wordmark">Axia Atlas</span>
      </Link>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><Link href="/services" onClick={() => setOpen(false)}>Services</Link></li>
        <li><Link href="/case-studies" onClick={() => setOpen(false)}>Case Studies</Link></li>
        <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
        <li><Link href="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
        <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        <li><Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Book a Free Audit</Link></li>
      </ul>

      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
