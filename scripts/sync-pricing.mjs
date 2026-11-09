#!/usr/bin/env node
// ============================================================================
// SYNC: THE PUBLIC PRICE LIST, READ OUT OF THE PLATFORM.
//
// The platform's src/lib/pricing.ts is the source of truth for every service,
// tier and price. This repo cannot import it (it lives in another repo, behind
// the portal), so this script runs it and writes the public half of it to
// src/lib/pricing-catalog.json. Nothing in that file is typed by hand.
//
// WHAT IS COPIED: service keys, kind, the channel flag, per-person pricing,
// minimum terms, the payment plan, the outward "who it is for" sentence, each
// add-on's label, prices, term and note, and for each tier its label, monthly price, one-time fee,
// capped hours and overage rate, meeting and reporting cadence, and its
// public feature lines. Costs, margins, deliverable mixes and add-on costs
// stay in the platform: they are not public.
//
// Usage:
//   npm run sync:pricing            write src/lib/pricing-catalog.json
//   npm run sync:pricing -- --check fail if the committed file is stale
//
// The platform repo is read from PLATFORM_DIR, or ../axiaatlas-platform beside
// this checkout's parent (~/Developer/axiaatlas-platform). With --check and no
// platform checkout (Vercel, CI) the script says so and exits 0: the committed
// JSON is what ships, and it can only be refreshed where the platform exists.
// ============================================================================
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')
const OUT = join(ROOT, 'src/lib/pricing-catalog.json')
const CHECK = process.argv.includes('--check')

const candidates = [
  process.env.PLATFORM_DIR,
  resolve(ROOT, '../axiaatlas-platform'),
  resolve(process.env.HOME || '', 'Developer/axiaatlas-platform'),
].filter(Boolean)
const PLATFORM = candidates.find((d) => existsSync(join(d, 'src/lib/pricing.ts')))

if (!PLATFORM) {
  const msg = 'sync-pricing: no platform checkout found (set PLATFORM_DIR).'
  if (CHECK) { console.log(`${msg} Skipping the freshness check.`); process.exit(0) }
  console.error(msg); process.exit(1)
}

const require = createRequire(join(PLATFORM, 'package.json'))
const esbuild = require('esbuild')

const dir = mkdtempSync(join(tmpdir(), 'aa-pricing-'))
const outfile = join(dir, 'pricing.mjs')
try {
  await esbuild.build({
    entryPoints: [join(PLATFORM, 'src/lib/pricing.ts')],
    bundle: true, platform: 'node', format: 'esm', outfile, logLevel: 'error',
    alias: { '@': join(PLATFORM, 'src') },
  })
  const P = await import(pathToFileURL(outfile).href)
  const model = P.DEFAULT_PRICING_MODEL

  // Copy goes on a public page, which holds no em dashes (scripts/check-no-em-dash.mjs).
  const text = (s) => (typeof s === 'string' ? s.replace(/\s*—\s*/g, ', ').trim() : undefined)

  const services = model.services.map((s) => ({
    key: s.key,
    kind: s.kind,
    channel: P.channelService(s),
    priced: !P.isUnpriced(s),
    perPerson: P.pricedPerPerson(s),
    minTermMonths: s.minTermMonths ?? null,
    paymentPlanMonths: s.paymentPlanMonths ?? null,
    audience: text(P.defaultServiceFor(s.key)?.audience) ?? null,
    addOns: (s.addOns || []).map((a) => ({
      key: a.key,
      label: text(a.label),
      price: a.price || 0,
      tierPrices: a.tierPrices?.length ? a.tierPrices : null,
      oneTime: !!a.oneTime,
      included: !!a.included,
      setupPrice: a.setupPrice || null,
      minTermMonths: a.minTermMonths ?? null,
      note: text(a.note) ?? null,
    })),
    tiers: s.tiers.map((t) => ({
      level: t.level,
      label: text(t.label),
      monthly: t.price || 0,
      oneTime: t.setup || 0,
      cappedHours: t.cappedHours ?? null,
      overageRate: t.overageRate ?? null,
      meetingCadence: text(t.meetingCadence) ?? null,
      reportingCadence: text(t.reportingCadence) ?? null,
      features: (t.features || []).map(text),
    })),
  }))

  const json = JSON.stringify({
    source: 'axiaatlas-platform/src/lib/pricing.ts',
    costModelVersion: P.COST_MODEL_VERSION,
    currency: 'USD',
    services,
  }, null, 2) + '\n'

  if (CHECK) {
    const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : ''
    if (current !== json) {
      console.error('sync-pricing: src/lib/pricing-catalog.json is out of date with the platform. Run `npm run sync:pricing`.')
      process.exit(1)
    }
    console.log(`sync-pricing: up to date (${services.length} services, cost model v${P.COST_MODEL_VERSION}).`)
  } else {
    writeFileSync(OUT, json)
    console.log(`sync-pricing: wrote ${services.length} services from ${PLATFORM} (cost model v${P.COST_MODEL_VERSION}).`)
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
