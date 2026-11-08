import Link from 'next/link'
import { AMark, WordmarkText } from './Logo'
import { ADDON_GROUPS, ADDONS_PATH, HEADLINE_PAGES, PORTAL_PATH, THEIA_PATH, serviceShort } from '@/lib/services'
import { THEIA_LAUNCH } from '@/lib/flags'

const PORTAL_URL = 'https://app.axiaatlas.com'

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
            <p className="footer-tagline">Websites and social media that make you impossible to miss. Headquartered in Miami, working with clients across the US.</p>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            {/* Headline services, then the add-on groups. Names and addresses
                come from lib/services. */}
            <ul className="footer-links">
              {THEIA_LAUNCH && <li><Link href={PORTAL_PATH}>Client Portal</Link></li>}
              <li><Link href={HEADLINE_PAGES.website}>{serviceShort('website')}</Link></li>
              <li><Link href={HEADLINE_PAGES.social}>{serviceShort('social')}</Link></li>
              {THEIA_LAUNCH && <li><Link href={THEIA_PATH}>Theia by Axia Atlas</Link></li>}
            </ul>
            <div className="footer-col-title footer-col-sub">Add-ons</div>
            <ul className="footer-links">
              {ADDON_GROUPS.map((g) => (
                <li key={g.id}><Link href={`${ADDONS_PATH}#${g.id}`}>{g.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/careers">Careers</Link></li>
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
