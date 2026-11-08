/* ════════════════════════════════════════════════════════════════════════════
   PRICES, READ FROM THE PLATFORM

   Every figure on this site comes from pricing-catalog.json, which
   scripts/sync-pricing.mjs writes by running the platform's
   src/lib/pricing.ts. No price is typed in this repo. When the platform
   reprices, run `npm run sync:pricing` and commit the JSON.

   Names come from lib/services (the site's mirror of the catalogue names), and
   prices from here. The two are joined on the platform's pricing key.
   ════════════════════════════════════════════════════════════════════════════ */
import catalog from './pricing-catalog.json'
import { SERVICES, type ServiceEntry, type ServiceId } from './services'

export type PricedTier = {
  level: number
  label: string
  monthly: number
  oneTime: number
  cappedHours: number | null
  overageRate: number | null
  meetingCadence: string | null
  reportingCadence: string | null
  features: string[]
}

export type PricedAddOn = {
  key: string
  label: string
  /** Flat price, or the fallback when tierPrices is unset. */
  price: number
  /** [Tier 1, Tier 2, Tier 3] when the add-on is priced by the service's tier. */
  tierPrices: number[] | null
  oneTime: boolean
  /** Included with the service at no charge. */
  included: boolean
  /** A one-time build charged alongside a recurring add-on. */
  setupPrice: number | null
  minTermMonths: number | null
  /** The one condition a buyer must know, in the platform's words. */
  note: string | null
}

export type PricedService = {
  key: string
  kind: 'recurring' | 'project' | 'advisory'
  channel: boolean
  priced: boolean
  perPerson: boolean
  minTermMonths: number | null
  /** A one-time fee may be paid over this many months, same total. */
  paymentPlanMonths: number | null
  /** The platform's outward sentence on who the service is for. */
  audience: string | null
  tiers: PricedTier[]
  addOns: PricedAddOn[]
}

export const CURRENCY = catalog.currency

const BY_KEY = new Map((catalog.services as PricedService[]).map((s) => [s.key, s]))

/** The price ladder for one service. Throws at build time if the platform
    dropped the key, so a missing price cannot ship as a blank card. */
export function pricingFor(id: ServiceId): PricedService {
  const entry = SERVICES.find((s) => s.id === id)
  const svc = entry && BY_KEY.get(entry.key)
  if (!svc) throw new Error(`No platform price for service: ${id}`)
  return svc
}

/** Every service with its prices, in the catalogue's order. */
export const PRICED_SERVICES: (ServiceEntry & { pricing: PricedService })[] =
  SERVICES.map((s) => ({ ...s, pricing: pricingFor(s.id) }))

export const money = (n: number) => `$${n.toLocaleString('en-US')}`

const perMonth = (svc: PricedService) => (svc.perPerson ? '/mo per person' : '/mo')

/** How one tier reads on a card: the headline figure, its unit, and a second
    figure when the tier has both a monthly and a one-time fee. */
export function tierPrice(svc: PricedService, t: PricedTier): { amount: string; unit: string; extra?: string } {
  if (t.monthly && t.oneTime) return { amount: money(t.monthly), unit: perMonth(svc), extra: `plus ${money(t.oneTime)} build` }
  if (t.oneTime) return { amount: money(t.oneTime), unit: 'one-time' }
  return { amount: money(t.monthly), unit: perMonth(svc) }
}

/** The entry price, e.g. "From $1,500/mo" or "From $3,500 one-time". */
export function fromPrice(id: ServiceId): string {
  const svc = pricingFor(id)
  const p = tierPrice(svc, svc.tiers[0])
  return `From ${p.amount}${p.unit.startsWith('/') ? p.unit : ` ${p.unit}`}${p.extra ? ` ${p.extra}` : ''}`
}

/** Lowest and highest tier figure for a service, on one field. */
export function range(id: ServiceId, field: 'monthly' | 'oneTime'): [number, number] {
  const vals = pricingFor(id).tiers.map((t) => t[field]).filter((n) => n > 0)
  return [Math.min(...vals), Math.max(...vals)]
}

/** Lowest and highest monthly figure across every monthly-only service. */
export function monthlyRange(): [number, number] {
  const vals = PRICED_SERVICES
    .filter((s) => s.pricing.kind !== 'project' && s.pricing.tiers.every((t) => !t.oneTime))
    .flatMap((s) => s.pricing.tiers.map((t) => t.monthly))
  return [Math.min(...vals), Math.max(...vals)]
}

/** The service's term, in words. */
export function termLabel(svc: PricedService): string {
  if (svc.kind === 'project') return 'One-time build'
  if (svc.minTermMonths) return `${svc.minTermMonths}-month minimum term`
  return 'Month to month'
}

/** The plain-English lines under a tier's price. Only what the platform says. */
export function tierNotes(t: PricedTier): string[] {
  const notes: string[] = []
  if (t.cappedHours) notes.push(`Up to ${t.cappedHours} hours a month`)
  if (t.overageRate) notes.push(`${money(t.overageRate)} an hour beyond that`)
  if (t.meetingCadence) notes.push(`Meetings: ${t.meetingCadence}`)
  if (t.reportingCadence) notes.push(`Reports: ${t.reportingCadence}`)
  notes.push(...t.features)
  return notes
}

/** Services with a minimum term, as [id, months]. */
export function minimumTerms(): [ServiceId, number][] {
  return PRICED_SERVICES.filter((s) => s.pricing.minTermMonths).map((s) => [s.id, s.pricing.minTermMonths as number])
}

/* ── ADD-ONS ─────────────────────────────────────────────────────────────── */

/** Add-ons a buyer can be quoted. The offboarding handover is how an
    engagement ends, not something sold up front, so it is left off. */
export function addOnsFor(id: ServiceId): PricedAddOn[] {
  return pricingFor(id).addOns.filter((a) => a.key !== 'handover')
}

/** One add-on by key. Throws at build time if the platform dropped it. */
export function addOn(id: ServiceId, key: string): PricedAddOn {
  const a = pricingFor(id).addOns.find((x) => x.key === key)
  if (!a) throw new Error(`No platform add-on ${key} on ${id}`)
  return a
}

/** How an add-on's price reads, e.g. "$350 one-time", "$250 to $650 a month". */
export function addOnPrice(a: PricedAddOn): string {
  if (a.included) return 'Included'
  const unit = a.oneTime ? ' one-time' : ' a month'
  if (a.tierPrices) {
    const lo = Math.min(...a.tierPrices), hi = Math.max(...a.tierPrices)
    return lo === hi ? `${money(lo)}${unit}` : `${money(lo)} to ${money(hi)}${unit}`
  }
  if (!a.oneTime && a.setupPrice) return `${money(a.price)} a month plus ${money(a.setupPrice)} to build`
  return `${money(a.price)}${unit}`
}

/* ── THE BUILD PAYMENT PLAN ──────────────────────────────────────────────── */

/** A one-time fee spread over the platform's plan months: the same total,
    not financed. Returns null when the service has no plan. */
export function paymentPlan(id: ServiceId, total: number): { months: number; monthly: string } | null {
  const months = pricingFor(id).paymentPlanMonths
  if (!months) return null
  const monthly = total / months
  const str = Number.isInteger(monthly)
    ? money(monthly)
    : `$${monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return { months, monthly: str }
}

/** "six", for a sentence. Falls back to the numeral. */
export const monthsWord = (n: number) =>
  (['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n] ?? String(n))
