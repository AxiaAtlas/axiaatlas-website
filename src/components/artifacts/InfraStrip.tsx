/* ── WHAT THE CLIENT DASHBOARD IS BUILT ON ──────────────────────────────────
   A trust signal for the one row on /services that sells software rather than
   a marketing channel. A buyer weighing a custom operational dashboard is
   weighing who holds their data and what happens to it, and four names they
   already recognise answer more of that than another paragraph would.

   IT DOES NOT MOVE. Every other logo run on this site scrolls — the answer
   engines in the hero marquee, the brand strip on the home page — because
   those are lists of places, and a list of places reads as a passing view. A
   trust signal that travels reads as decoration, and decoration is exactly the
   register this must not be in. It sits still.

   THE MARKS ARE BUNDLED, NOT HOTLINKED. Every path below is inlined from the
   official SVG rather than fetched from a CDN at render. A third party's
   uptime is not a dependency worth taking on for four 18px glyphs, and a page
   arguing that we keep client data off other people's infrastructure should
   not be loading its own artwork off someone else's.

   THE CAPTION IS WIDER THAN "DEPLOYED ON", ON PURPOSE. GitHub holds code, not
   client data, so a caption naming only where the thing runs would have been
   making a claim about GitHub that is not the one being made. "Built,
   deployed, and secured on" covers the four honestly: the database and its
   auth, the runtime, the transactional mail, and the source of record.

   IT IS NOT REPEATED ON THE HOME PAGE. The home page's dashboard section is
   about the agency portal every client already gets — a different product from
   the one this row sells — and putting the same strip there would re-blur the
   line the copy on this row exists to draw. */

const marks = [
  {
    name: 'Supabase',
    // Postgres, auth, and storage. Each dashboard client gets a project of
    // their own here, which is the separation the row's copy claims.
    d: 'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z',
  },
  {
    name: 'Vercel',
    d: 'M24 22.525H0l12-21.05 12 21.05z',
  },
  {
    name: 'Resend',
    d: 'M2.023 0v24h5.553v-8.434h2.998L15.326 24h6.65l-5.372-9.258a7.652 7.652 0 0 0 3.316-3.016c.709-1.21 1.062-2.57 1.062-4.08 0-1.462-.353-2.767-1.062-3.91-.709-1.165-1.692-2.079-2.95-2.742C15.737.331 14.355 0 12.823 0Zm5.553 4.87h4.219c.731 0 1.349.125 1.851.376.526.252.925.618 1.2 1.098.274.457.412.994.412 1.611S15.132 9.12 14.88 9.6c-.229.48-.572.856-1.03 1.13-.434.252-.948.38-1.542.38H7.576Z',
  },
  {
    name: 'GitHub',
    d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
]

export default function InfraStrip() {
  return (
    <div className="infra-strip">
      <div className="infra-cap">Built, deployed, and secured on</div>
      <div className="infra-marks">
        {marks.map((m) => (
          <span key={m.name} className="infra-mark" title={m.name}>
            <svg viewBox="0 0 24 24" role="img" aria-label={m.name} focusable="false">
              <path d={m.d} fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
