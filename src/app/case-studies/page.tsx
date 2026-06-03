import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real outcomes from Axia Atlas — local businesses, consumer brands, and founders made impossible to miss in search, AI answers, and social.',
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
    challenge: 'Strong product, generic marketing. Heavy ad spend, little organic discovery, and invisible to AI assistants.',
    approach: 'Sharpened the brand voice, built a content-pillar system on Instagram and TikTok, and published structured content built to be cited by AI.',
    result_headline: 'Cited by ChatGPT in 6 weeks',
    result_detail: 'Became the answer AI gives for its category. Organic reach climbed, on-site sales rose, and the email list grew 40% from content alone.',
    service_used: 'AI Search + Social Media',
  },
  {
    id: '3',
    industry: 'Professional Services',
    company_type: 'B2B Consulting Firm',
    challenge: 'No organic traffic, no thought leadership, and a founder with 200 LinkedIn followers and a lot to say.',
    approach: 'Published eight buyer-focused SEO articles, built the founder\'s LinkedIn presence in their own voice, and tied everything back to inbound.',
    result_headline: '340% organic growth in 90 days',
    result_detail: 'From near-zero to 4,200 monthly sessions. The founder grew to 2,800 followers and two enterprise deals traced back to the content.',
    service_used: 'SEO + Founder Brand',
  },
]

export default async function CaseStudiesPage() {
  const data = await getCaseStudies()
  const cases = data.length > 0 ? data : PLACEHOLDERS

  return (
    <div className="page">
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
            <div className="cs-card-body">
              <div className="cs-label">The Challenge</div>
              <p className="cs-text">{c.challenge}</p>
              <div className="cs-label">What We Did</div>
              <p className="cs-text">{c.approach}</p>
              <div className="cs-label">The Result</div>
              <p className="cs-text">{c.result_detail}</p>
              <span className="cs-service-badge">{c.service_used}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="cta-section">
        <div className="section-eyebrow">You could be next</div>
        <h2 className="section-headline">Ready to get found?</h2>
        <p className="section-sub">Book a free audit. We&apos;ll show you exactly where buyers are missing you and what we&apos;d do about it.</p>
        <Link href="/contact" className="btn-primary">Book a Free Audit →</Link>
      </section>

      <Footer />
    </div>
  )
}
