import type { Metadata } from 'next'
import Link from 'next/link'
import { Wordmark } from '@/components/Logo'
import { Arrow } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you’re looking for doesn’t exist or has moved.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="nf-page">
      <div className="lt-bg" aria-hidden="true">
        <span className="lt-blob a" />
        <span className="lt-blob b" />
      </div>

      <div className="nf-inner">
        <Wordmark className="nf-mark" />
        <div className="nf-code">404</div>
        <span className="nf-eyebrow">Off the map</span>
        <h1 className="nf-title">Page not found.</h1>
        <p className="nf-sub">
          You’ve wandered off the map. This page doesn’t exist or has moved, so let’s get
          you back to familiar ground.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            Back to home <Arrow className="arr" />
          </Link>
          <Link href="/contact" className="btn-outline">
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  )
}
