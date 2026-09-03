'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AMark } from './Logo'
import { Send, Arrow } from './icons'

type ChatLink = { label: string; href: string }
type Message = { role: 'user' | 'assistant'; content: string; at?: string; links?: ChatLink[]; followups?: string[] }
type VisitorInfo = { name?: string; email?: string; phone?: string; company?: string }

const WELCOME =
  "Hi — I'm the Axia Atlas assistant. Ask me what we do, how we work, our tiers, or how to get started. Pick a question below or type your own."

// ── Predetermined Q&A. No external calls. First entry that matches wins. ──
// `topic: true` marks an entry that maps to a specific page (a service section
// or careers). These win ties against the broad "what do you do / services"
// overview entries so a topic question always links the right page.
type QA = { keywords: string[]; answer: string; links?: ChatLink[]; followups: string[]; topic?: boolean }

const L = {
  demo: { label: 'Book a demo', href: '/demo' },
  services: { label: 'See all services', href: '/services' },
  pricing: { label: 'View pricing', href: '/pricing' },
  cases: { label: 'See results', href: '/case-studies' },
  contact: { label: 'Contact us', href: '/contact' },
  careers: { label: 'See open roles', href: '/careers' },
  social: { label: 'Social Media details', href: '/services#social' },
  intel: { label: 'Competitive Intelligence details', href: '/services#intel' },
  geo: { label: 'AEO details', href: '/services#geo' },
  local: { label: 'Local Presence & Maps details', href: '/services#local' },
  executive: { label: 'Executive brand details', href: '/services#executive' },
  website: { label: 'Website details', href: '/services#website' },
  leadgen: { label: 'Lead gen details', href: '/services#leadgen' },
  strategy: { label: 'Strategic Advisory details', href: '/services#strategy' },
} satisfies Record<string, ChatLink>

