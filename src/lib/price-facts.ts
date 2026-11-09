/* ════════════════════════════════════════════════════════════════════════════
   PRICE SENTENCES, SHARED BY THE CHAT WIDGET AND THE /contact FAQ

   Both answer "how much does it cost?" in prose. Writing the sentence twice is
   how the two drift, so they are written once here, from lib/pricing, and no
   figure is typed.
   ════════════════════════════════════════════════════════════════════════════ */
import { addOn, money, monthsWord, paymentPlan, pricingFor, range } from './pricing'
import { serviceName } from './services'

const [WEB_LO, WEB_HI] = range('website', 'oneTime')
const [SOCIAL_LO, SOCIAL_HI] = range('social', 'monthly')
const WEB_PLAN = paymentPlan('website', WEB_LO)
const CARE = addOn('website', 'care_plan')
const SOCIAL_TERM = pricingFor('social').minTermMonths

/** "$250, $400 or $650" */
const careLadder = (CARE.tierPrices ?? [CARE.price]).map(money)
const CARE_LADDER =
  careLadder.length < 2 ? careLadder.join('') : `${careLadder.slice(0, -1).join(', ')} or ${careLadder[careLadder.length - 1]}`

/** Website build fees and how they can be paid. */
export const WEBSITE_PRICE =
  `${serviceName('website')} is a one-time build from ${money(WEB_LO)} to ${money(WEB_HI)}, depending on the tier.` +
  (WEB_PLAN
    ? ` You can pay it once, or spread it over ${monthsWord(WEB_PLAN.months)} months for the same total. It is not financed: no interest and no fee.`
    : '')

/** The care plan, with its term and who it is for. */
export const CARE_PRICE =
  `After launch, an optional care plan keeps the site updated and checked for ${CARE_LADDER} a month, matched to the build tier` +
  (CARE.minTermMonths ? `, with a ${monthsWord(CARE.minTermMonths)}-month minimum` : '') +
  '. It covers only sites Axia Atlas built.'

/** Social Media Management's monthly range and term. */
export const SOCIAL_PRICE =
  `${serviceName('social')} runs from ${money(SOCIAL_LO)} to ${money(SOCIAL_HI)} a month` +
  (SOCIAL_TERM ? `, with a ${monthsWord(SOCIAL_TERM)}-month minimum.` : '.')

/** Add-ons, in one sentence. */
export const ADDONS_PRICE =
  'Everything else (SEO and answer engines, local search, lead generation, executive brand, competitor research, advisory and custom dashboards) is an add-on with its own published tiers.'
