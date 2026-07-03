import Link from 'next/link'
import { Wordmark } from './Logo'

const PORTAL_URL = 'https://app.axiaatlas.com'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark className="logo" />
            <p className="footer-tagline">Marketing that makes you impossible to miss — in search, answer engines, and in the feeds where your buyers decide.</p>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services#social">Social Media</Link></li>
              <li><Link href="/services#geo">Answer-Engine Optimization</Link></li>
              <li><Link href="/services#seo">SEO &amp; Content</Link></li>
              <li><Link href="/services#local">Local Presence</Link></li>
              <li><Link href="/services#executive">Founder Brand</Link></li>
              <li><Link href="/services#website">Website Design</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
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
          <span className="footer-copy">© {new Date().getFullYear()} Axia Atlas™. All rights reserved.</span>
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
