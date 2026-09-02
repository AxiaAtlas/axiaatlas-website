import Link from 'next/link'
import { AMark, WordmarkText } from './Logo'

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
            <ul className="footer-links">
              <li><Link href="/services#website">Website Design &amp; Build</Link></li>
              <li><Link href="/services#social">Social Media Management</Link></li>
              <li><Link href="/services#intel">Competitive Intelligence</Link></li>
              <li><Link href="/services#local">Local Presence &amp; SEO</Link></li>
              <li><Link href="/services#geo">Answer Engine Optimization</Link></li>
              <li><Link href="/services#leadgen">Lead Generation</Link></li>
              <li><Link href="/services#executive">Executive Personal Brand</Link></li>
              <li><Link href="/services#strategy">Strategic Advisory</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
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
