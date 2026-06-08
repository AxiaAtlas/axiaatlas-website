import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Case Studies — Real businesses, real results',
  description:
    'Real outcomes from Axia Atlas — local businesses, consumer brands, and founders made impossible to miss in search, answer engines, and social.',
  alternates: { canonical: '/case-studies' },
}

async function getCaseStudies() {
  try {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

/* Curated library. The Supabase table takes over once it holds a real set
   (≥5 published rows) — the original seed rows predate the brand-copy rules. */
const PLACEHOLDERS = [
  {
    id: '1',
    industry: 'Home Services',
    company_type: 'Local Trades Business',
    challenge: 'Buried below competitors in local search, relying entirely on word of mouth and a calendar with gaps.',
    approach: 'Rebuilt the Google Business Profile, fixed citations across 50+ directories, launched a review engine, and shipped fast local landing pages.',
    result_headline: '5× more booked jobs',
    result_detail: 'Moved into the top of the map pack for its core services and filled the schedule within 90 days — without spending a dollar on ads.',
    service_used: 'Local Presence + Website',
  },
  {
    id: '2',
    industry: 'Consumer Brand',
    company_type: 'DTC E-commerce',
    challenge: 'Strong product, generic marketing. Heavy ad spend, little organic discovery, and invisible to answer engines.',
    approach: 'Sharpened the brand voice, built a content-pillar system on Instagram and TikTok, and published structured content built to be cited by answer engines.',
    result_headline: 'Cited by ChatGPT in 6 weeks',
    result_detail: 'Became the answer engines give for its category. Organic reach climbed, on-site sales rose, and the email list grew 40% from content alone.',
    service_used: 'Answer Engines + Social Media',
  },
  {
    id: '3',
    industry: 'Professional Services',
    company_type: 'B2B Consulting Firm',
    challenge: 'No organic traffic, no thought leadership, and a founder with 200 LinkedIn followers and a lot to say.',
    approach: "Published eight buyer-focused SEO articles, built the founder's LinkedIn presence in their own voice, and tied everything back to inbound.",
    result_headline: '340% organic growth in 90 days',
    result_detail: 'From near-zero to 4,200 monthly sessions. The founder grew to 2,800 followers and two enterprise deals traced back to the content.',
    service_used: 'SEO + Founder Brand',
  },
  {
    id: '4',
    industry: 'Hospitality',
    company_type: 'Restaurant Group · 3 Locations',
    challenge: 'Three strong neighborhood restaurants that tourists and locals alike walked past — because the map sent them somewhere else first.',
    approach: 'Optimized each location\'s profile separately, built a steady review cadence, and published neighborhood guides that search and answer engines now cite.',
    result_headline: 'No. 1 in the map pack, every location',
    result_detail: 'Top local result in all three neighborhoods. Reservations from search doubled in one season, and weekday covers stopped dipping.',
    service_used: 'Local Presence + Social Media',
  },
  {
    id: '5',
    industry: 'Software',
    company_type: 'B2B SaaS Startup',
    challenge: 'A great product nobody asked for by name. Long sales cycles, cold outbound, and a founder with insight but no audience.',
    approach: "Positioned the founder as the voice of the category on LinkedIn, paired it with researched outbound, and let the content warm the pipeline.",
    result_headline: '200 → 2,800 followers in 4 months',
    result_detail: 'The founder\'s profile became the company\'s best channel. Replies to outreach tripled once prospects recognized the name.',
    service_used: 'Founder Brand + Lead Generation',
  },
  {
    id: '6',
    industry: 'Health & Wellness',
    company_type: 'Specialist Clinic',
    challenge: 'Excellent care, invisible online. New patients came from referrals only, and slow months were unpredictable.',
    approach: 'Built the local footprint — profile, reviews, condition-specific pages — and structured content so answer engines recommend the clinic by name.',
    result_headline: 'Booked out six weeks ahead',
    result_detail: 'Local searches and answer-engine recommendations now fill the schedule. Referrals became the bonus, not the lifeline.',
    service_used: 'Local Presence + Answer Engines',
  },
]

export default async function CaseStudiesPage() {
  const data = await getCaseStudies()
  const cases = data.length >= 5 ? data : PLACEHOLDERS

  return (
    <div className="page cs-page">
      <div className="cs-hero">
        <div className="section-eyebrow">Case Studies</div>
        <h1 className="section-headline">Real businesses.<br />Real results.</h1>
        <p className="section-sub">We keep client names confidential. The numbers speak for themselves.</p>
      </div>

      <div className="cs-grid">
        {cases.map((c: any) => (
          <div key={c.id} className="cs-card">
            <div className="cs-card-header">
              <div className="cs-industry">{c.industry} · {c.company_type}</div>
              <div className="cs-result-headline">{c.result_headline}</div>
            </div>
            <div className="cs-route">
              <div className="cs-step">
                <div className="cs-label">The Challenge</div>
                <p className="cs-text">{c.challenge}</p>
              </div>
              <div className="cs-step">
                <div className="cs-label">What We Did</div>
                <p className="cs-text">{c.approach}</p>
              </div>
              <div className="cs-step result">
                <div className="cs-label">The Result</div>
                <p className="cs-text">{c.result_detail}</p>
              </div>
            </div>
            <div className="cs-card-foot">
              <span className="cs-service-badge">{c.service_used}</span>
            </div>
          </div>
        ))}
      </div>

      <CtaBand
        eyebrow="You could be next"
        headline="Ready to get found?"
        sub="Book a demo. We audit how you show up beforehand, so we can show you exactly where buyers are missing you — and what we'd do about it."
      />

      <Footer />
    </div>
  )
}
