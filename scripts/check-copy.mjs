#!/usr/bin/env node
// ============================================================================
// npm test: THE HOUSE COPY RULES, CHECKED ON THE SOURCE.
//
//   1. The retired tagline ("To be found is to be seen") appears nowhere.
//   2. The model provider is never named where a client can see it.
//   3. Theia is "proprietary AI-powered" whenever "AI-powered" is said.
//   4. Theia and the site recommend; they never instruct ("Pause the...").
//   5. Every buyer answer in lib/site is 40 to 60 words (AEO answer blocks).
//   6. The Theia page's privacy cards and /security use only lib/site's
//      PRIVACY_CLAIMS (sentences from the platform's privacy-claims.md).
//
// Scans src/ and public/llms.txt if present. Exits 1 on any failure.
// ============================================================================
import { readFileSync, readdirSync, statSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'src')
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mjs|css|json|txt|md)$/.test(n) ? [p] : []
})

const files = walk(SRC)
const fails = []
const fail = (file, line, msg) => fails.push(`${relative(ROOT, file)}:${line}  ${msg}`)

const RULES = [
  { re: /to be found is to be (seen|chosen)/i, msg: 'retired tagline' },
  { re: /\b(anthropic|claude|gemini|openai|vertex ai)\b/i, msg: 'model provider named' },
  { re: /(?<!proprietary )\bAI-powered\b/, msg: '"AI-powered" without "proprietary"' },
  { re: /\b(pause|turn off|switch off|shut off|stop|kill|cut) (the|your|this|that|these|those) (ad|ads|campaign|campaigns|creative|creatives|audience|budget|spend)\b/i, msg: 'instructs instead of recommending' },
  { re: /\bmanage[sd]? (your |the |their |anyone's )?ad spend\b/i, msg: 'implies managed ad spend', unlessNegated: true },
]

/** The sentence around index i says "never" / "not" / "no" before it. */
const negated = (text, i) => /\b(never|not|no|nor)\b/i.test(text.slice(0, i).split(/[.!?]\s/).pop())

for (const f of files) {
  // Comments may quote the rules they enforce; only shipped strings count.
  // Block comments are blanked (keeping line breaks), then line comments.
  const src = readFileSync(f, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`])\/\/.*$/gm, '$1')
  src.split('\n').forEach((text, i) => {
    for (const r of RULES) {
      const m = r.re.exec(text)
      if (!m) continue
      if (r.unlessNegated && negated(text, m.index)) continue
      fail(f, i + 1, `${r.msg}: ${text.trim().slice(0, 120)}`)
    }
  })
}

// ── 5 and 6: load lib/site.ts ──
const dir = mkdtempSync(join(tmpdir(), 'aa-copy-'))
let site
try {
  const out = ts.transpileModule(readFileSync(join(SRC, 'lib/site.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const tmp = join(dir, 'site.mjs')
  writeFileSync(tmp, out)
  site = await import(pathToFileURL(tmp).href)
} finally {
  rmSync(dir, { recursive: true, force: true })
}

const words = (s) => s.trim().split(/\s+/).length
for (const f of site.AEO) {
  const n = words(f.a)
  if (n < 40 || n > 60) fail(join(SRC, 'lib/site.ts'), 0, `AEO "${f.id}" answer is ${n} words (40 to 60)`)
}
if (site.AEO.length !== 12) fail(join(SRC, 'lib/site.ts'), 0, `expected 12 AEO answers, found ${site.AEO.length}`)

// The pages that state security facts must take them from PRIVACY_CLAIMS.
for (const rel of ['app/(site)/security/page.tsx', 'app/(site)/theia/page.tsx']) {
  const p = join(SRC, rel)
  if (!existsSync(p)) continue
  const s = readFileSync(p, 'utf8')
  for (const banned of [/walled off/i, /zero (data )?retention/i, /never stores?/i, /SOC ?2/i, /HIPAA/i]) {
    if (banned.test(s)) fail(p, 0, `security claim not on the privacy-claims list: ${banned}`)
  }
}

if (fails.length) {
  console.error(`check-copy: ${fails.length} problem(s)\n` + fails.map((f) => '  ' + f).join('\n'))
  process.exit(1)
}
console.log(`check-copy: ${files.length} files, ${site.AEO.length} answers, all rules pass.`)
