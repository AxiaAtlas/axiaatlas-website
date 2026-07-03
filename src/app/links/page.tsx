import type { Metadata } from 'next'
import Link from 'next/link'
import { AMark } from '@/components/Logo'
import {
  Home, Compass, Mail, Arrow,
  LinkedIn, Instagram, Facebook, XLogo, YouTube,
} from '@/components/icons'

export const metadata: Metadata = {
  title: 'Links',
  description:
    'One place for everything Axia Atlas — visit our website, book a demo, and follow along on LinkedIn, Instagram, Facebook, X, and YouTube.',
  alternates: { canonical: '/links' },
}

type Variant = 'feature' | 'featured' | 'social'
type Tile = {
  key: string
  label: string
  sub: string
  href: string
  Icon: (p: { className?: string }) => JSX.Element
  variant: Variant
  external?: boolean
  pill?: string
}

const TILES: Tile[] = [
  { key: 'website', label: 'Website', sub: 'axiaatlas.com', href: '/', Icon: Home, variant: 'feature' },
  { key: 'demo', label: 'Book a Demo', sub: 'We audit how you show up first, then bring solutions.', href: '/demo', Icon: Compass, variant: 'featured', pill: 'Demo' },
  { key: 'linkedin', label: 'LinkedIn', sub: 'Axia Atlas', href: 'https://www.linkedin.com/company/axia-atlas', Icon: LinkedIn, variant: 'social', external: true },
  { key: 'instagram', label: 'Instagram', sub: '@axiaatlas', href: 'https://www.instagram.com/axiaatlas/', Icon: Instagram, variant: 'social', external: true },
  { key: 'facebook', label: 'Facebook', sub: '@AxiaAtlas', href: 'https://www.facebook.com/AxiaAtlas', Icon: Facebook, variant: 'social', external: true },
  { key: 'x', label: 'X', sub: '@AxiaAtlas', href: 'https://x.com/AxiaAtlas', Icon: XLogo, variant: 'social', external: true },
  { key: 'youtube', label: 'YouTube', sub: '@AxiaAtlas', href: 'https://www.youtube.com/@AxiaAtlas', Icon: YouTube, variant: 'social', external: true },
  { key: 'contact', label: 'Contact', sub: 'Get in touch', href: '/contact', Icon: Mail, variant: 'social' },
]

export default function LinksPage() {
  return (
    <main className="lt-page">
      <div className="lt-bg" aria-hidden="true">
        <span className="lt-blob a" />
        <span className="lt-blob b" />
      </div>

      <div className="lt-col">
        <header className="lt-hero">
          <span className="lt-mark-wrap">
            <AMark className="lt-mark" />
          </span>
          <span className="lt-eyebrow">Axia Atlas™</span>
          <h1 className="lt-tagline">To be found is to be seen.</h1>
          <p className="lt-desc">
            Strategy-led marketing that makes brands, local businesses, and founders
            impossible to miss — in search, in answer engines, and in the feeds where buyers decide.
          </p>
        </header>

        <nav className="lt-grid" aria-label="Axia Atlas links">
          {TILES.map((t, i) => {
            const Icon = t.Icon
            const className =
              `lt-tile lt-tile--${t.variant}` + (t.variant === 'social' ? '' : ' lt-span2')
            const style = { animationDelay: `${0.28 + i * 0.06}s` }
            const inner = (
              <>
                <div className="lt-tile-top">
                  <span className="lt-tile-ico"><Icon /></span>
                  <Arrow className="lt-tile-arrow" />
                </div>
                <div className="lt-tile-text">
                  {t.pill && <span className="lt-pill">{t.pill}</span>}
                  <span className="lt-tile-label">{t.label}</span>
                  <span className="lt-tile-sub">{t.sub}</span>
                </div>
                {t.variant === 'social' && (
                  <span className="lt-tile-wm" aria-hidden="true"><Icon /></span>
                )}
              </>
            )

            return t.external ? (
              <a
                key={t.key}
                className={className}
                style={style}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.label}
              >
                {inner}
              </a>
            ) : (
              <Link key={t.key} className={className} style={style} href={t.href} aria-label={t.label}>
                {inner}
              </Link>
            )
          })}
        </nav>

        <p className="lt-foot">
          Prefer email? <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>
        </p>
      </div>
    </main>
  )
}
