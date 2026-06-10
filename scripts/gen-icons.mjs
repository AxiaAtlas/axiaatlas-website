// One-off icon generator. Renders the Deep Spruce rounded-square app icon with
// the Bone A-mark centered, then writes a multi-resolution favicon.ico and a
// PNG icon set. Run with: node scripts/gen-icons.mjs
import sharp from 'sharp'
import toIco from 'to-ico'
import { writeFileSync } from 'fs'

const SPRUCE = '#354940'
const BONE = '#F1F0EA'

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="${SPRUCE}"/>
  <svg x="106" y="106" width="300" height="300" viewBox="302 302 420 420">
    <path d="M495.022 312L495.021 606.028L318.627 711.998L495.022 312Z" fill="${BONE}"/>
    <path d="M528.466 312L528.467 606.028L704.861 711.998L528.466 312Z" fill="${BONE}"/>
  </svg>
</svg>`

const png = (size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()

// Multi-resolution favicon.ico for tabs and Google search results.
const ico = await toIco(await Promise.all([16, 32, 48, 64].map(png)))
writeFileSync('src/app/favicon.ico', ico)

// PNG icon set.
writeFileSync('src/app/icon.png', await png(512))
writeFileSync('src/app/apple-icon.png', await png(180))
writeFileSync('public/icon-192.png', await png(192))
writeFileSync('public/icon-512.png', await png(512))

console.log('icons generated')
