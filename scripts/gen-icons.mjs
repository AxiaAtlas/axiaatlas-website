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
// THE FRAMING. Icons use a square crop computed from the geometry rather than
// eyeballed: the mark's own bounding box, centered, scaled to MARK_RATIO of the
// canvas. MARK_RATIO is the brand asset's own 400/1024 framing, so the favicon
// is the logo rather than a tighter crop of it, and it sits well inside the
// ~80% safe circle Android crops a maskable icon to. See MARK_RATIO below for
// what that costs at 16px and why it is worth it.
//
// WHY EVERYTHING IS OPAQUE. Google composites a transparent favicon against its
// own result-row background, which is why a transparent icon looks correct in
// the tab and wrong in search even when it is the same file. Every asset this
// script writes is filled edge to edge with Deep Spruce and carries no alpha
// channel at all. They are also full-bleed squares, not pre-rounded tiles: iOS
// and Android apply their own mask, and a pre-rounded tile leaves transparent
// corners for Google to fill.
//
// THE TAB ICON IS THE ONE EXCEPTION, AND IT IS GENERATED HERE TOO. The last
// block of this script writes public/icon-light.svg and public/icon-dark.svg:
// transparent, no ground, Deep Spruce ink and Bone Alabaster ink respectively.
// They are chosen by the media attribute on the <link> in src/app/layout.tsx and
// they are the ONLY icons that layout declares. favicon.ico is still written
// here and still served at the root path, but it is deliberately NOT linked --
// Chrome maps a declared favicon.ico to the tab strip whatever the link order,
// so declaring it is what takes the tab back. See the trade recorded above the
// icon declarations in src/app/layout.tsx. Do not make the transparent pair
// Google's icon, and do not re-declare favicon.ico.
//
// SIZES. Google wants a square favicon whose side is a multiple of 48px, so
// every linked icon is 48, 96, or 192. 512 exists only for the PWA manifest.
//
// SMALL SIZES ARE RENDERED, NOT SHRUNK. The .ico also carries purpose-made 16
// and 32 frames drawn straight from the vector. Before, the smallest asset on
// the site was 48px, so every 16px rendering was a browser downscaling a raster
// that had already been downscaled once. Rendering 16 and 32 from the geometry
// is the most the pipeline can do for them; at the brand's own MARK_RATIO the
// 16px slot still antialiases to a seam, and that is accepted rather than
// fixed. They live only in the .ico, where a browser can pick the exact frame;
// the linked PNGs stay on Google's multiple-of-48 rule.
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
//
// 0.39 IS THE BRAND ASSET'S OWN FRAMING — 400 units of mark on a 1024 canvas,
// which is how the mark is drawn everywhere else it appears. It was 0.625,
// which cropped in on the geometry to buy legibility at 16px and, in doing so,
// made the favicon a different piece of artwork from the logo it is supposed to
// be. The icon now matches the asset.
//
// THE TRADE, TAKEN DELIBERATELY. At 0.39 the mark is smaller in the frame, so
// at 16px the apex antialiases and the slot between the two halves reads as a
// seam rather than a clean split. That gap is under one device pixel at that
// size and no rendering method fixes it — rendering 16 straight from the vector
// (which this script does) is already the best available answer. Brand fidelity
// in search results, where the icon is drawn at 48px and up and is the only
// place most people will ever see it, beats crispness in a browser tab. Do not
// raise this number back to "fix" the 16px seam.
//
// KEEP IN SYNC with axiaatlas-platform/scripts/gen-icons.mjs. Both generators
// write the same six files from the same geometry at the same ratio, and the
// two properties are checked byte-for-byte at every size.
const MARK_RATIO = 0.39
const r = (n) => +n.toFixed(3)
const SIDE = r(Math.max(BOX.x1 - BOX.x0, BOX.y1 - BOX.y0) / MARK_RATIO)
const X0 = r(CX - SIDE / 2)
const Y0 = r(CY - SIDE / 2)
const VIEW_BOX = `${X0} ${Y0} ${SIDE} ${SIDE}`

const paths = (fill) => MARK_PATHS.map((d) => `<path d="${d}" fill="${fill}"/>`).join('')

