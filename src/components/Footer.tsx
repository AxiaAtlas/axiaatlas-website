import Link from 'next/link'
import { AMark, WordmarkText } from './Logo'
import { SERVICES } from '@/lib/services'

const PORTAL_URL = 'https://app.axiaatlas.com'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-lockup footer-lockup">
              <AMark className="brand-mark" />
              <WordmarkText className="brand-word" />
            </div>
            <p className="footer-tagline">Marketing that makes you impossible to miss — in search, answer engines, and in the feeds where your buyers decide.</p>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            {/* DERIVED, AND BOTH HALVES OF EVERY ROW ARE.
                The nine names and the nine hrefs were typed here, and a typed
                copy of a name is a copy that stops matching the catalogue
                silently. It already had, twice: this column printed "Strategic
                Advisory" against a catalogue reading "Strategic Advisory &
                Embedded Thinking", and "SEO & Answer Engine Optimization"
                against one reading "SEO & Answer Engine Optimization (AEO)".
                Neither was a decision — both were hand-shortenings left behind
                by a rename, and nothing could catch them because nothing else
                read this list.

                `short` is the fix rather than `name`, because the full names
                are what forced the hand-shortening in the first place. It is
                the site's OWN short name now, not the platform's: this column
                printed "Comp Intel" and "Advisory" for one deploy, which is
                CSM-board shorthand — right on a logged-in screen, jargon to the
                stranger this footer is for. lib/services carries both, and only
                the authored one has an accessor. The nine were measured against
                this column's real width; the note there has the table.

                The ORDER is the catalogue's too (price, highest first), which
                is why Portals & Dashboards now leads this column where Website
                Design & Build used to: one order in the repo, the same one
                /services renders and both #catalog nodes emit. */}
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get Started</div>
            <ul className="footer-links">
              <li><Link href="/demo">Book a Demo</Link></li>
              <li><a href={PORTAL_URL}>Client Portal</a></li>
              <li><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Axia Atlas Inc. All rights reserved.</span>
          <nav className="footer-legal">
            <Link href="/privacy" className="footer-copy">Privacy</Link>
            <Link href="/terms" className="footer-copy">Terms</Link>
            <a href={PORTAL_URL} className="footer-copy footer-portal-link">Client Portal →</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
