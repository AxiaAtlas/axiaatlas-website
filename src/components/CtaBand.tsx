import Link from 'next/link'
import { Arrow, Pin } from '@/components/icons'

type Props = {
  eyebrow?: string
  headline: string
  sub: string
  cta?: string
  /** The thing the offer produces, shown beside it. */
  artifact?: React.ReactNode
}

/* The one Deep Spruce band on each page — the site's single emphasis panel,
   deliberately distinct from the near-black footer beneath it.

   ASYMMETRIC WHEN IT HAS SOMETHING TO SHOW. Centred copy above a button was
   the same shape as the footer directly under it, which is why the two kept
   reading as one block. With an artifact passed, the offer sits left and what
   the offer actually produces sits right; without one it stays centred, so a
   page that has nothing honest to show is not forced to invent something. */
export default function CtaBand({ eyebrow = 'Book a Demo', headline, sub, cta = 'Book a Demo', artifact }: Props) {
  return (
    <section className={`cta-band${artifact ? ' has-artifact' : ''}`}>
      {/* Clip window for the drifting grid; the grid itself is this element's
          ::before, so the drift is a composited transform. */}
      <div className="cta-band-grid" aria-hidden="true" />
      <div className="cta-band-inner">
        <div className="cta-band-copy">
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
        {artifact && <div className="cta-band-artifact">{artifact}</div>}
      </div>
    </section>
  )
}
