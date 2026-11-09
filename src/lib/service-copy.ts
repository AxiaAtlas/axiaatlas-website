/* ════════════════════════════════════════════════════════════════════════════
   WHAT EACH SERVICE IS, IN THE SITE'S OWN WORDS

   The long-form argument for each add-on, moved here from the old /services
   rows so /services/add-ons, the hub and the chat widget read one copy. Names
   come from lib/services and prices from lib/pricing; neither is typed here.
   ════════════════════════════════════════════════════════════════════════════ */
import type { ServiceId } from './services'

type AddonId = Exclude<ServiceId, 'website' | 'social'>

export const ADDON_COPY: Record<AddonId, { desc: string; who: string }> = {
  geo: {
    desc: 'Buyers now ask ChatGPT, Perplexity, Gemini and Google which company to use, and they largely take the answer at face value. We start by measuring it: the exact prompts a buyer in your category would type, run across each of them, recorded so you can see who gets named today and what is said about you when you are. Then we fix what those systems read. Entity data and schema so the models know what you are and what you do. Source pages written to be quoted whole (a clear claim, the evidence under it, and a date) rather than skimmed. Presence on the third-party pages, directories, and communities the models fall back on when they will not take your own site at its word. We re-run the same prompt set every month, so you can see the point at which you start getting cited and exactly where you are still being left out.',
    who: 'For any business whose buyers ask an assistant before they ask a person, and for categories where going unnamed means going unconsidered.',
  },
  local: {
    desc: 'Two results decide whether a nearby buyer finds you: the map pack, and the organic listings underneath it. We work both, because winning one and losing the other cedes half the page. On the local side that means a Google Business Profile built out properly (categories, services, hours, photos, Q&A), citations kept consistent across the directories that feed the map, a review programme that produces a steady flow rather than a spike, and public replies to the hard ones that show a prospect how you handle a problem. On the search side it is the service and location pages that rank for "service in city", the internal linking between them, and the technical fixes that stop good pages from being ignored. Rankings and calls are tracked per location, never averaged into one flattering number.',
    who: 'For clinics, trades, shops, restaurants, practices, and multi-location businesses that sell inside a radius.',
  },
  leadgen: {
    desc: 'Search and content compound; outbound produces conversations this quarter. We define the ideal customer tightly enough that it disqualifies: industry, size, the role that signs, and a trigger that makes contact worth making now. Then build the list by hand instead of buying one, verify every address, and write sequences that reference something specific and true about the company rather than dropping a name into a template. Email and LinkedIn run together so the same person meets you twice. You see every prospect, every touch, and every reply, so the targeting and the message sharpen each cycle instead of being thrown out and restarted.',
    who: 'For B2B and service businesses that know who their best customers are and want conversations booked now.',
  },
  executive: {
    desc: 'A company account gets read the way an ad gets read. A person gets read differently. We build the founder or executive a voice that stands on its own: a small set of positions they are genuinely willing to defend in public, drawn out of them in interviews rather than invented in a strategy doc, then written up as posts, longer essays, and talking points that sound like the person and not like a marketing department. Comments and DMs are triaged so the buyers hiding among them get a real reply from a real person. The account stays theirs: the archive, the audience, and the reputation belong to the individual and carry back into the company.',
    who: 'For founders, owners, and executives who are the face of the business, or intend to be.',
  },
  intel: {
    desc: 'You pick the competitors, usually five to ten who genuinely take deals off you. We watch what they do and report it with the receipts: pricing and packaging changes, the queries and pages they rank for that you do not, publishing cadence and which posts actually earned engagement, the roles they are hiring for, review volume and what the complaints are really about, and whether the answer engines name them in the moments they do not name you. Every claim is sourced and dated so you can check it yourself. The deliverable is not a dashboard nobody opens. It is arriving at each decision about price, positioning, or where to publish next already knowing what your buyer sees when they look at the alternatives.',
    who: 'For teams making positioning, pricing, or channel bets in a crowded category who are tired of guessing what the other side is doing.',
  },
  strategy: {
    desc: 'Sometimes what is missing is not another deliverable. This is standing access to a strategist who already knows your business: recurring working sessions on the decisions that do not belong to any one channel: what to charge and how to package it, which segment to go after next, whether to build a capability or partner for it, what to say when a competitor undercuts you by thirty percent. We sit in on the calls where it actually gets decided, write up the decision and the reasoning behind it so it survives the week, and open the next session by checking what happened. No deck nobody reads.',
    who: 'For owners and teams who want a thinking partner across the whole business, not a vendor for one channel.',
  },
  dashboards: {
    desc: 'Most businesses run on decentralized systems that each answer half a question. Stock sits in one place, orders in another, the pipeline in a third, and somebody exports all three into a spreadsheet on Monday morning to work out how last week went. We build the thing that ends that: an operational dashboard for your business, not a template you are fitted into. The views are the ones you actually run on, defined with you. We do not replace your tools. We connect to them, keep the mapping right as those systems change underneath, and put the result behind your own login, in your branding, on your own subdomain. Your data sits in a database project of its own, separate from ours, with no route between your operation and our agency systems. This is not the client portal you already get for the marketing work. It is software built for the business itself.',
    who: 'For businesses whose operating numbers are spread across a store admin, a CRM, and a spreadsheet, and who want one place that reads from all three and stays right as they change.',
  },
}

/* One line per add-on, for cards and the footer of a headline page. */
export const ADDON_BLURB: Record<AddonId, string> = {
  geo: 'Rank in Google and get named by the answer engines buyers now ask, with monthly proof of where you are cited and where you are not.',
  local: 'Profile, citations and reviews managed so nearby buyers find you first, not the business down the road.',
  leadgen: 'Prospects researched against your ideal customer and reached with outreach written for them.',
  executive: "A leader's own voice, built separately from the company's and published on a steady cadence.",
  intel: "Your competitors' pricing, rankings, content and reviews, tracked and sourced, so you decide on facts.",
  strategy: 'Standing access to a strategist who knows your business, for decisions that cross every channel.',
  dashboards: 'A custom dashboard for your own operation, such as stock, orders, pipeline or the ads you run, read from the systems you already use.',
}

/* What each website and social add-on is. Keyed by the platform's add-on key;
   the name and price still come from the platform. `label` overrides a
   platform label written for an internal reader. */
export const SERVICE_ADDON_COPY: Record<string, { label?: string; what: string }> = {
  extra_page: { what: 'One more page, written and designed to match the rest of the site.' },
  ecommerce: { label: 'E-commerce on a Starter Site', what: 'An online shop added to a Starter Site. Growth and Authority Sites include one.' },
  chatbot: { what: 'A chat assistant on your site that answers visitor questions from your own pages and hands new leads to your contacts.' },
  care_plan: { what: 'Monthly upkeep of the site we built for you.' },
  crm_contacts: { what: 'Every form and chat enquiry from your site lands in your own contact list.' },
  email_broadcasts: { what: 'Newsletters and announcements sent to the contacts your site collects, priced by your site tier.' },
  channel_setup: { label: 'Channel setup from scratch', what: 'New social accounts and a Google Business Profile, created and branded before the first post goes out.' },
  reel_pack: { what: 'Four more short videos a month on top of your plan.' },
  extra_platform: { what: 'One more platform managed alongside the ones in your plan.' },
}

/* What the website care plan covers. Mirrors the platform's web_care line. */
export const CARE_PLAN_COVERS = [
  'Platform and plugin updates',
  'Uptime and form checks',
  'Backups, verified',
  'Small content edits',
  'A short monthly note on what changed',
]
