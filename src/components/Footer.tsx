import Link from 'next/link'
import { AMark, WordmarkText } from './Logo'
import { PATHS, PORTAL_URL, PRODUCTS, TAGLINE_2 } from '@/lib/site'

export default function Footer() {
  return (
    <footer data-aa-section="footer" className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" aria-label="Axia Atlas home">
              <AMark className="brand-mark" />
              <WordmarkText className="brand-word" />
            </Link>
            <p className="footer-tag">{TAGLINE_2}.</p>
            <p className="footer-desc">Investment campaign analytics for companies raising capital and the agencies behind them, with Theia, our proprietary AI-powered analysis assistant, built in.</p>
          </div>
          <div>
            <div className="footer-title">Product</div>
            <ul className="footer-links">
              <li><Link href={`${PATHS.platform}#live-campaigns`}>{PRODUCTS.live}</Link></li>
              <li><Link href={`${PATHS.platform}#raise-ledger`}>{PRODUCTS.ledger}</Link></li>
              <li><Link href={`${PATHS.theia}#ask`}>{PRODUCTS.ask}</Link></li>
              <li><Link href={`${PATHS.theia}#reports`}>{PRODUCTS.reports}</Link></li>
              <li><Link href={PATHS.pricing}>Pricing</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Company</div>
            <ul className="footer-links">
              <li><Link href={PATHS.about}>About</Link></li>
              <li><Link href={PATHS.website}>Websites</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href={PATHS.contact}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Get started</div>
            <ul className="footer-links">
              <li><Link href={PATHS.demo}>Book a demo</Link></li>
              <li><a href={PORTAL_URL}>Sign in</a></li>
              <li><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Axia Atlas Inc. Theia is a proprietary product of Axia Atlas Inc.</span>
          <nav aria-label="Legal and sign in" className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={PORTAL_URL}>Sign in</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
