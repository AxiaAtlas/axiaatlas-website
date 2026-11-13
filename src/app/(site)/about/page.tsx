import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow } from '@/components/icons'
import { pageTitle, social } from '@/lib/seo'
import { PATHS, TAGLINE, TAGLINE_2 } from '@/lib/site'

const NAME = 'About Axia Atlas, Investment Campaign Analytics'
const DESCRIPTION =
  'Axia Atlas builds investment campaign analytics software for companies raising capital and the agencies behind them, with Theia built in. Everything in sight.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.about },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.about }),
}

const BELIEFS = [
  { n: '01', title: 'Present, analyze, recommend', desc: 'We show you what happened, explain why, and say what we recommend. We never buy media or run your ads, and the decision is always yours.' },
  { n: '02', title: 'Every dollar counts', desc: 'A raise is paid for by every channel, including the ones no platform reports. If it was spent on the raise, it belongs in the ledger.' },
  { n: '03', title: 'Private by default', desc: 'Names and figures are masked before any analysis, and our analysis provider does not train its models on your data.' },
]

export default function AboutPage() {
  return (
    <div className="page">
      <div data-aa-section="about.hero" className="about-hero">
        <div className="about-hero-text">
          <div className="section-eyebrow">About</div>
          <h1 className="section-headline">About Axia Atlas, the Company Behind the Platform and Theia</h1>
          <p className="section-sub">Axia Atlas is a software company. We build investment campaign analytics for companies raising capital and the marketing agencies that support them, with Theia, our proprietary AI-powered analysis assistant, built in. We also design websites as one-off projects. Headquartered in Miami, working with clients across the US.</p>
        </div>
      </div>

      <div data-aa-section="about.why" className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">Why we built it</h2>
          <div className="about-body">
            <p>Companies raising capital spend heavily on campaigns: prospecting and retargeting ads on every platform, affiliate partners, newspaper placements, press. Their raise platform shows the investments coming in. Nothing showed the spend and the investments together.</p>
            <p>So most issuers learned what worked only after the budget was gone. Agencies running those campaigns rebuilt the same spreadsheet every week to answer one question: what did each channel actually return?</p>
            <p>Axia Atlas answers it while the raise is still running. Live Campaigns shows every platform in one place. Raise Ledger sets every dollar against the investments reported. Theia explains what changed and builds the investor report.</p>
          </div>
        </div>
      </div>

      <div data-aa-section="about.taglines" className="about-section">
        <div className="about-inner about-seen">
          <h2 className="about-headline">{TAGLINE}. {TAGLINE_2}.</h2>
          <div className="about-body">
            <p>Everything in sight is the promise: every platform, every channel and every investment in one view, with nothing left in an invoice or a spreadsheet. Growth, engineered is how we keep it: measured, explained, and recommended, never guessed.</p>
          </div>
          <div className="beliefs-grid">
            {BELIEFS.map((b) => (
              <div key={b.n} className="belief-card spotlight">
                <div className="belief-num">{b.n}</div>
                <h3 className="belief-title">{b.title}</h3>
                <p className="belief-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-aa-section="about.working" className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">People, not only software</h2>
          <div className="about-body">
            <p>Theia gives you fast answers between meetings. Our analysts are still there whenever you want a person, for the questions that deserve a second pair of eyes.</p>
            <p>Every plan starts with a demo on a demo raise, then setup of your own channels. You get one dashboard, one ledger, and a report that builds itself.</p>
          </div>
          <div className="sv-hero-actions" style={{ marginTop: 36 }}>
            <Link href={PATHS.demo} className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
            <Link href="/careers" className="btn-outline">Careers</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
