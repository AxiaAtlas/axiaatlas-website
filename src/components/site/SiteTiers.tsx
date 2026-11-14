/* Website projects: the three tiers from the platform's pricing.ts, their
   add-ons, and how a project runs. Used on /pricing and /website-design.
   No prices: the website never shows one (see lib/plans). */
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import { SITE_ADDONS, SITE_TIERS } from '@/lib/plans'
import { PATHS } from '@/lib/site'

export const SITE_STEPS = [
  { n: '01', t: 'Positioning', d: 'What the site has to say, to whom, and what a visitor should do next. Agreed before anything is designed.' },
  { n: '02', t: 'Copy', d: 'Every page written in plain English, built around the questions your visitors actually ask.' },
  { n: '03', t: 'Design', d: 'A design in your brand, for desktop and phone, reviewed with you page by page.' },
  { n: '04', t: 'Build and launch', d: 'Fast pages, search foundations and structured data in place on launch day. Then the site is yours.' },
]

export function SiteTierCards() {
  return (
    <>
      <ol className="tiers">
        {SITE_TIERS.map((t, i) => (
          <li key={t.name} className={`tier card rv${i === 1 ? ' plan-card-on' : ''}`} style={{ ['--d' as string]: `${i * 90}ms` }}>
            <span className="label">Website project</span>
            <h3 className="h3 tier-name">{t.name}</h3>
            <p className="plan-for">{t.for}</p>
            <ul>
              <li>Up to {t.pages} pages, designed and built</li>
              <li>Copy written for every page</li>
              <li>{t.revisions} rounds of revisions</li>
              <li>{t.shop ? 'An online shop included' : 'An online shop available as an add-on'}</li>
              <li>Search foundations and structured data</li>
            </ul>
            <Link href={PATHS.demo} className={`btn ${i === 1 ? 'btn-ink' : 'btn-quiet'}`}>Start a project <Arrow className="arr" /></Link>
          </li>
        ))}
      </ol>
    </>
  )
}

export function SiteAddons() {
  return (
    <ul className="addons rv">
      {SITE_ADDONS.map((a) => (
        <li key={a.t}><span className="t">{a.t}</span><span className="d">{a.d}</span></li>
      ))}
    </ul>
  )
}

export function SiteSteps() {
  return (
    <ol className="steps">
      {SITE_STEPS.map((s, i) => (
        <li key={s.n} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
          <span className="num">{s.n}</span>
          <h3 className="h3">{s.t}</h3>
          <p>{s.d}</p>
        </li>
      ))}
    </ol>
  )
}
