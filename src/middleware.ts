// ============================================================================
// /go/<slug> — the short links that go on printed cards and into podcast reads.
//
// Resolution lives on the platform, not here. The slug table sits behind RLS
// with no policies, so reading it needs the service-role key, and that key is
// deliberately absent from this repo: one bad route on a public marketing site
// should not have the run of every table in the project. So this handler asks
// app.axiaatlas.com where to send the visitor and issues the redirect itself.
//
// WHY MIDDLEWARE AND NOT A ROUTE HANDLER
// A page cannot answer 301 in the App Router (redirect() is 307,
// permanentRedirect() is 308), and a route handler cannot render the styled
// not-found page at the address the visitor actually typed. Middleware does
// both: it redirects on a hit and falls through to app/go/[slug] on a miss,
// which keeps the mistyped URL in the address bar where the visitor can see
// and correct it.
//
// 301 AND NOT 302, DELIBERATELY. The address on a card cannot be reissued, so
// permanence is the honest answer, and clients cache it.
//
// THE VISITOR'S QUERY STRING IS FORWARDED, NOT MERGED HERE. The resolve
// endpoint merges it onto the stored UTMs (stored parameters win, extras
// survive). Doing it in one place means the two sides cannot disagree.
//
// CLICKS ARE NOT COUNTED HERE either. The resolve endpoint records them
// atomically as part of the same request.
// ============================================================================
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RESOLVE_ORIGIN = 'https://app.axiaatlas.com'

// A visitor is standing there with a card in hand. Waiting on a slow resolver
// is worse than showing them the recovery page, so the request gets one short
// budget and then gives up.
const TIMEOUT_MS = 2500

export const config = { matcher: '/go/:slug*' }

/** Redirects are not pages. Keep them out of the index however they end. */
function noindex<T extends NextResponse>(res: T): T {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.slice('/go/'.length).split('/')[0].trim()

  // A bare /go, or /go/ with nothing after it. Nothing to resolve, so show the
  // recovery page rather than a dead end.
  if (!slug) {
    return noindex(NextResponse.rewrite(new URL('/go/not-found', req.url)))
  }

  const resolve = new URL(`/api/links/resolve/${encodeURIComponent(slug)}`, RESOLVE_ORIGIN)
  resolve.search = req.nextUrl.search

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(resolve, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      cache: 'no-store',
    })

    // 404 is an unregistered slug, 503 is a resolver that cannot answer today.
    // Both mean the same thing to the visitor: show them the way back.
    if (!res.ok) return noindex(NextResponse.next())

    const data = (await res.json()) as { ok?: boolean; url?: unknown }
    if (data?.ok !== true || typeof data.url !== 'string') {
      return noindex(NextResponse.next())
    }

    // A shortener sends people off-site by design, so the destination is not
    // restricted to our own domains. The scheme is the one exception: a stored
    // javascript: or data: URL must never become a Location header.
    const destination = new URL(data.url)
    if (destination.protocol !== 'https:' && destination.protocol !== 'http:') {
      return noindex(NextResponse.next())
    }

    return noindex(NextResponse.redirect(destination, 301))
  } catch {
    // Timed out, unreachable, or answered something that was not JSON.
    return noindex(NextResponse.next())
  } finally {
    clearTimeout(timer)
  }
}
