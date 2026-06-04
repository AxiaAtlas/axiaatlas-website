import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { AMark } from '@/components/Logo'
import {
  Home, Compass, Mail, Arrow,
  LinkedIn, Instagram, Facebook, XLogo, YouTube,
} from '@/components/icons'

export const metadata: Metadata = {
  title: 'Links — Find Axia Atlas everywhere',
  description:
    'One place for everything Axia Atlas — our website, a free audit, and every social channel. Strategy-led marketing that makes brands, local businesses, and founders impossible to miss.',
  alternates: { canonical: '/links' },
}

type Item = {
  label: string
  href: string
  Icon: (p: { className?: string }) => JSX.Element
  external?: boolean
  featured?: boolean
}

const ITEMS: Item[] = [
  { label: 'Visit our website', href: '/', Icon: Home },
  { label: 'Book a free audit', href: '/demo', Icon: Compass, featured: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/axia-atlas', Icon: LinkedIn, external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/axiaatlas/', Icon: Instagram, external: true },
  { label: 'Facebook', href: 'https://www.facebook.com/AxiaAtlas', Icon: Facebook, external: true },
  { label: 'X (Twitter)', href: 'https://x.com/AxiaAtlas', Icon: XLogo, external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@AxiaAtlas', Icon: YouTube, external: true },
  { label: 'Get in touch', href: '/contact', Icon: Mail },
]

export default function LinksPage() {
  return (
    <div className="page links-page">
      <main className="links-main">
        <div className="links-col">
          <AMark className="links-mark" />
          <h1 className="links-tagline">To be found is to be chosen.</h1>
          <p className="links-desc">
            Strategy-led marketing that makes brands, local businesses, and founders
            impossible to miss — in search, in answer engines, and in the feeds where buyers decide.
          </p>

          <nav className="links-stack" aria-label="Axia Atlas links">
            {ITEMS.map(({ label, href, Icon, external, featured }) => {
              const inner = (
                <>
                  <span className="lb-ico"><Icon /></span>
                  <span className="lb-label">{label}</span>
                  <Arrow className="lb-chev" />
                </>
              )
              const className = `lb-link${featured ? ' featured' : ''}`
              return external ? (
                <a
                  key={label}
                  className={className}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={label} className={className} href={href}>
                  {inner}
                </Link>
              )
            })}
          </nav>

          <p className="links-footnote">
            Prefer email? <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
