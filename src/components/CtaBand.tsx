import Link from 'next/link'
import { Arrow, Pin } from '@/components/icons'

type Props = {
  eyebrow?: string
  headline: string
  sub: string
  cta?: string
}

/* Sage accent band — the one light-green section on every page. Deliberately
   distinct from the dark footer: pulsing beacon, drifting grid, emphasized CTA. */
export default function CtaBand({ eyebrow = 'Book a Demo', headline, sub, cta = 'Book a Demo' }: Props) {
  return (
    <section className="cta-band">
      {/* Clip window for the drifting grid; the grid itself is this element's
          ::before, so the drift is a composited transform. */}
      <div className="cta-band-grid" aria-hidden="true" />
      <div className="cta-band-inner">
        <div className="cta-band-beacon" aria-hidden="true">
          <span className="ring r1" />
          <span className="ring r2" />
          <Pin />
        </div>
        <div className="section-eyebrow">{eyebrow}</div>
        <h2 className="section-headline">{headline}</h2>
        <p className="section-sub">{sub}</p>
        <Link href="/demo" className="btn-primary cta-band-btn">{cta} <Arrow className="arr" /></Link>
        <div className="cta-band-note">Free visibility audit before the call · No pitch deck · No pressure</div>
      </div>
    </section>
  )
}
