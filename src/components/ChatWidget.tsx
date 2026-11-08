'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AMark } from './Logo'
import { Send, Arrow } from './icons'
import { ADDONS_PATH, PORTAL_PATH, THEIA_PATH, serviceHref, serviceName, serviceShort, type ServiceId } from '@/lib/services'
import { THEIA_LAUNCH } from '@/lib/flags'
import { ADDONS_PRICE, CARE_PRICE, SOCIAL_PRICE, WEBSITE_PRICE } from '@/lib/price-facts'
import { aaTrack } from '@/lib/aa-track'

type ChatLink = { label: string; href: string }
type Message = { role: 'user' | 'assistant'; content: string; at?: string; links?: ChatLink[]; followups?: string[] }
type VisitorInfo = { name?: string; email?: string; phone?: string; company?: string }

const WELCOME =
  "Hi, I'm the Axia Atlas assistant. Ask me what we do, what it costs, or how to get started. Pick a question below or type your own."

// ── Predetermined Q&A. No external calls. First entry that matches wins. ──
// `topic: true` marks an entry that maps to a specific page (a service section
// or careers). These win ties against the broad "what do you do / services"
// overview entries so a topic question always links the right page.
type QA = { keywords: string[]; answer: string; links?: ChatLink[]; followups: string[]; topic?: boolean }

/* A link to one service. The label comes from lib/services and the href from
   serviceHref(), so a link cannot name one service and point at another. */
const svcLink = (id: ServiceId): ChatLink => ({
  label: `${serviceShort(id)} details`,
  href: serviceHref(id),
})

const L = {
  demo: { label: 'Book a Demo', href: '/demo' },
  services: { label: 'See all services', href: '/services' },
  addons: { label: 'See the add-ons', href: ADDONS_PATH },
  pricing: { label: 'View pricing', href: '/pricing' },
  /* '/#results', not '/case-studies': the old page 301s to this anchor, so
     linking it directly saves the hop. */
  cases: { label: 'See results', href: '/#results' },
  contact: { label: 'Contact us', href: '/contact' },
  careers: { label: 'See open roles', href: '/careers' },
  portal: { label: 'About the portal', href: PORTAL_PATH },
  theia: { label: 'Meet Theia', href: THEIA_PATH },
  social: svcLink('social'),
  intel: svcLink('intel'),
  geo: svcLink('geo'),
  local: svcLink('local'),
  executive: svcLink('executive'),
  website: svcLink('website'),
  leadgen: svcLink('leadgen'),
  strategy: svcLink('strategy'),
  dashboards: svcLink('dashboards'),
} satisfies Record<string, ChatLink>

