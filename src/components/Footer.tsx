import Link from 'next/link'
import { AMark, WordmarkText } from './Logo'
import { PATHS, PORTAL_URL, PRODUCTS, TAGLINE, TAGLINE_2 } from '@/lib/site'

export default function Footer() {
  return (
    <footer data-aa-section="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-lockup footer-lockup">
              <AMark className="brand-mark" />
              <WordmarkText className="brand-word" />
            </div>
            <p className="footer-tagline">{TAGLINE}. {TAGLINE_2}. Investment campaign analytics for companies raising capital and the agencies behind them.</p>
          </div>

          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li><Link href={`${PATHS.platform}#live-campaigns`}>{PRODUCTS.live}</Link></li>
              <li><Link href={`${PATHS.platform}#raise-ledger`}>{PRODUCTS.ledger}</Link></li>
              <li><Link href={`${PATHS.theia}#reports`}>{PRODUCTS.reports}</Link></li>
              <li><Link href={`${PATHS.theia}#ask`}>{PRODUCTS.ask}</Link></li>
              <li><Link href={PATHS.security}>Security</Link></li>
              <li><Link href={PATHS.pricing}>Pricing</Link></li>
            </ul>
            <div className="footer-col-title footer-col-sub">Projects</div>
            <ul className="footer-links">
              <li><Link href={PATHS.website}>Website Design</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href={PATHS.about}>About</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href={PATHS.contact}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get Started</div>
            <ul className="footer-links">
              <li><Link href={PATHS.demo}>Book a Demo</Link></li>
              <li><a href={PORTAL_URL}>Sign In</a></li>
              <li><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Axia Atlas Inc. All rights reserved. Theia™ is a proprietary product of Axia Atlas Inc.</span>
          <nav className="footer-legal">
            <Link href="/privacy" className="footer-copy">Privacy</Link>
            <Link href="/terms" className="footer-copy">Terms</Link>
            <a href={PORTAL_URL} className="footer-copy footer-portal-link">Sign In →</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
