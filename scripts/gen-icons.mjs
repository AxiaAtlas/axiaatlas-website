// Single source of truth for every Axia Atlas icon this site serves.
//
// THE ARTWORK. The two <path> strings below are byte-identical to the ones in
// axiaatlas-platform/public/logo-mark-spruce.svg and logo-mark-bone.svg, the
// portal's canonical marks (registered in axiaatlas-platform/src/lib/brand/).
// Nothing here redraws the mark — every asset this script writes is a reframing
// or a recolor of that one geometry, so the website and the portal can never
// drift apart again. If the portal's mark ever changes, change MARK_PATHS here
// and re-run; do not hand-edit anything in public/.
//
// THE FRAMING. The portal ships the mark on a 1024 canvas with a lot of air,
// which is right for a header lockup and wrong for a 16px browser tab. Icons
// therefore use their own square crop, computed from the geometry rather than
// eyeballed: the mark's own bounding box, centered, scaled to MARK_RATIO of the
// canvas. That keeps the ink big enough to read in a tab while staying inside
// the ~80% safe circle Android crops a maskable icon to.
//
// WHY THE RASTERS ARE OPAQUE. Google composites a transparent favicon against
// its own result-row background, which is why a transparent icon can look
// correct in the tab and wrong in search. Every PNG here is filled edge to edge
// with Deep Spruce and carries no alpha channel at all. They are also
// full-bleed squares, not pre-rounded tiles: iOS and Android apply their own
// mask, and a pre-rounded tile leaves transparent corners for Google to fill.
//
// SIZES. Google wants a square favicon whose side is a multiple of 48px, so the
// linked icons are 48 and 192. 512 exists only for the PWA manifest.
//
//   npm run icons
import sharp from 'sharp'
import { writeFileSync } from 'fs'

const SPRUCE = '#354940'
const BONE = '#F1F0EA'

// ── The canonical geometry (see header) ─────────────────────────────────────
const MARK_PATHS = [
  'M495.022 312L495.021 606.028L318.627 711.998L495.022 312Z',
  'M528.466 312L528.467 606.028L704.861 711.998L528.466 312Z',
]

// Bounding box of the geometry above, in its native 1024 coordinate space.
const BOX = { x0: 318.627, y0: 312, x1: 704.861, y1: 711.998 }
const CX = (BOX.x0 + BOX.x1) / 2
const CY = (BOX.y0 + BOX.y1) / 2
// Fraction of the icon's side the mark's tallest dimension should occupy.
// 0.625 reads clearly at 16px and sits well inside Android's 80% maskable crop.
const MARK_RATIO = 0.625
const r = (n) => +n.toFixed(3)
const SIDE = r(Math.max(BOX.x1 - BOX.x0, BOX.y1 - BOX.y0) / MARK_RATIO)
const X0 = r(CX - SIDE / 2)
const Y0 = r(CY - SIDE / 2)
const VIEW_BOX = `${X0} ${Y0} ${SIDE} ${SIDE}`

const paths = (fill) => MARK_PATHS.map((d) => `<path d="${d}" fill="${fill}"/>`).join('')

// The tab icon: transparent and adaptive, so the mark inks itself spruce on a
// light tab strip and bone on a dark one. Matches the portal's /icon.svg
// exactly in behaviour; only the crop differs. Search engines never see this
// one -- app/layout.tsx lists the opaque PNG ahead of it.
const adaptiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" width="512" height="512">
  <style>path{fill:${SPRUCE}}@media (prefers-color-scheme:dark){path{fill:${BONE}}}</style>
  ${MARK_PATHS.map((d) => `<path d="${d}"/>`).join('\n  ')}
</svg>
`

// The raster source: bone mark, full-bleed Deep Spruce ground, no rounding.
const filledSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" width="1024" height="1024">
  <rect x="${X0}" y="${Y0}" width="${SIDE}" height="${SIDE}" fill="${SPRUCE}"/>
  ${paths(BONE)}
</svg>`

// flatten() drops the alpha channel outright, so the file cannot carry
// transparency even in its corners.
const png = (size) =>
  sharp(Buffer.from(filledSvg))
    .resize(size, size, { fit: 'fill' })
    .flatten({ background: SPRUCE })
    .png({ compressionLevel: 9 })
    .toBuffer()

writeFileSync('public/icon.svg', adaptiveSvg)

// 48 and 192 are what app/layout.tsx links; 96 and 512 are manifest-only.
for (const size of [48, 96, 192, 512]) {
  writeFileSync(`public/icon-${size}.png`, await png(size))
}
// iOS masks this itself, so it is the same full-bleed square. 192 keeps every
// linked icon on Google's multiple-of-48 rule.
writeFileSync('public/apple-icon.png', await png(192))

console.log(`icons written from canonical mark — viewBox "${VIEW_BOX}"`)
