import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow, ServiceIcons } from '@/components/icons'
import ServiceRouteLine from './ServiceRouteLine'
import { ChannelArt as ServiceArt } from '@/components/artifacts/ChannelArtifacts'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Eight ways Axia Atlas gets you found and chosen: Website Design & Build, Social Media Management, Competitive Intelligence, Local Presence & Maps, Answer Engine Optimization (AEO), Lead Generation, Executive Personal Brand, and Strategic Advisory & Embedded Thinking.'

export const metadata: Metadata = {
  title: 'SEO, AEO & Social Media Marketing Services',
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  ...social({ title: pageTitle('SEO, AEO & Social Media Marketing Services'), description: DESCRIPTION, path: '/services' }),
}

/* Website Design & Build leads: it is the core engagement and the one every
   other channel points traffic at. The remaining seven follow the same order
   as the home-page grid.

   WHAT THIS PASS TOOK OUT, and why the page is shorter than it was:

   1. THE "IN PRACTICE" CHIPS. Every one of the eight rows carried four or five
      pills restating, in two words each, things the paragraph above them had
      just said in full. Sixteen rows of chrome down the page, and the reader
      learns nothing from the second set that the first did not already teach
      them to skip.

   2. FIVE OF THE EIGHT ARTIFACTS. A structural sketch beside a service is
      worth having when the sketch shows a shape the prose cannot — a map pack
      with one pin lit, a citation line under an answer, the wireframe of a
      page. It is not worth having when it is three grey bars standing in for
      "we do this too", which is what the other five were. Three artifacts
      survive, on the three services whose shape is genuinely visual.

   The prose itself is untouched. "Too much text" was the note, but the
   descriptions are the substance of the page — the length came from the
   furniture around them, and that is what came off.

   `art: true` marks a row that earns a figure. Rows alternate which side the
   copy takes, so no two consecutive rows read alike; rows without a figure run
   as a single measured column. */
const SERVICES = [
  {
    id: 'website',
    art: true,
    headline: 'Website Design & Build',
    desc: "This is the core engagement, and it is not a design job. It starts with positioning — what you actually sell, who it is for, and why a buyer should pick you over the two alternatives they are also looking at. That decision drives the copy, and the copy drives the layout, so the pages argue a case instead of decorating one. Search foundations go in during the build rather than after it: an information architecture that matches how people search, titles and headings written for real queries, schema markup, clean internal linking, fast Core Web Vitals on a real phone, and a sitemap that gets indexed. We build it too — you get a working site, not a mockup handed to someone else to interpret.",
    who: 'For businesses whose site is the front door: a first build, a rebuild, or a site that photographs well and still does not sell.',
  },
  {
    id: 'social',
    art: false,
    headline: 'Social Media Management',
    desc: 'Each platform rewards something different — a hook inside the first second on TikTok, a defensible opinion on LinkedIn, a look you can recognise at thumbnail size on Instagram. We pick the two or three platforms worth your time and ignore the rest, set a handful of recurring content pillars so the account says one thing consistently instead of a new thing weekly, then produce, schedule, and publish it natively for each platform. We work the comments as well: answering the buying questions in public, and handling complaints so the thread ends up reading as evidence you are good to deal with.',
    who: 'For brands and businesses treating social as a growth channel rather than an obligation — B2B or B2C.',
  },
  {
    id: 'intel',
    art: false,
    headline: 'Competitive Intelligence',
    desc: 'You pick the competitors — usually five to ten who genuinely take deals off you. We watch what they do and report it with the receipts: pricing and packaging changes, the queries and pages they rank for that you do not, publishing cadence and which posts actually earned engagement, the roles they are hiring for, review volume and what the complaints are really about, and whether the answer engines name them in the moments they do not name you. Every claim is sourced and dated so you can check it yourself. The deliverable is not a dashboard nobody opens — it is arriving at each decision about price, positioning, or where to publish next already knowing what your buyer sees when they look at the alternatives.',
    who: 'For teams making positioning, pricing, or channel bets in a crowded category who are tired of guessing what the other side is doing.',
  },
  {
    id: 'local',
    art: true,
    /* Renamed from "Local Presence & SEO" to match the service catalogue. See
       the note on the home page's channel card. */
    headline: 'Local Presence & Maps',
    desc: 'Two results decide whether a nearby buyer finds you: the map pack, and the organic listings underneath it. We work both, because winning one and losing the other cedes half the page. On the local side that means a Google Business Profile built out properly — categories, services, hours, photos, Q&A — citations kept consistent across the directories that feed the map, a review programme that produces a steady flow rather than a spike, and public replies to the hard ones that show a prospect how you handle a problem. On the search side it is the service and location pages that rank for "service in city", the internal linking between them, and the technical fixes that stop good pages from being ignored. Rankings and calls are tracked per location, never averaged into one flattering number.',
    who: 'For clinics, trades, shops, restaurants, practices, and multi-location businesses that sell inside a radius.',
  },
  {
    id: 'geo',
    art: true,
    headline: 'Answer Engine Optimization (AEO)',
    desc: 'Buyers now ask Claude, ChatGPT, Perplexity, and Gemini which company to use, and they largely take the answer at face value. We start by measuring it: the exact prompts a buyer in your category would type, run across all four platforms, recorded so you can see who gets named today and what is said about you when you are. Then we fix what those systems read. Entity data and schema so the models know what you are and what you do. Source pages written to be quoted whole — a clear claim, the evidence under it, and a date — rather than skimmed. Presence on the third-party pages, directories, and communities the models fall back on when they will not take your own site at its word. We re-run the same prompt set every month, so you can see the point at which you start getting cited and exactly where you are still being left out.',
    who: 'For any business whose buyers ask an assistant before they ask a person — and for categories where going unnamed means going unconsidered.',
  },
  {
    id: 'leadgen',
    art: false,
    headline: 'Lead Generation',
    desc: 'Search and content compound; outbound produces conversations this quarter. We define the ideal customer tightly enough that it disqualifies — industry, size, the role that signs, and a trigger that makes contact worth making now — then build the list by hand instead of buying one, verify every address, and write sequences that reference something specific and true about the company rather than dropping a name into a template. Email and LinkedIn run together so the same person meets you twice. You see every prospect, every touch, and every reply, so the targeting and the message sharpen each cycle instead of being thrown out and restarted.',
    who: 'For B2B and service businesses that know who their best customers are and want conversations booked now.',
  },
  {
    id: 'executive',
    art: false,
    headline: 'Executive Personal Brand',
    desc: 'A company account gets read the way an ad gets read. A person gets read differently. We build the founder or executive a voice that stands on its own: a small set of positions they are genuinely willing to defend in public, drawn out of them in interviews rather than invented in a strategy doc, then written up as posts, longer essays, and talking points that sound like the person and not like a marketing department. Comments and DMs are triaged so the buyers hiding among them get a real reply from a real person. The account stays theirs — the archive, the audience, and the reputation belong to the individual and carry back into the company.',
    who: 'For founders, owners, and executives who are the face of the business, or intend to be.',
  },
  {
    id: 'strategy',
    art: false,
    headline: 'Strategic Advisory & Embedded Thinking',
    desc: 'Sometimes what is missing is not another deliverable. This is standing access to a strategist who already knows your business: recurring working sessions on the decisions that do not belong to any one channel — what to charge and how to package it, which segment to go after next, whether to build a capability or partner for it, what to say when a competitor undercuts you by thirty percent. We sit in on the calls where it actually gets decided, write up the decision and the reasoning behind it so it survives the week, and open the next session by checking what happened. No deck nobody reads.',
    who: 'For owners and teams who want a thinking partner across the whole business, not a vendor for one channel.',
  },
]

