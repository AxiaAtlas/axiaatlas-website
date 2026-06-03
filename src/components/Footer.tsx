import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            {/* Bone wordmark lockup on the dark footer; sizing handled in .footer-brand img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark-bone.svg" alt="Axia Atlas" />
            <p className="footer-tagline">Growth, Engineered. Strategy-first digital marketing for businesses that want to compound.</p>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services#social">Social Media</Link></li>
              <li><Link href="/services#geo">GEO / AEO</Link></li>
              <li><Link href="/services#seo">SEO & Content</Link></li>
              <li><Link href="/services#local">Local Presence</Link></li>
              <li><Link href="/services#executive">Executive Brand</Link></li>
              <li><Link href="/services#website">Website Design</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get Started</div>
            <ul className="footer-links">
              <li><Link href="/contact">Book a Free Audit</Link></li>
              <li><a href="mailto:strategy@axiaatlas.com">strategy@axiaatlas.com</a></li>
              <li><span style={{ color: 'rgba(var(--alabaster-rgb),0.35)', fontSize: 11 }}>Based in Toronto, ON</span></li>
              <li><span style={{ color: 'rgba(var(--alabaster-rgb),0.35)', fontSize: 11 }}>Serving clients globally</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Axia Atlas. All rights reserved.</span>
          <span className="footer-copy">Growth, Engineered.</span>
        </div>
      </div>
    </footer>
  )
}
