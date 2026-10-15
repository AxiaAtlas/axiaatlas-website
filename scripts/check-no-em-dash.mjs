#!/usr/bin/env node
// ============================================================================
// CHECK: NO EM DASH IN UI COPY.
//
// THE DEFECT THIS EXISTS FOR
// --------------------------
// The marketing site was swept for em dashes by hand, and three days later
// they were back. A rule held only by a one-off sweep lasts until the next
// string is written. This is the portal's check (axiaatlas-platform,
// scripts/check-no-em-dash.mjs) carried over so the site holds the same line.
//
// WHAT IT SCANS
// -------------
// STRING LITERALS, TEMPLATE PARTS AND JSX TEXT, through the TypeScript parser.
// Comments are not copy and are left alone.
//
//   every .tsx and .ts under src/      pages, components, metadata, emails
//
// Unlike the portal there are no model prompts or parsers here, so every .ts
// is in scope: seo.ts titles and the careers confirmation email are copy too.
//
// NOT SEEN: copy that lives in Supabase rows (case studies, blog posts). The
// build cannot read the database; those are fixed by migration.
//
// EXEMPT: a string that is ONLY the dash (and whitespace). That is the
// empty-value glyph in a table cell, not punctuation.
//
// CEILINGS: files that still held dashes when this was written, with the
// count they held then. They may go down, never up; lower the number (or drop
// the entry) once the file is cleaned. A file not listed has a ceiling of 0.
//
// Run: npm run check:em-dash   (also runs on prebuild)
// ============================================================================
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve, relative } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = resolve(import.meta.dirname, '..')
const require = createRequire(import.meta.url)
const ts = require('typescript')

const DASH = '—'

const CEILINGS = {
  'src/app/(site)/about/page.tsx': 8,
  'src/app/(site)/careers/page.tsx': 6,
  'src/app/(site)/contact/page.tsx': 14,
  'src/app/(site)/page.tsx': 10,
  'src/app/(site)/pricing/page.tsx': 5,
  'src/app/(site)/privacy/page.tsx': 2,
  'src/app/(site)/services/page.tsx': 11,
  'src/app/(site)/terms/page.tsx': 2,
  'src/app/api/careers/route.ts': 2,
  'src/app/api/demo/route.ts': 3,
  'src/app/layout.tsx': 1,
  'src/app/links/page.tsx': 2,
  'src/lib/seo.ts': 1,
}

const TEXT_KINDS = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.JsxText,
])

/** Every copy string in `src` carrying an em dash, as { line, text }. */
function findDashes(name, src) {
  const kind = name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sf = ts.createSourceFile(name, src, ts.ScriptTarget.Latest, true, kind)
  const hits = []
  const visit = (n) => {
    if (TEXT_KINDS.has(n.kind)) {
      const text = n.kind === ts.SyntaxKind.JsxText ? n.getText(sf) : n.text
      if (text.includes(DASH) && text.replace(/[\s—]/g, '') !== '') {
        hits.push({ line: sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1, text })
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return hits
}

let failures = 0
const fail = (m) => { failures++; console.log(`  FAIL  ${m}`) }

// ── the detector proves itself first ────────────────────────────────────────
const FIXTURE = [
  `// a comment — not copy`,
  `const a = 'plain'`,
  `const glyph = '${DASH}'`,
  `const b = 'one ${DASH} two'`,
  `const c = \`x \${a} ${DASH} y\``,
  `const d = <p>Text ${DASH} here</p>`,
].join('\n')
const selfHits = findDashes('fixture.tsx', FIXTURE).map(h => h.line)
if (JSON.stringify(selfHits) !== JSON.stringify([4, 5, 6])) {
  fail(`detector self-test: expected lines [4,5,6], got ${JSON.stringify(selfHits)}`)
}

// ── the files ───────────────────────────────────────────────────────────────
const files = []
const walk = (dir) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.tsx?$/.test(p) && !p.endsWith('.d.ts')) files.push(relative(ROOT, p))
  }
}
walk(join(ROOT, 'src'))
for (const f of Object.keys(CEILINGS)) {
  if (!existsSync(join(ROOT, f))) fail(`${f} has a ceiling but does not exist; drop the entry`)
}

let clean = 0
for (const f of files) {
  const hits = findDashes(f, readFileSync(join(ROOT, f), 'utf8'))
  const ceiling = CEILINGS[f] ?? 0
  if (hits.length > ceiling) {
    fail(`${f}: ${hits.length} em dash${hits.length === 1 ? '' : 'es'} in copy${ceiling ? ` (ceiling ${ceiling})` : ''}`)
    for (const h of hits.slice(0, 8)) console.log(`        ${f}:${h.line}  ${JSON.stringify(h.text.trim()).slice(0, 110)}`)
  } else clean++
}

if (failures) {
  console.log(`\ncheck-no-em-dash: ${failures} failure(s). Use a colon, a comma, parentheses or a new sentence instead.`)
  process.exit(1)
}
console.log(`check-no-em-dash: ok (${clean} files, detector self-test passed)`)