/* Machine-readable mirror of the eight services above, so answer engines and
   search engines read the same catalog a visitor does. Kept derived from
   SERVICES — the count can never drift out of sync with the page. */
const SITE_URL = 'https://axiaatlas.com'
const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/services#catalog`,
  name: `Axia Atlas services — ${SERVICES.length} ways to get found`,
  numberOfItems: SERVICES.length,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      '@id': `${SITE_URL}/services#${s.id}`,
      name: s.headline,
      description: s.desc,
      url: `${SITE_URL}/services#${s.id}`,
      serviceType: s.headline,
      provider: { '@id': `${SITE_URL}/#organization` },
      // Nationwide, matching the Organization node in app/layout.tsx and the
      // /contact answer. See the note there.
      areaServed: { '@type': 'Country', name: 'United States' },
    },
  })),
}

export default function ServicesPage() {
  /* Which side the copy takes. Counted across the rows that HAVE a figure, so
     the three figures alternate sides down the page rather than depending on
     where the text-only rows happen to fall. */
  let figureIndex = -1

  return (
    <div className="page services-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />
      <div className="services-hero">
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Eight Digital Marketing Services<br />That Work as One Plan</h1>
        <p className="section-sub">Start with one channel or build the full system. Either way, it begins with strategy — never random tactics.</p>
      </div>

      {/* A simple straight vertical line connects the services (ServiceRouteLine);
          it's positioned relative to this flow. */}
      <div className="services-flow">
        <ServiceRouteLine />
        <div className="services-route">
          {SERVICES.map((s) => {
            const Icon = ServiceIcons[s.id]
            const Art = s.art ? ServiceArt[s.id] : null
            if (Art) figureIndex += 1
            const flip = Art ? figureIndex % 2 === 1 : false

            return (
              <div
                key={s.id}
                id={s.id}
                className={`service-detail${Art ? ' has-art' : ' text-only'}${flip ? ' flip' : ''}`}
              >
                {/* SEO used to be its own section; keep the old deep link working. */}
                {s.id === 'local' && <span id="seo" aria-hidden="true" />}

                <div className="service-detail-inner">
                  {/* Two groups, always. On a row with a figure they simply
                      stack; on a row without one, `.sd-copy` becomes the
                      two-column grid itself and the mark and headline sit
                      opposite the prose. Grouping them in the markup is what
                      lets the headline stay level with its own icon instead of
                      being dragged down the page by the paragraph beside it. */}
                  <div className="sd-copy">
                    <div className="sd-head">
                      <div className="service-detail-label">
                        <span className="service-icon">{Icon && <Icon />}</span>
                      </div>
                      <h2 className="service-detail-headline">{s.headline}</h2>
                    </div>
                    <div className="sd-prose">
                      <p className="service-detail-desc">{s.desc}</p>
                      <p className="service-who">{s.who}</p>
                      <div>
                        <Link href="/demo" className="btn-primary">Get Started <Arrow className="arr" /></Link>
                      </div>
                    </div>
                  </div>

                  {Art && (
                    <div className="sd-aside">
                      <div className="sd-art"><Art /></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <CtaBand
          eyebrow="Not sure where to start?"
          headline="We'll tell you what to do first."
          sub="Book a demo. We audit how you show up before the call, then walk you through the two or three channels that will pay off fastest."
        />
      </div>

      <Footer />
    </div>
  )
}