// The raster source: bone mark, full-bleed Deep Spruce ground, no rounding.
// width/height are the TARGET size, so the rasterizer draws the vector at the
// size being written instead of shrinking a bigger bitmap.
const svgAt = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" width="${size}" height="${size}">
  <rect x="${X0}" y="${Y0}" width="${SIDE}" height="${SIDE}" fill="${SPRUCE}"/>
  ${paths(BONE)}
</svg>`

// flatten() drops the alpha channel outright, so the file cannot carry
// transparency even in its corners.
const png = (size) =>
  sharp(Buffer.from(svgAt(size)))
    .flatten({ background: SPRUCE })
    .png({ compressionLevel: 9 })
    .toBuffer()

// ICO container. Windows ICO has carried whole PNG payloads since Vista, and
// every browser and crawler that asks for /favicon.ico reads them, so the .ico
// is the same bytes as the PNGs rather than a second rendering of the mark.
// Header is 6 bytes, then one 16-byte directory entry per image, then the
// payloads. Side is written as a single byte, so every size here fits.
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

// 16 and 32 go into the .ico only. They are not written to public/ because a
// linked icon below 48px is one Google will not use, and an undeclared file is
// just another icon source to drift.
for (const size of [16, 32]) rasters[size] = await png(size)
// iOS masks this itself, so it is the same full-bleed square. 192 keeps every
// linked icon on Google's multiple-of-48 rule.
writeFileSync('public/apple-icon.png', rasters[192])

// /favicon.ico is the one favicon URL that never moves: it is what Google
// probes when it wants a site icon, and it 404'd on this domain until now.
// Frames ascending, so a browser at 16px takes the 16px drawing and Google,
// which wants the one nearest 48, takes the 48.
writeFileSync('public/favicon.ico', ico([
  { size: 16, data: rasters[16] },
  { size: 32, data: rasters[32] },
  { size: 48, data: rasters[48] },
  { size: 96, data: rasters[96] },
]))

console.log(`icons written from canonical mark, viewBox "${VIEW_BOX}"`)

// ── THE ADAPTIVE TAB PAIR ────────────────────────────────────────────────
// Two transparent files, one per OS theme, and the ONLY icons that
// src/app/layout.tsx declares. The theme query lives in the media attribute ON
// THE <link> ELEMENT, never inside the file.
//
// WHY TWO FILES AND NOT ONE. Both repos used to ship a single adaptive icon.svg
// carrying an @media (prefers-color-scheme: dark) block INSIDE the SVG. A
// favicon is rasterized outside any document, so an in-file query has no
// document to evaluate against and could never have flipped the ink. It was
// also never reached: Chrome was serving the tab from favicon.ico the whole
// time. The link-level media attribute is a SEPARATE mechanism -- the query is
// evaluated by the document that declares the link and the browser fetches only
// the file that matched. Two files, no query inside either one, nothing for the
// rasterizer to resolve.
//
// WHY THE PAIR NOW WINS THE TAB. Not because SVG outranks PNG or ICO; it does
// not. Chrome maps favicon.ico to the tab strip whenever it is DECLARED,
// regardless of link order, and never downloads the SVG. Measured, not assumed.
// The pair wins only because layout.tsx declares no favicon.ico at all. The .ico
// written above is still served at /favicon.ico, which is where Google looks by
// convention whether or not a link points at it.
//
// TRANSPARENT ON PURPOSE. These two are the only transparent icons this site
// serves and they are tab-only. A tab strip is a known background; a search
// result row is not. Everything above stays opaque and Google keeps reading
// favicon.ico.
//
// NO PNG TWINS. An earlier pass also wrote transparent icon-light.png /
// icon-dark.png as a fallback for a client that reads <link media> but not an
// SVG favicon. Nothing declares them, and an undeclared transparent icon at a
// root path is exactly the kind of second icon source this file exists to
// prevent. They are not written.
//
// Same geometry, same MARK_RATIO, same square VIEW_BOX as every asset above --
// only the ink and the missing ground differ.
const adaptiveSvg = (fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" width="512" height="512">${paths(fill)}</svg>\n`

for (const [name, fill] of [['light', SPRUCE], ['dark', BONE]])
  writeFileSync(`public/icon-${name}.svg`, adaptiveSvg(fill))

console.log('adaptive tab pair written: icon-light.svg (spruce ink), icon-dark.svg (bone ink)')
