/* ════════════════════════════════════════════════════════════════════════════
   FILM SLOTS. One hero film, and one 30-second film per product.

   Each slot is drawn by components/site/FilmSlot. Until a film exists (src is
   null) the slot shows that product's mock interaction, so nothing on the
   site is ever an empty frame. To ship a film: put the files in
   public/media/films/ and fill in src and poster here. The slot then plays
   the film muted, inline and looped once it is on screen, with the poster
   until it can, and the mock is no longer drawn.

   The brief for each film (length, aspect, what happens) is in
   docs/runbooks/films.md.
   ════════════════════════════════════════════════════════════════════════════ */

export type Film = {
  /** What a screen reader hears in place of the film. */
  label: string
  src: { mp4: string; webm?: string } | null
  /** A still of the film's first frame, 16:9, at least 1920 wide. */
  poster: string | null
}

export const FILMS = {
  'home-hero': { label: 'Axia Atlas in one minute: every channel behind a raise, set against the investments it brought, explained by Theia.', src: null, poster: null },
  'live-campaigns': { label: 'Live Campaigns: every ad platform in one live view.', src: null, poster: null },
  'raise-ledger': { label: 'Raise Ledger: every dollar behind the raise against the investors it brought.', src: null, poster: null },
  'ask-theia': { label: 'Ask Theia: a question about a campaign, answered in seconds.', src: null, poster: null },
  'theia-reports': { label: 'Theia Reports: a monthly investor report that builds itself.', src: null, poster: null },
} satisfies Record<string, Film>

export type FilmId = keyof typeof FILMS