const QA_SET: QA[] = [
  {
    keywords: ['what do you do', 'what is axia', 'who are you', 'about', 'services overview', 'what you offer'],
    answer:
      `Axia Atlas is a marketing agency headquartered in Miami. We design and build websites and run social media for brands, local businesses, and founders, and we offer add-ons for search, answer engines, local, leads and strategy. We start with strategy, then do the work.`,
    links: [L.services, L.demo],
    followups: ['What services do you offer?', 'How much does it cost?'],
  },
  {
    keywords: ['service', 'offer', 'what can you', 'help with', 'channels', 'what do you sell', 'add-on', 'add on', 'addon'],
    answer:
      `Two headline services: ${serviceName('website')} and ${serviceName('social')}. ` +
      `Everything else is an add-on you bolt on when it pays off: SEO and answer engines, local search and maps, lead generation, executive brand, competitor research, strategic advisory, and custom dashboards.`,
    links: [L.services, L.addons, L.demo],
    followups: ['How much does it cost?', 'How does answer engine optimization work?'],
  },
  ...(THEIA_LAUNCH
    ? [
        {
          keywords: ['theia', 'assistant in the portal', 'portal assistant'],
          answer:
            "Theia by Axia Atlas is our proprietary assistant inside the client portal. She knows only your business and helps you understand your data, then build your own reports, decks and plans from it. She lives only in your portal, never on your website.",
          links: [L.theia, L.demo],
          topic: true,
          followups: ['What is the client portal?', 'How do I get started?'],
        },
        {
          keywords: ['client portal', 'what is the portal', 'portal pricing', 'saas', 'software'],
          answer:
            'The client portal is one login for your results, deliverables, approvals and reports, with Theia inside it. It also shows how the ads you already run are performing. We do not run or buy ads. Portal pricing is on request: book a demo and we will walk you through it.',
          links: [L.portal, L.demo],
          topic: true,
          followups: ['Who is Theia?', 'How do I get started?'],
        },
      ] satisfies QA[]
    : []),
  {
    keywords: ['answer engine', 'answer-engine', 'chatgpt', 'perplexity', 'gemini', 'geo', 'aeo', 'cited', 'citation', 'generative', 'llm'],
    answer:
      "SEO & Answer Engine Optimization is one add-on, because ranking in Google and getting named by an assistant run on the same work: articles built on real keyword research, the schema and entity data behind them, and source pages written to be quoted whole. We baseline the exact prompts a buyer would type across ChatGPT, Perplexity, Gemini and other answer engines, record who gets named today, build presence on the sources those systems fall back on, then re-run the same prompts monthly so you can see where you are cited and where you are still left out.",
    links: [L.geo, L.demo],
    topic: true,
    followups: ['How long until I see results?', 'How much does it cost?'],
  },
  {
    keywords: ['local', 'google business', 'map pack', 'maps', 'near me', 'review'],
    answer:
      "Local Presence & Maps is an add-on that works the map pack and the organic results under it together: a fully built Google Business Profile, consistent citations, a review program with public responses, plus the service and location pages that rank for 'service in city'. Rankings and calls are tracked per location.",
    links: [L.local, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['social media', 'instagram', 'tiktok', 'facebook', 'linkedin', 'content calendar', 'posting'],
    answer:
      `${serviceName('social')} is one of our two headline services: we pick the two or three platforms worth your time, set recurring content pillars, produce and publish natively for each platform, and answer the comments and messages. ${SOCIAL_PRICE}`,
    links: [L.social, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['competitor', 'competitive intelligence', 'competition', 'benchmark', 'market research', 'share of voice', 'rivals'],
    answer:
      "Competitive Intelligence is an add-on that tracks the competitors you choose and reports what they actually did: pricing and packaging changes, the queries and pages they rank for that you don't, publishing cadence and what earned engagement, hiring signals, review sentiment, and whether the answer engines name them when they don't name you. Every claim is sourced and dated.",
    links: [L.intel, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['seo', 'search engine optimization', 'ranking', 'rank', 'keyword', 'organic', 'blog', 'article'],
    answer:
      "SEO is sold as the SEO & Answer Engine Optimization add-on, because organic search and the assistants buyers now ask run on one content pipeline. Search foundations are also laid during every website build, and the proximity side (location pages, the map pack, citations) is the Local Presence & Maps add-on.",
    links: [L.geo, L.website],
    topic: true,
    followups: ['How does answer engine optimization work?', 'How long until I see results?'],
  },
  {
    keywords: ['website', 'web design', 'web site', 'landing page', 'redesign', 'site speed', 'conversion'],
    answer:
      `${serviceName('website')} is one of our two headline services: positioning first, then the copy, the design and the build, with search foundations laid during the build. ${WEBSITE_PRICE}`,
    links: [L.website, L.pricing, L.demo],
    topic: true,
    followups: ['What is the care plan?', 'How do I get started?'],
  },
  {
    keywords: ['care plan', 'maintenance', 'maintain', 'updates', 'retainer', 'hosting', 'support'],
    answer: `${CARE_PRICE} If someone else built your site, we would quote a rebuild rather than care for it.`,
    links: [L.website, L.pricing],
    topic: true,
    followups: ['How much is a website?', 'How do I get started?'],
  },
  {
    keywords: ['assistant on my site', 'website assistant', 'chat on my site', 'chat widget for my site'],
    answer:
      'Website assistant is a website add-on: a chat assistant on your own site that answers visitor questions and sends leads to your contacts. It is priced on the pricing page.',
    links: [L.website, L.pricing],
    topic: true,
    followups: ['How much is a website?', 'How do I get started?'],
  },
  {
    keywords: ['advisory', 'strategy', 'strategic', 'consulting', 'embedded', 'pricing decision', 'positioning'],
    answer:
      "Strategic Advisory & Embedded Thinking is an add-on: standing access to a strategist who knows your business, for the decisions that don't fit one channel: what to charge, how to package it, which segment is next, what to say when a competitor undercuts you. Decisions get written down and revisited.",
    links: [L.strategy, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['lead gen', 'lead generation', 'outbound', 'prospecting', 'cold email', 'outreach', 'pipeline'],
    answer:
      'Lead Generation is an add-on that fills the pipeline now while search and content compound: targeted prospecting over email and LinkedIn, written for each company rather than dropped into a template.',
    links: [L.leadgen, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['founder', 'executive', 'personal brand', 'thought leadership'],
    answer:
      "Executive Personal Brand is an add-on that builds a founder's voice separately from the company's: positions drawn out of you in interviews, then written up as posts and essays that sound like you, with inbound triaged so real buyers get a real reply. The audience and the archive stay yours.",
    links: [L.executive, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'See some results?'],
  },
  {
    keywords: ['dashboard', 'custom dashboard', 'operations dashboard', 'ad dashboard', 'ads dashboard', 'ad campaign', 'ads', 'advertising'],
    answer:
      "Portals & Dashboards is a custom-build add-on: one dashboard for your own operation (stock, orders, pipeline, or the ads you already run), read from the systems you use, behind your own login. We show how your ads perform; we do not run or buy them.",
    links: [L.dashboards, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['career', 'job', 'jobs', 'hiring', 'work for you', 'join the team', 'open role', 'resume', 'cv'],
    topic: true,
    answer:
      "We're glad you asked. Open roles and how to apply live on our careers page. If your skills fit how we work, we'd love to see your application.",
    links: [L.careers, L.contact],
    followups: ['What services do you offer?', 'Where are you located?'],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'fee', 'tier', 'plan', 'package'],
    answer: `We publish our prices. ${WEBSITE_PRICE} ${SOCIAL_PRICE} ${ADDONS_PRICE}`,
    links: [L.pricing, L.demo],
    followups: ['What is the care plan?', 'How do I get started?'],
  },
  {
    keywords: ['start', 'get started', 'begin', 'sign up', 'onboard', 'first step', 'how do i', 'audit', 'demo', 'book', 'consult'],
    answer:
      "Getting started is one step: book a demo. It's a quick survey: your business, then your goals. Before the call we audit how you show up today, so we arrive with your pain points pinpointed and specific solutions to propose. Work begins in week one.",
    links: [L.demo, L.services],
    followups: ['How much does it cost?', 'See some results?'],
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'message', 'question'],
    answer:
      'New and prospective clients can email partner@axiaatlas.com. Current clients reach their strategist at strategy@axiaatlas.com. We reply within 24 hours, usually the same day. Or, if you’re ready to start, the fastest path is to book a demo.',
    links: [L.contact, L.demo],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['portal', 'login', 'log in', 'client login', 'sign in', 'account'],
    answer:
      'Existing clients can sign in to the portal at app.axiaatlas.com. There’s also a Client Portal button at the top of every page.',
    links: [{ label: 'Client Portal', href: 'https://app.axiaatlas.com' }, L.contact],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['where', 'located', 'location', 'remote', 'city', 'based', 'miami', 'headquarters'],
    answer: "We're headquartered in Miami, working with clients across the US.",
    links: [L.demo, L.contact],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['b2c', 'consumer', 'ecommerce', 'e-commerce', 'retail', 'shop', 'brand', 'b2b'],
    answer:
      'Yes. We work with B2C and consumer brands as well as B2B and professional services. The playbook adapts: the goal is the same, making you impossible to miss where your buyers spend attention.',
    links: [L.cases, L.demo],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['result', 'guarantee', 'roi', 'work', 'proof', 'case study', 'results', 'how long', 'how fast', 'timeline'],
    answer:
      'We measure success in pipeline, rankings, citations, and compounding assets, not posts published. Work starts in week one; compounding channels build over 60 to 90 days. See real outcomes:',
    links: [L.cases, L.demo],
    followups: ['How much does it cost?', 'How do I get started?'],
  },
]

const DEFAULT_LINKS: ChatLink[] = [L.demo, L.contact]
const SUGGESTIONS = ['What do you do?', 'How much does it cost?', 'How do I get started?', 'How do answer engines work?']

// Score a question against an entry. Each keyword must start on a word boundary
// (so "seo" can't fire inside "season" or "rank" inside "frank"), but we don't
// require a trailing boundary so plurals/derivations still match ("review" hits
// "reviews", "answer engine" hits "answer engines"). We score by the LONGEST
// single keyword hit — the most specific phrase wins, not whichever entry lists
// the most keywords. Topic entries (a specific service section or careers) get a
// boost so a topic question resolves to its own page, never the broad
// "what do you do / services" overview. This is what stops, e.g., an AEO
// question from being tagged to the wrong page.
function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function scoreEntry(q: string, qa: QA): number {
  let best = 0
  for (const k of qa.keywords) {
    if (new RegExp(`\\b${escapeRe(k)}`, 'i').test(q) && k.length > best) best = k.length
  }
  if (best === 0) return 0
  return best + (qa.topic ? 8 : 0)
}

function answerFor(text: string): Message {
  const q = text.toLowerCase()
  let chosen: QA | null = null
  let topScore = 0
  for (const qa of QA_SET) {
    const s = scoreEntry(q, qa)
    if (s > topScore) {
      topScore = s
      chosen = qa
    }
  }
  if (chosen) {
    return { role: 'assistant', content: chosen.answer, links: chosen.links, followups: chosen.followups }
  }
  return {
    role: 'assistant',
    content:
      "Good question. I don't have a ready answer for that one. The fastest way to a real answer is to book a demo, or email partner@axiaatlas.com and we'll reply within 24 hours.",
    links: DEFAULT_LINKS,
    followups: ['What services do you offer?', 'How much does it cost?'],
  }
}

// ── Conversation logging. Fire-and-forget: never blocks or breaks the UI. ──
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+\w/
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/
const NAME_RE = /(?:my name is|name's|this is)\s+([a-z][a-z'’-]*(?:\s+[a-z][a-z'’-]*)?)/i
const IM_RE = /\bi(?:'m| am)\s+([a-z][a-z'’-]*(?:\s+[a-z][a-z'’-]*)?)/i
// Words that follow "I'm …" but aren't a name.
const NOT_NAMES = new Set([
  'interested', 'looking', 'trying', 'wondering', 'curious', 'asking', 'just', 'not',
  'a', 'an', 'the', 'here', 'ready', 'new', 'from', 'in', 'on', 'at', 'with', 'sure', 'good',
])
const COMPANY_RE = /(?:my company(?: name)? is|our company(?: name)? is|i work (?:at|for)|we(?:'re| are) called|on behalf of|company:)\s+([\w&.'’-][\w&.,'’ -]{1,59})/i

function extractVisitorInfo(text: string, into: VisitorInfo) {
  const email = text.match(EMAIL_RE)
  if (email && !into.email) into.email = email[0]
  const phone = text.match(PHONE_RE)
  if (phone && !into.phone) into.phone = phone[1].trim()
  const name = text.match(NAME_RE) ?? text.match(IM_RE)
  if (name && !into.name && !NOT_NAMES.has(name[1].split(/\s+/)[0].toLowerCase())) into.name = name[1].trim()
  const company = text.match(COMPANY_RE)
  if (company && !into.company) into.company = company[1].trim()
}

const TYPING_DELAY_MS = 3000

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const sessionRef = useRef<string | null>(null)
  const visitorRef = useRef<VisitorInfo>({})
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const questionCount = useRef(0)
  const emailAsked = useRef(false)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  // Close when the user clicks anywhere outside the widget.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Report open/close to the behavior tracker. The panel closes from four places
  // (× button, outside click, a chat link, the launcher toggle), so this watches
  // the state instead of each call site. Skips the initial closed render.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open === wasOpen.current) return
    wasOpen.current = open
    if (open) aaTrack('chat', 'open')
    else aaTrack('chat', 'close', questionCount.current)
  }, [open])

  useEffect(() => () => { if (typingTimer.current) clearTimeout(typingTimer.current) }, [])

  function logConversation(thread: Message[]) {
    try {
      if (!sessionRef.current) {
        sessionRef.current =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`
      }
      fetch('/api/chat-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          sessionId: sessionRef.current,
          page: window.location.pathname,
          referrer: document.referrer || null,
          visitor: visitorRef.current,
          messages: thread.map((m) => ({ role: m.role, text: m.content, at: m.at })),
        }),
      }).catch(() => {})
    } catch {
      // Logging must never break the widget.
    }
  }

  function send(preset?: string) {
    const text = (preset ?? input).trim()
    if (!text || typing) return
    setInput('')
    const hadEmail = Boolean(visitorRef.current.email)
    extractVisitorInfo(text, visitorRef.current)
    const justSharedEmail = !hadEmail && Boolean(visitorRef.current.email)
    questionCount.current += 1
    aaTrack('chat', 'message', questionCount.current)
    const at = new Date().toISOString()
    const withUser = [...messages, { role: 'user' as const, content: text, at }]
    setMessages(withUser)

    // Show the typing dots for a beat before replying.
    setTyping(true)
    typingTimer.current = setTimeout(() => {
      setTyping(false)
      const replyAt = new Date().toISOString()
      const replies: Message[] = []
      if (justSharedEmail) {
        replies.push({
          role: 'assistant',
          content: `Got it. We'll follow up at ${visitorRef.current.email}. Keep the questions coming in the meantime.`,
          at: replyAt,
          links: [L.demo, L.contact],
          followups: ['What services do you offer?', 'How do I get started?'],
        })
      } else {
        replies.push({ ...answerFor(text), at: replyAt })
        // After the second question, ask (once) for an email so we can follow up.
        if (questionCount.current >= 2 && !emailAsked.current && !visitorRef.current.email) {
          emailAsked.current = true
          replies.push({
            role: 'assistant',
            content:
              "By the way, if you leave your email, we can follow up personally with answers tailored to your business. No pressure: you're welcome to keep asking questions either way.",
            at: replyAt,
          })
        }
      }
      const next = [...withUser, ...replies]
      setMessages(next)
      logConversation(next)
    }, TYPING_DELAY_MS)
  }

  const showSuggestions = messages.length <= 1
  const lastAssistant = messages.map((m) => m.role).lastIndexOf('assistant')

  return (
    <div data-aa-section="chat" ref={rootRef}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Axia Atlas assistant">
          <div className="chat-panel-header">
            <AMark className="amark" />
            <div style={{ flex: 1 }}>
              <div className="chat-panel-title">Ask Axia Atlas</div>
              <span className="chat-status">Email us: <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></span>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="chat-msg user">{m.content}</div>
              ) : (
                <div key={i} className="chat-block">
                  <div className="chat-msg assistant">{m.content}</div>

                  {m.links && m.links.length > 0 && (
                    <div className="chat-links">
                      {m.links.map((lnk) =>
                        lnk.href.startsWith('/') ? (
                          <Link key={lnk.href} href={lnk.href} className="chat-link" onClick={() => setOpen(false)}>
                            {lnk.label} <Arrow />
                          </Link>
                        ) : (
                          <a key={lnk.href} href={lnk.href} className="chat-link" target="_blank" rel="noreferrer">
                            {lnk.label} <Arrow />
                          </a>
                        ),
                      )}
                    </div>
                  )}

                  {m.followups && m.followups.length > 0 && i === lastAssistant && (
                    <>
                      <div className="chat-followup-label">Ask next</div>
                      <div className="chat-followups">
                        {m.followups.map((f) => (
                          <button key={f} className="chat-chip" onClick={() => send(f)}>{f}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ),
            )}

            {typing && (
              <div className="chat-msg assistant chat-typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}

            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="chat-chip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask a question…"
            />
            <button className="chat-send" onClick={() => send()} aria-label="Send">
              <Send />
            </button>
          </div>
          <div className="chat-disclaimer">The assistant can make mistakes. Please double-check important details.</div>
        </div>
      )}

      <button className="chat-btn" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        <AMark className="amark" />
      </button>
    </div>
  )
}
