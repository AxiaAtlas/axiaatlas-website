// Writes public/og-card.png, the 1200x630 link-preview card (og:image and
// twitter:image, declared in src/lib/seo.ts). Generated, never hand-edited.
//
// THE GROUND IS THE BRAND FILE'S OWN. The accent-color mark,
// public/brand/Axia Atlas_Vector Logo_Accent Color_1024x1024.png, is the same
// file every opaque icon is resized from (scripts/gen-icons.mjs). Its ground is
// a smooth spruce-to-black diagonal, not flat Deep Spruce. The card takes that
// ground: the mark is erased from the file by interpolating each row across it,
// and the clean square is stretched to 1200x630. A stretched gradient is still
// the gradient; a stretched mark would not be, so the mark is set on top.
//
// THE MARK AND THE WORDMARK ARE VECTORS. MARK_PATHS is byte-identical to the
// geometry in scripts/gen-icons.mjs, filled with the brand file's own ink
// (#F1F0EA, Bone Alabaster), so it is the accent-color mark at a size the 1024
// raster cannot be cut to cleanly. The wordmark is public/logo-wordmark-bone.svg.
// No text is typeset here, so the card does not depend on a font being
// installed on the machine that runs this.
//
//   npm run og
import sharp from 'sharp'
import { readFileSync } from 'fs'

const W = 1200
const H = 630
const BONE = '#F1F0EA'

const ICON_SOURCE = 'public/brand/Axia Atlas_Vector Logo_Accent Color_1024x1024.png'
const WORDMARK = 'public/logo-wordmark-bone.svg'

// KEEP IN SYNC with MARK_PATHS / BOX in scripts/gen-icons.mjs.
const MARK_PATHS = [
  'M495.022 312L495.021 606.028L318.627 711.998L495.022 312Z',
  'M528.466 312L528.467 606.028L704.861 711.998L528.466 312Z',
]
const BOX = { x0: 318.627, y0: 312, x1: 704.861, y1: 711.998 }

// ── Ground: the brand file with its mark interpolated out ──────────────────
// Ink spans x 319-703, y 313-710 on the 1024 file. Each row inside a margin
// around that box is replaced by a straight blend between the two pixels just
// outside it, which on a gradient this smooth is indistinguishable from the
// ground that was under the mark.
const ERASE = { x0: 300, x1: 724, y0: 296, y1: 728 }
const { data, info } = await sharp(readFileSync(ICON_SOURCE)).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const S = info.width
// Endpoints are a 9x9 mean, not single pixels: the file carries a faint grain,
// and single-pixel endpoints turn it into horizontal streaks across the fill.
const mean = (cx, cy) => {
  const m = [0, 0, 0]
  for (let y = cy - 4; y <= cy + 4; y++)
    for (let x = cx - 4; x <= cx + 4; x++)
      for (let c = 0; c < 3; c++) m[c] += data[(y * S + x) * 3 + c] / 81
  return m
}
for (let y = ERASE.y0; y <= ERASE.y1; y++) {
  const a = mean(ERASE.x0 - 4, y)
  const b = mean(ERASE.x1 + 4, y)
  for (let x = ERASE.x0 + 1; x < ERASE.x1; x++) {
    const t = (x - ERASE.x0) / (ERASE.x1 - ERASE.x0)
    const i = (y * S + x) * 3
    for (let c = 0; c < 3; c++) data[i + c] = Math.round(a[c] * (1 - t) + b[c] * t)
  }
}
const ground = await sharp(data, { raw: { width: S, height: S, channels: 3 } })
  .resize(W, H, { fit: 'fill', kernel: 'lanczos3' })
  .png()
  .toBuffer()

// ── Mark: 250px tall, about 0.40 of the card's height ──────────────────────
const MARK_H = 250
const markW = Math.round((MARK_H * (BOX.x1 - BOX.x0)) / (BOX.y1 - BOX.y0))
const mark = await sharp(Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${BOX.x0} ${BOX.y0} ${BOX.x1 - BOX.x0} ${BOX.y1 - BOX.y0}" width="${markW}" height="${MARK_H}">` +
  MARK_PATHS.map((d) => `<path d="${d}" fill="${BONE}"/>`).join('') + '</svg>',
)).png().toBuffer()

// ── Wordmark: rendered large, trimmed to its ink, set to width ─────────────
const WORD_W = 600
const word = await sharp(await sharp(readFileSync(WORDMARK), { density: 288 }).png().trim({ threshold: 1 }).toBuffer())
  .resize({ width: WORD_W, kernel: 'lanczos3' })
  .png()
  .toBuffer()
const wordH = (await sharp(word).metadata()).height

// ── Lockup, centered as a group ────────────────────────────────────────────
const GAP = 64
const left = Math.round((W - (markW + GAP + WORD_W)) / 2)
const markTop = Math.round((H - MARK_H) / 2)

await sharp(ground)
  .composite([
    { input: mark, left, top: markTop },
    { input: word, left: left + markW + GAP, top: Math.round((H - wordH) / 2) },
  ])
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toFile('public/og-card.png')

console.log(`og-card.png written ${W}x${H} from ${ICON_SOURCE}: mark ${markW}x${MARK_H}, wordmark ${WORD_W}x${wordH}`)
