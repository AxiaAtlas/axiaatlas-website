// ============================================================================
// TITLES. ONE FORMAT, ONE FILE.
//
// Every page title used to read "Axia Atlas — <Page> — Digital Marketing". The
// title tag and the H1 are the two highest-weight on-page signals a page has,
// and brand-first spends the front of the more valuable one on a word nobody
// searches for. Google truncates a title around 580px — rewriting starts near
// 525px — so "Axia Atlas" was occupying the only part of the string guaranteed
// to be read.
//
//   Home:  keyword-led, and the ONE page that carries the full descriptor,
//          because "Digital Marketing Studio" is the home page's keyword.
//   Other: "<Keyword phrase> - Axia Atlas"
//
// THE BRAND TAIL IS "- Axia Atlas" AND NOTHING MORE. Google prints the site
// name separately in the mobile result, above the title, so repeating
// "Digital Marketing Studio" on every page bought a second impression of a
// string the user was already looking at and spent 26 characters of the only
// budget that matters. Every title below targets 50-60 characters.
//
// THE SEPARATOR IS A HYPHEN, NOT AN EM DASH OR A PIPE. The house rule is no em
// dashes in strings we write; the hyphen also survives Google's own rewriting
// more reliably than a pipe, which it frequently normalises away.
//
// TITLE AND H1 MUST TELL THE SAME STORY WITHOUT BEING IDENTICAL. A title whose
// promise the H1 does not keep is one of the main triggers for Google throwing
// the title away and writing its own. The H1s are listed against their titles
// in DESIGN.md.
//
// OPEN GRAPH AND TWITTER ARE NOT COVERED BY THE TEMPLATE. Next applies
// `title.template` to `metadata.title` only. Every page therefore built its own
// og:title, and every page that did not set one inherited the ROOT's — so
// /services, /pricing, /case-studies, /about, /contact and /demo all shared a
// single og:title of "Axia Atlas — Digital Marketing" when shared to LinkedIn
// or Slack. `social()` below exists so that cannot happen again: it returns a
// COMPLETE openGraph block, because Next replaces openGraph wholesale rather
// than merging it — which is how /blog silently lost its og:image.
// ============================================================================

export const SITE_URL = 'https://axiaatlas.com'

/** The tail every non-home title ends with. Two words, nine characters plus
    the separator. */
export const BRAND_TAIL = 'Axia Atlas'

/**
 * The home title, and the only one carrying the full descriptor — on the home
 * page "Digital Marketing Studio" IS the keyword, not a brand ornament. 57
 * characters.
 */
export const HOME_TITLE = 'Digital Marketing Studio for Search & Social - Axia Atlas'

/** "<Keyword phrase> - Axia Atlas". Target the whole string at 50-60 chars. */
export const pageTitle = (name: string) => `${name} - ${BRAND_TAIL}`

/** The finished 1200x630 link-preview card, shipped as a static asset. */
export const OG_IMAGE = {
  url: '/og-card.png',
  width: 1200,
  height: 630,
  alt: 'Axia Atlas — Digital Marketing',
} as const

type SocialArgs = {
  /** The full title, already through pageTitle(). */
  title: string
  /** The page's own description, verbatim. Never rewritten here. */
  description?: string
  /** Site-relative path, e.g. "/services". */
  path: string
  type?: 'website' | 'article'
  /** Extra openGraph fields (article dates, authors, section). */
  og?: Record<string, unknown>
}

/**
 * A complete openGraph + twitter pair. Always spread this rather than writing a
 * partial openGraph: a partial one drops the image.
 */
export function social({ title, description, path, type = 'website', og }: SocialArgs) {
  return {
    openGraph: {
      type,
      url: `${SITE_URL}${path}`,
      siteName: 'Axia Atlas',
      title,
      description,
      images: [OG_IMAGE],
      ...og,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}
