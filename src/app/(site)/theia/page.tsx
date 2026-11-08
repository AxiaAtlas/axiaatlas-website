import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { PageHero, SectionHead, JsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { THEIA_LAUNCH } from '@/lib/flags'
import { PORTAL_PATH, THEIA_PATH } from '@/lib/services'

/* ── THEIA BY AXIA ATLAS (Theia launch) ──────────────────────────────────────
   404 until NEXT_PUBLIC_THEIA_LAUNCH is "true". Theia is Axia's proprietary
   assistant inside the client portal. She helps clients understand their data
   and build their own reports, decks and plans from it. She never creates the
   client's work, and the page never says she does. theia.axiaatlas.com is not
   linked until it is live. */

const TITLE = 'Theia, the Assistant in Your Client Portal'
const H1 = 'Meet Theia by Axia Atlas, the Assistant in Your Portal'

const ANSWER =
  'Theia by Axia Atlas is our proprietary assistant, built into your client portal. Ask her about your results in plain English ' +
  'and she answers from your own data. She helps you turn that data into your own reports, slide decks and plans. ' +
  'She lives only in your portal and knows only your business.'

const DESCRIPTION = 'Theia by Axia Atlas is the assistant inside your client portal: ask about your results and build your own reports, decks and plans from your data.'

export const metadata: Metadata = THEIA_LAUNCH
  ? { title: TITLE, description: DESCRIPTION, alternates: { canonical: THEIA_PATH }, ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: THEIA_PATH }) }
  : { robots: { index: false, follow: false } }

const ASKS = [
  'Which pages brought in the most enquiries last month?',
  'Where are we cited by answer engines, and where are we missing?',
  'How did the ads we ran in October perform against September?',
  'What changed in our rankings since the last report?',
]

const BUILDS = [
  { title: 'Reports', desc: 'Pull the figures you care about into a report of your own, in your words, for your team or your board.' },
  { title: 'Slide decks', desc: 'Turn a quarter of results into a deck you can present, built from your own numbers.' },
  { title: 'Spreadsheets and charts', desc: 'Get the underlying figures as a sheet or a chart when you want to work with them yourself.' },
  { title: 'Plans', desc: 'Think through what to do next with your data in front of you, and keep the plan you land on.' },
]

export default function TheiaPage() {
  if (!THEIA_LAUNCH) notFound()
  return (
    <div className="page sv-page">
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${SITE_URL}${THEIA_PATH}`,
        name: pageTitle(TITLE), description: ANSWER, url: `${SITE_URL}${THEIA_PATH}`,
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />

      <PageHero section="theia.hero" eyebrow="Theia by Axia Atlas" title={H1} answer={ANSWER}>
        <Link href={PORTAL_PATH} className="btn-outline">About the portal</Link>
      </PageHero>

      <section data-aa-section="theia.asks" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Ask" title="Ask About Your Results in Plain English" lede="Theia answers from your own data, and only your own data." />
          <ul className="sv-asks">
            {ASKS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section data-aa-section="theia.builds" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Build" title="Build Your Own Reports, Decks and Plans" lede="Theia helps you shape your data into something you can use. What you build is yours." />
          <div className="sv-cards sv-cards-4">
            {BUILDS.map((b) => (
              <div key={b.title} className="sv-card sv-card-static">
                <h3 className="sv-card-name">{b.title}</h3>
                <p className="sv-card-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="theia.privacy" className="sv-section g-spruce">
        <div className="section-inner sv-note">
          <SectionHead
            eyebrow="Private by design"
            title="One Theia per Client, Inside Your Portal Only"
            lede="Your Theia knows only your business. She never appears on your website, and no other client's Theia can see your data."
          />
        </div>
      </section>

      <CtaBand headline="Meet Theia on a demo." sub="Book a demo. We audit how you show up before the call, then show you Theia working with results like yours." />
      <p className="sv-attribution">Theia by Axia Atlas</p>
      <Footer />
    </div>
  )
}
