import type { Metadata } from 'next'
import Link from 'next/link'
import { Wordmark } from '@/components/Logo'
import { Arrow } from '@/components/icons'

// ============================================================================
// Every /go address that reaches this page has already failed to resolve.
// Middleware redirects the slugs that exist and only falls through to here on a
// miss, an unreachable resolver, or a timeout. So this page has one job: catch
// the visitor.
//
// Someone read this address off a printed card or heard it in a podcast and got
// a character wrong. They were actively trying to reach us, which makes this
// the most expensive place on the site to show a dead end. It names what
// happened and offers the two doors they were most likely headed for.
//
// WHY THIS RENDERS THE PAGE INSTEAD OF CALLING notFound()
// notFound() would put a 404 on the response, which is the tidier status, but
// Next 14 hands the not-found boundary to the client: the server sends an empty
// body and the markup only appears once JavaScript has loaded. That is a white
// screen for exactly the visitor this page exists for, on exactly the slow
// phone they are most likely holding. Rendering here is server-side and
// complete on arrival. The status is the cost, and it buys nothing back:
// /go/* is noindex and disallowed in robots.txt, so no crawler is reading it.
// ============================================================================

export const metadata: Metadata = {
  title: 'Short link not found',
  description: 'This short link is no longer active or was typed slightly differently.',
  robots: { index: false, follow: false },
}

export default function GoNotFoundPage() {
  return (
    <main className="nf-page">
      <div className="lt-bg" aria-hidden="true">
        <span className="lt-blob a" />
        <span className="lt-blob b" />
      </div>

      <div className="nf-inner">
        <Wordmark className="nf-mark" />
        <span className="nf-eyebrow">Short link</span>
        <h1 className="nf-title">We couldn’t find that link.</h1>
        <p className="nf-sub">
          This short link is no longer active, or a character came across differently
          than it was printed or spoken. It happens. You’re in the right place, so
          here are the two doors most people are looking for.
        </p>
        <div className="nf-actions">
          <Link href="/demo" className="btn-primary">
            Book a Demo <Arrow className="arr" />
          </Link>
          <Link href="/" className="btn-outline">
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