const QA_SET: QA[] = [
  {
    keywords: ['what do you do', 'what is axia', 'who are you', 'about', 'services overview', 'what you offer'],
    answer:
      'Axia Atlas is a digital marketing studio. We make brands, local businesses, and founders impossible to miss — in Google, in the AI platforms buyers now ask (Claude, ChatGPT, Perplexity, and Gemini), in local search, and across social. We start with strategy, then build content and systems that compound.',
    links: [L.services, L.demo],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['service', 'offer', 'what can you', 'help with', 'channels', 'what do you sell'],
    answer:
      'Our services: Website Design & Build, Social Media Management, Competitive Intelligence, Local Presence & Maps, Answer Engine Optimization (AEO), Lead Generation, Executive Personal Brand, Client Dashboards, and Strategic Advisory & Embedded Thinking. Most clients combine three or four.',
    links: [L.services, L.demo],
    followups: ['How does answer engine optimization work?', 'What are your tiers?'],
  },
  {
    keywords: ['answer engine', 'answer-engine', 'claude', 'chatgpt', 'perplexity', 'gemini', 'geo', 'aeo', 'cited', 'citation', 'generative', 'ai platform', 'ai search', 'llm'],
    answer:
      "Answer Engine Optimization (AEO) gets you cited across the four platforms buyers actually ask — Claude, ChatGPT, Perplexity, and Gemini. We baseline the exact prompts a buyer would type and record who gets named today, fix the entity data, schema, and quotable source pages those systems rely on, build presence on the third-party sources they fall back on, then re-run the same prompts monthly so you can see where you're cited and where you're still left out.",
    links: [L.geo, L.demo],
    topic: true,
    followups: ['How long until I see results?', 'How much does it cost?'],
  },
  {
    keywords: ['local', 'google business', 'map pack', 'maps', 'near me', 'review'],
    answer:
      "Local Presence & Maps works the map pack and the organic results under it together: a fully built Google Business Profile, consistent citations, a review programme with public responses, plus the service and location pages that rank for 'service in city'. Rankings and calls are tracked per location. Usually the highest-ROI channel for a business that sells inside a radius.",
    links: [L.local, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['social media', 'instagram', 'tiktok', 'facebook', 'content calendar', 'posting'],
    answer:
      'Social Media Management is the whole thing, not just a posting schedule — we pick the two or three platforms worth your time, set recurring content pillars, produce and publish natively for each platform, and manage the comments so an audience that actually buys grows around it.',
    links: [L.social, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['competitor', 'competitive intelligence', 'competition', 'benchmark', 'market research', 'share of voice', 'rivals'],
    answer:
      'Competitive Intelligence tracks a named set of competitors you choose — usually five to ten — and reports what they actually did: pricing and packaging changes, the queries and pages they rank for that you don\'t, publishing cadence and what earned engagement, hiring signals, review sentiment, and whether the AI platforms name them when they don\'t name you. Every claim is sourced and dated.',
    links: [L.intel, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['seo', 'search engine optimization', 'ranking', 'rank', 'keyword', 'organic', 'blog', 'article'],
    answer:
      "SEO isn't a separate line item — search foundations are built into the website engagement from day one, and the ongoing ranking work lives inside Local Presence & Maps: service and location pages, internal linking, technical fixes, and rank tracking you can check.",
    links: [L.local, L.website],
    topic: true,
    followups: ['How does answer engine optimization work?', 'How long until I see results?'],
  },
  {
    keywords: ['website', 'web design', 'web site', 'landing page', 'redesign', 'site speed', 'conversion'],
    answer:
      'Website Design & Build is our core engagement, and it covers more than design: positioning first, then the copy, the design, and the build itself — with search foundations laid during the build rather than bolted on after. You get a working, indexed, fast site, not a mockup handed to someone else.',
    links: [L.website, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['advisory', 'strategy', 'strategic', 'consulting', 'embedded', 'pricing decision', 'positioning'],
    answer:
      "Strategic Advisory & Embedded Thinking is standing access to a strategist who knows your business — recurring working sessions on the decisions that don't fit one channel: what to charge, how to package it, which segment is next, what to say when a competitor undercuts you. Decisions get written down and revisited.",
    links: [L.strategy, L.demo],
    topic: true,
    followups: ['What are your tiers?', 'How do I get started?'],
  },
  {
    keywords: ['lead gen', 'lead generation', 'outbound', 'prospecting', 'cold email', 'outreach', 'pipeline'],
    answer:
      'Lead Generation fills the pipeline now while search and content compound — targeted prospecting over email and LinkedIn that finds your ideal customers and warms them up without sounding like spam.',
    links: [L.leadgen, L.demo],
    topic: true,
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['founder', 'executive', 'personal brand', 'thought leadership'],
    answer:
      "Executive Personal Brand builds a founder's voice separately from the company's — positions drawn out of you in interviews, then written up as posts and essays that sound like you, with inbound triaged so real buyers get a real reply. The audience and the archive stay yours.",
    links: [L.executive, L.demo],
    topic: true,
    followups: ['What are your tiers?', 'See some results?'],
  },
  {
    keywords: ['career', 'job', 'jobs', 'hiring', 'work for you', 'join the team', 'open role', 'resume', 'cv'],
    topic: true,
    answer:
      "We're glad you asked — open roles and how to apply live on our careers page. If your skills fit how we work, we'd love to see your application.",
    links: [L.careers, L.contact],
    followups: ['What services do you offer?', 'Where are you located?'],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'fee'],
    answer:
      'We work in three tiers — Starter, Growth, and Command — scoped to how fast you want to move. Exact pricing is shared on your demo call, once we know your goals. See what each tier includes:',
    links: [L.pricing, L.demo],
    followups: ['What are your tiers?', 'How do I get started?'],
  },
  {
    keywords: ['tier', 'starter', 'growth', 'command', 'authority', 'plan', 'package'],
    answer:
      'Three tiers: Starter (one or two channels, get momentum), Growth (multi-channel system, our most popular), and Command (full-spectrum, founder brand + campaigns).',
    links: [L.pricing, L.demo],
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['start', 'get started', 'begin', 'sign up', 'onboard', 'first step', 'how do i', 'audit', 'demo', 'book', 'consult'],
    answer:
      "Getting started is one step: book a demo. It's a quick survey — your business, then your goals. Before the call we audit how you show up today, so we arrive with your pain points pinpointed and specific solutions to propose. Work begins in week one.",
    links: [L.demo, L.services],
    followups: ['How much does it cost?', 'See some results?'],
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'message', 'question'],
    answer:
      'New and prospective clients can email partner@axiaatlas.com — current clients reach their strategist at strategy@axiaatlas.com. We reply within 24 hours, usually the same day. Or, if you’re ready to start, the fastest path is to book a demo.',
    links: [L.contact, L.demo],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['portal', 'login', 'log in', 'client login', 'dashboard', 'sign in', 'account'],
    answer:
      'Existing clients can sign in to the portal at app.axiaatlas.com — there’s also a Client Portal button at the top of every page.',
    links: [{ label: 'Client Portal', href: 'https://app.axiaatlas.com' }, L.contact],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['where', 'located', 'location', 'remote', 'city', 'based'],
    answer:
      "We're a fully remote studio and work with clients across North America and beyond — with regular strategy calls and live reporting.",
    links: [L.demo, L.contact],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['b2c', 'consumer', 'ecommerce', 'e-commerce', 'retail', 'shop', 'brand', 'b2b'],
    answer:
      'Yes — we work with B2C and consumer brands as well as B2B and professional services. The playbook adapts: the goal is the same, making you impossible to miss where your buyers spend attention.',
    links: [L.cases, L.demo],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['result', 'guarantee', 'roi', 'work', 'proof', 'case study', 'results', 'how long', 'how fast', 'timeline'],
    answer:
      'We measure success in pipeline, rankings, citations, and compounding assets — not posts published. Work starts in week one; compounding channels build over 60–90 days. See real outcomes:',
    links: [L.cases, L.demo],
    followups: ['How much does it cost?', 'How do I get started?'],
  },
]

const DEFAULT_LINKS: ChatLink[] = [L.demo, L.contact]
const SUGGESTIONS = ['What do you do?', 'What are your tiers?', 'How do I get started?', 'How do answer engines work?']

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
      "Good question — I don't have a ready answer for that one. The fastest way to a real answer is to book a demo, or email partner@axiaatlas.com and we'll reply within 24 hours.",
    links: DEFAULT_LINKS,
    followups: ['What services do you offer?', 'What are your tiers?'],
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
          content: `Got it — we'll follow up at ${visitorRef.current.email}. Keep the questions coming in the meantime.`,
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
              "By the way — if you leave your email, we can follow up personally with answers tailored to your business. No pressure: you're welcome to keep asking questions either way.",
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
    <div ref={rootRef}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Axia Atlas assistant">
          <div className="chat-panel-header">
            <AMark className="amark" />
            <div style={{ flex: 1 }}>
              <div className="chat-panel-title">Ask Axia Atlas</div>
              <span className="chat-status">Email us — <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></span>
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
          <div className="chat-disclaimer">The assistant can make mistakes — please double-check important details.</div>
        </div>
      )}

      <button className="chat-btn" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        <AMark className="amark" />
      </button>
    </div>
  )
}
