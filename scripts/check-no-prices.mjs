#!/usr/bin/env node
// ============================================================================
// npm test: THE WEBSITE NEVER SHOWS A PRICE (Amit, 2026-11-14).
//
// No dollar figure for anything Axia Atlas sells may appear in page copy,
// metadata, social cards, structured data, llms.txt, the FAQ answers or the
// chat widget. Pricing is discussed on a demo.
//
// Scans every shipped string under src/ (comments are blanked first) and
// public/llms.txt if present, and fails on:
//   - a dollar figure: $5, $3,500, $1.5M, $ 250
//   - a structured-data price: "offers", "priceRange", "priceSpecification",
//     "priceCurrency" or "lowPrice"/"highPrice"
//
// ALLOWED, because they are product screens and not our prices:
//   - src/components/mocks/          Kova's spend and raise figures
//   - src/components/site/MaskingFigure.tsx   the masking illustration
// A regular-expression backreference ('$1') is not a dollar figure and is
// skipped.
// ============================================================================
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'src')
const ALLOW = [join(SRC, 'components', 'mocks') + sep, join(SRC, 'components', 'site', 'MaskingFigure.tsx')]

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mjs|json|txt|md)$/.test(n) ? [p] : []
})

const files = walk(SRC).filter((f) => !ALLOW.some((a) => f === a || f.startsWith(a)))
const llms = join(ROOT, 'public', 'llms.txt')
if (existsSync(llms)) files.push(llms)

const DOLLAR = /\$\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:k|m|bn|K|M|B)\b)?/g
const LD_PRICE = /["'`]?\b(offers|priceRange|priceSpecification|priceCurrency|lowPrice|highPrice)\b["'`]?\s*:/
const BACKREF = /^\$\d$/ // '$1' in a .replace() pattern

const fails = []
for (const f of files) {
  const src = readFileSync(f, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1')
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(DOLLAR)) {
      if (BACKREF.test(m[0]) && /\.replace\(/.test(line)) continue
      fails.push(`${relative(ROOT, f)}:${i + 1}  dollar figure "${m[0]}": ${line.trim().slice(0, 120)}`)
    }
    if (LD_PRICE.test(line)) fails.push(`${relative(ROOT, f)}:${i + 1}  structured-data price field: ${line.trim().slice(0, 120)}`)
  })
}

if (fails.length) {
  console.error(`check-no-prices: ${fails.length} price(s) found. The website never shows a price.\n` + fails.map((f) => '  ' + f).join('\n'))
  process.exit(1)
}
console.log(`check-no-prices: ${files.length} files, no prices.`)
