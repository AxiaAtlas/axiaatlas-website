import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

/* Social / link-preview card (1200×630) for every page.
   Deep Spruce field with the brand's vertical lockup — the Bone A-mark stacked
   above the Bone AXIA ATLAS wordmark — centered, with the slogan beneath.
   The dedicated lockup export isn't in the repo, so we compose it at build from
   the two real Bone assets in public/ (logo-amark-bone + logo-wordmark-bone). */
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Axia Atlas — To be found is to be seen.'
export const dynamic = 'force-static'

const SPRUCE = '#354940'
const BONE = '#F1F0EA'

function svgDataUri(file: string) {
  const svg = readFileSync(join(process.cwd(), 'public', file), 'utf8')
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

/* The wordmark asset is a full horizontal lockup (it embeds its own A-mark to
   the left of the type). For a clean vertical lockup we want only the "AXIA
   ATLAS" type beneath the standalone mark, so crop the viewBox to the glyphs. */
const WORDMARK_TEXT_VIEWBOX = '342 477 540 70'
function wordmarkTextDataUri() {
  const svg = readFileSync(join(process.cwd(), 'public/logo-wordmark-bone.svg'), 'utf8')
    .replace(/viewBox="[^"]*"/, `viewBox="${WORDMARK_TEXT_VIEWBOX}"`)
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function OpengraphImage() {
  const fontSemiBold = readFileSync(join(process.cwd(), 'src/app/_assets/Montserrat-600.ttf'))
  const fontBold = readFileSync(join(process.cwd(), 'src/app/_assets/Montserrat-700.ttf'))

  // A-mark viewBox is square (420×420). The cropped wordmark type is 540×70.
  const markH = 150
  const wordW = 392
  const wordH = Math.round(wordW * (70 / 540)) // ≈51

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: SPRUCE,
          fontFamily: 'Montserrat',
        }}
      >
        {/* Vertical lockup: mark stacked above wordmark, centered. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={markH} height={markH} src={svgDataUri('logo-amark-bone.svg')} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={wordW}
            height={wordH}
            src={wordmarkTextDataUri()}
            alt=""
            style={{ marginTop: 34 }}
          />
        </div>

        {/* Hairline divider + slogan. */}
        <div style={{ display: 'flex', width: 96, height: 1, background: BONE, opacity: 0.32, marginTop: 44 }} />
        <div
          style={{
            marginTop: 26,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: '0.01em',
            color: BONE,
          }}
        >
          To be found is to be seen.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Montserrat', data: fontSemiBold, weight: 600, style: 'normal' },
        { name: 'Montserrat', data: fontBold, weight: 700, style: 'normal' },
      ],
    },
  )
}
