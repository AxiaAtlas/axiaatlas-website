#!/usr/bin/env node
// ============================================================================
// npm run media: the Theia design pack, made web-sized.
//
// Reads Amit's pack (THEIA_PACK, default ~/Developer/reference/theia-design/pack)
// and writes into public/media:
//
//   shots/<id>-<w>.avif|webp   every width in WIDTHS, for <picture> srcset
//   shots/<id>.png             one PNG fallback at FALLBACK width
//   mark/reveal.webp           the build-in reveal, 36 frames, 6 x 6 grid
//   mark/reveal-still.webp|png the reveal's last frame (reduced motion, poster)
//   mark/thinking-<px>.webp    the thinking loop (64 and 176), 48 frames, 8 x 6 grid
//   mark/creating.webp         the creating loop, 48 frames, 8 x 6 grid
//   waves.webp                 Theia's ground image (from the portal)
//
// Then it writes src/lib/media.generated.ts with every shot's size, so the
// page reserves the exact box before the image arrives (no layout shift).
//
// ONLY DARK SHOTS. The pack's E* screens and the light close-ups are skipped
// on purpose: the site is dark only. Every shot listed below was checked by
// eye for names; the pack's names (Alex Rivera, Daniel Kim, Sam Okafor...)
// are sample people. Never add a shot that shows a real person's name.
// The outputs are committed, so a build never needs the pack.
// ============================================================================
import sharp from 'sharp'
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'

const ROOT = resolve(import.meta.dirname, '..')
const PACK = process.env.THEIA_PACK || join(homedir(), 'Developer/reference/theia-design/pack')
const OUT = join(ROOT, 'public/media')
if (!existsSync(PACK)) { console.error(`build-media: no pack at ${PACK}`); process.exit(1) }

/** id: [source file, alt text]. Full screens come from 4k/, close-ups from closeups/. */
const SCREENS = {
  'theia-home': ['4k/A01-dark-home.png', 'Theia’s home screen: a greeting, the Ask Theia composer and four suggested questions.'],
  'theia-thinking': ['4k/A06-dark-thinking-steps.png', 'Theia thinking through a question, each step listed as she works.'],
  'theia-answer': ['4k/A10-dark-answer-done.png', 'A finished answer in Theia: what changed, recommended next steps, and follow-up questions.'],
  'theia-deck': ['4k/B05-dark-slides-ready.png', 'A six-slide report built by Theia, open in the slide editor beside the chat.'],
  'theia-comment': ['4k/B06-dark-slides-comment.png', 'A comment left on a slide, sent to Theia to revise.'],
  'theia-library': ['4k/D01-dark-library.png', 'The Library: every slideshow, spreadsheet and chart Theia has built, in one place.'],
  'theia-scheduled': ['4k/D04-dark-scheduled.png', 'Scheduled tasks: weekly and monthly reports Theia runs on their own.'],
}
const CLOSEUPS = {
  'cu-greeting': ['closeups/CU01-mark-greeting.png', 'The Theia mark above the greeting on her home screen.'],
  'cu-thinking-steps': ['closeups/CU11-thinking-steps.png', 'Theia’s thinking steps, each one checked off as it completes.'],
}
const WIDTHS = { screen: [960, 1600, 2400], closeup: [800, 1200, 1800] }
const FALLBACK = { screen: 1600, closeup: 1200 }

mkdirSync(join(OUT, 'shots'), { recursive: true })
mkdirSync(join(OUT, 'mark'), { recursive: true })

const meta = {}
async function shot(id, [file, alt], kind) {
  const src = sharp(join(PACK, file))
  const { width, height } = await src.metadata()
  // The 4k screens are 6240 x 3510; scale, never upscale.
  const widths = WIDTHS[kind].filter((w) => w <= width)
  for (const w of widths) {
    const img = sharp(join(PACK, file)).resize({ width: w })
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(join(OUT, 'shots', `${id}-${w}.avif`))
    await img.clone().webp({ quality: 80, effort: 6 }).toFile(join(OUT, 'shots', `${id}-${w}.webp`))
  }
  await sharp(join(PACK, file)).resize({ width: FALLBACK[kind] }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(join(OUT, 'shots', `${id}.png`))
  meta[id] = { w: width, h: height, widths, alt }
}

/** Frames cropped to a square around the mark, laid out in a grid. */
async function sprite(dir, name, { size, cols, crop, alpha }) {
  const files = readdirSync(join(PACK, 'logo-animation', dir)).filter((f) => f.endsWith('.png')).sort()
  const rows = Math.ceil(files.length / cols)
  const tiles = await Promise.all(files.map(async (f, i) => ({
    input: await sharp(join(PACK, 'logo-animation', dir, f)).extract(crop).resize(size, size).png().toBuffer(),
    left: (i % cols) * size,
    top: Math.floor(i / cols) * size,
  })))
  const bg = alpha ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 0, g: 0, b: 0, alpha: 1 }
  await sharp({ create: { width: cols * size, height: rows * size, channels: 4, background: bg } })
    .composite(tiles).webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(join(OUT, 'mark', `${name}.webp`))
  return { files, rows }
}

for (const [id, v] of Object.entries(SCREENS)) await shot(id, v, 'screen')
for (const [id, v] of Object.entries(CLOSEUPS)) await shot(id, v, 'closeup')

// The mark sits in a 414 x 558 box centred on (539, 539) of a 1080 frame. The
// reveal keeps its glow, so it takes a wider square; it is composited with
// mix-blend-mode: screen, which turns its black ground transparent.
const WIDE = { left: 179, top: 179, width: 720, height: 720 }
const TIGHT = { left: 239, top: 239, width: 600, height: 600 }
const reveal = await sprite('reveal-on-black', 'reveal', { size: 360, cols: 6, crop: WIDE })
const last = join(PACK, 'logo-animation/reveal-on-black', reveal.files.at(-1))
await sharp(last).extract(WIDE).resize(720, 720).webp({ quality: 88 }).toFile(join(OUT, 'mark', 'reveal-still.webp'))
await sharp(last).extract(WIDE).resize(720, 720).png({ compressionLevel: 9 }).toFile(join(OUT, 'mark', 'reveal-still.png'))
await sprite('thinking-transparent', 'thinking-64', { size: 64, cols: 8, crop: TIGHT, alpha: true })
await sprite('thinking-transparent', 'thinking-176', { size: 176, cols: 8, crop: TIGHT, alpha: true })
await sprite('creating-on-black', 'creating', { size: 160, cols: 8, crop: TIGHT })

// Theia's ground image, the same file the portal draws behind every page.
const WAVES = process.env.WAVES || join(homedir(), 'Developer/axiaatlas-platform/public/theia/waves-dark.jpg')
if (existsSync(WAVES)) await sharp(WAVES).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 72 }).toFile(join(OUT, 'waves.webp'))

writeFileSync(join(ROOT, 'src/lib/media.generated.ts'),
  `// Written by scripts/build-media.mjs (npm run media). Do not edit by hand.\n` +
  `export const SHOTS = ${JSON.stringify(meta, null, 2)} as const\n\nexport type ShotId = keyof typeof SHOTS\n`)
console.log(`build-media: ${Object.keys(meta).length} shots, 4 sprites -> public/media`)
