import Link from 'next/link'

const PORTAL_URL = 'https://app.axiaatlas.com'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            {/* Bone wordmark lockup on the dark footer; sizing handled in .footer-brand img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark-bone.svg" alt="Axia Atlas" />
            <p className="footer-tagline">Marketing that makes you impossible to miss — in search, in AI answers, and in the feeds where your buyers decide.</p>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services#social">Social Media</Link></li>
              <li><Link href="/services#geo">AI Search (GEO/AEO)</Link></li>
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
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get Started</div>
            <ul className="footer-links">
              <li><Link href="/contact">Book a Free Audit</Link></li>
              <li><a href={PORTAL_URL}>Client Login</a></li>
              <li><a href="mailto:strategy@axiaatlas.com">strategy@axiaatlas.com</a></li>
              <li><span className="footer-muted">Toronto, ON — serving clients globally</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Axia Atlas. All rights reserved.</span>
          <a href={PORTAL_URL} className="footer-copy footer-portal-link">Client Login →</a>
        </div>
      </div>
    </footer>
  )
}
