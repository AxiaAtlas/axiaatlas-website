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
// WHY EVERYTHING IS OPAQUE. Google composites a transparent favicon against its
// own result-row background, which is why a transparent icon looks correct in
// the tab and wrong in search even when it is the same file. Every asset this
// script writes is filled edge to edge with Deep Spruce and carries no alpha
// channel at all. They are also full-bleed squares, not pre-rounded tiles: iOS
// and Android apply their own mask, and a pre-rounded tile leaves transparent
// corners for Google to fill.
//
// This script used to also write an adaptive, TRANSPARENT public/icon.svg for
// the tab. That was the last transparent icon on the site and the only one the
// tab and Google could disagree about: browsers prefer image/svg+xml over any
// PNG regardless of link order, so the tab rendered the bare mark against the
// tab strip while Google rendered the same file against its own background. It
// is gone. There is now ONE artwork, opaque, in three containers.
//
// SIZES. Google wants a square favicon whose side is a multiple of 48px, so
// every linked icon is 48, 96, or 192. 512 exists only for the PWA manifest.
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

// ICO container. Windows ICO has carried whole PNG payloads since Vista, and
// every browser and crawler that asks for /favicon.ico reads them, so the .ico
// is the same bytes as the PNGs rather than a second rendering of the mark.
// Header is 6 bytes, then one 16-byte directory entry per image, then the
// payloads. Side is written as a single byte, so 48 and 96 both fit.
const ico = (images) => {
  const head = Buffer.alloc(6)
  head.writeUInt16LE(0, 0) // reserved
  head.writeUInt16LE(1, 2) // 1 = icon
  head.writeUInt16LE(images.length, 4)
  let offset = 6 + 16 * images.length
  const dir = []
  for (const { size, data } of images) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size, 0)   // width
    e.writeUInt8(size, 1)   // height
    e.writeUInt8(0, 2)      // palette size (0 = truecolor)
    e.writeUInt8(0, 3)      // reserved
    e.writeUInt16LE(1, 4)   // colour planes
    e.writeUInt16LE(32, 6)  // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    dir.push(e)
    offset += data.length
  }
  return Buffer.concat([head, ...dir, ...images.map((i) => i.data)])
}

// 48 and 192 are what app/layout.tsx links; 96 and 512 are manifest-only.
const rasters = {}
for (const size of [48, 96, 192, 512]) {
  rasters[size] = await png(size)
  writeFileSync(`public/icon-${size}.png`, rasters[size])
}
// iOS masks this itself, so it is the same full-bleed square. 192 keeps every
// linked icon on Google's multiple-of-48 rule.
writeFileSync('public/apple-icon.png', rasters[192])

// /favicon.ico is the one favicon URL that never moves: it is what Google
// probes when it wants a site icon, and it 404'd on this domain until now.
writeFileSync('public/favicon.ico', ico([
  { size: 48, data: rasters[48] },
  { size: 96, data: rasters[96] },
]))

console.log(`icons written from canonical mark, viewBox "${VIEW_BOX}"`)
