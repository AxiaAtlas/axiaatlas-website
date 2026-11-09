#!/usr/bin/env node
// ============================================================================
// THE ON-PAGE SEO CONTRACT, CHECKED ON THE BUILT PAGES.
//
// The rules live in the platform's src/lib/website/seo-contract.ts (titles,
// one H1, heading order, the 40-60 word answer block, JSON-LD types). This
// script does not restate them: it bundles that file the way sync-pricing
// bundles pricing.ts, reads every prerendered page under .next/server/app,
// and runs the platform's own validateSite() on what actually ships.
//
//   npm run build && npm run check:seo
//
// The answer block is read as the first paragraph after the page's H1 (the
// hero's answer on every page). Pages marked noindex and the 404 are skipped:
// they make no claim to rank. With no platform checkout (Vercel, CI) the
// script says so and exits 0, like check:pricing.
// ============================================================================
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')
const APP = join(ROOT, '.next/server/app')
const CONTRACT = 'src/lib/website/seo-contract.ts'

const PLATFORM = [
  process.env.PLATFORM_DIR,
  resolve(ROOT, '../axiaatlas-platform'),
  resolve(process.env.HOME || '', 'Developer/axiaatlas-platform'),
].filter(Boolean).find((d) => existsSync(join(d, CONTRACT)))

if (!PLATFORM) { console.log('check-seo: no platform checkout found (set PLATFORM_DIR). Skipping.'); process.exit(0) }
if (!existsSync(APP)) { console.error('check-seo: no build found. Run `npm run build` first.'); process.exit(1) }

const esbuild = createRequire(join(PLATFORM, 'package.json'))('esbuild')
const dir = mkdtempSync(join(tmpdir(), 'aa-seo-'))
const outfile = join(dir, 'seo.mjs')
let S
try {
  await esbuild.build({ entryPoints: [join(PLATFORM, CONTRACT)], bundle: true, platform: 'node', format: 'esm', outfile, logLevel: 'error' })
  S = await import(pathToFileURL(outfile).href)
} finally {
  rmSync(dir, { recursive: true, force: true })
}

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []
})

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ' }
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#x27|#39|nbsp);/g, (m) => ENTITIES[m])
const text = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()

/** The first paragraph after the H1: every page's answer block. */
function answerOf(html) {
  const h1 = html.search(/<h1\b/i)
  if (h1 < 0) return undefined
  const m = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(html.slice(h1))
  return m ? text(m[1]) : undefined
}

const pages = []
for (const file of walk(APP).sort()) {
  const rel = '/' + relative(APP, file).replace(/\.html$/, '')
  const path = rel === '/index' ? '/' : rel
  if (path === '/_not-found') continue
  const html = readFileSync(file, 'utf8')
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue
  // A page behind the launch flag prerenders as the 404.
  if (/<h1[^>]*>\s*404\s*<\/h1>|NEXT_HTTP_ERROR_FALLBACK;404/.test(html)) continue
  // An FAQ is declared by its markup (the FAQ section or its items), not by
  // whether a heading happens to contain the letters "FAQ".
  const hasFaq = /class="[^"]*\bfaq-(section|item|list)\b|data-aa-section="[^"]*\.faq"|<h2[^>]*>[^<]*(Frequently Asked|FAQ)/i.test(html)
  const report = S.reportFromHtml(path, html, { answer: answerOf(html), hasFaq })
  // The headings helper keeps entities; compare decoded text like a reader would.
  report.title = decode(report.title)
  report.h1 = decode(report.h1)
  report.headings = report.headings.map((h) => ({ ...h, text: decode(h.text) }))
  pages.push(report)
}

const result = S.validateSite(pages, { brandName: 'Axia Atlas' })
for (const p of result.pages) {
  const blocking = p.violations.filter((v) => v.severity === 'blocking')
  const notes = p.violations.filter((v) => v.severity !== 'blocking')
  console.log(`${blocking.length ? 'FAIL' : 'ok  '} ${p.path}  title ${p.titleChars}ch/${p.titlePixels}px  h1 ${p.h1.length}ch  schema ${p.schemaTypes?.join(',') || '-'}`)
  for (const v of [...blocking, ...notes]) console.log(`       ${v.severity === 'blocking' ? 'x' : '·'} ${v.code}: ${v.message}`)
}
for (const v of result.siteViolations) console.log(`SITE ${v.severity === 'blocking' ? 'x' : '·'} ${v.code}: ${v.message}`)
console.log(`\n${result.pages.length} pages, ${result.blockingCount} blocking, ${result.advisoryCount} advisory.`)
process.exit(result.passes ? 0 : 1)
