'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AMark } from './Logo'
import { Send, Arrow } from './icons'
import { AEO, PATHS, PORTAL_URL } from '@/lib/site'
import { aaTrack } from '@/lib/aa-track'

type ChatLink = { label: string; href: string }
type Message = { role: 'user' | 'assistant'; content: string; at?: string; links?: ChatLink[]; followups?: string[] }
type VisitorInfo = { name?: string; email?: string; phone?: string; company?: string }

const WELCOME =
  "Hi, I'm the Axia Atlas assistant. Ask me what Axia Atlas does, how Theia works, how your data is protected, or how to see a demo. Pick a question below or type your own."

// ── Predetermined Q&A. No external calls. Best keyword match wins. ──
// The answers are lib/site's twelve buyer answers (the same text on the pages
// and in /llms.txt), so the widget cannot say something the site does not.
// `topic: true` marks an entry for one product or page; it wins ties against
// the broad overview.
type QA = { keywords: string[]; answer: string; links?: ChatLink[]; followups: string[]; topic?: boolean }

const L = {
  demo: { label: 'Book a Demo', href: PATHS.demo },
  platform: { label: 'See the platform', href: PATHS.platform },
  ledger: { label: 'About Raise Ledger', href: `${PATHS.platform}#raise-ledger` },
  live: { label: 'About Live Campaigns', href: `${PATHS.platform}#live-campaigns` },
  theia: { label: 'Meet Theia', href: PATHS.theia },
  reports: { label: 'About Theia Reports', href: `${PATHS.theia}#reports` },
  security: { label: 'Security and privacy', href: PATHS.security },
  pricing: { label: 'See the plans', href: PATHS.pricing },
  website: { label: 'Website design', href: PATHS.website },
  contact: { label: 'Contact us', href: PATHS.contact },
  careers: { label: 'See open roles', href: '/careers' },
  signin: { label: 'Sign in', href: PORTAL_URL },
} satisfies Record<string, ChatLink>

const A = (id: string) => {
  const f = AEO.find((x) => x.id === id)
  if (!f) throw new Error(`Unknown AEO id: ${id}`)
  return f.a
}

const QA_SET: QA[] = [
  {
    keywords: ['what do you do', 'what is axia', 'who are you', 'about', 'what you offer', 'what does axia', 'overview'],
    answer: A('what'),
    links: [L.platform, L.demo],
    followups: ['What is Theia?', 'How do I see cost per investor?'],
  },
  {
    keywords: ['cost per investor', 'raise ledger', 'ledger', 'affiliate', 'newspaper', 'print', 'press', 'every channel', 'all spend'],
    answer: A('cost-per-investor'),
    links: [L.ledger, L.demo],
    topic: true,
    followups: ['Which channels do you cover?', 'What is Theia?'],
  },
  {
    keywords: ['raise platform', 'reg cf', 'reg a', 'reg d', 'crowdfunding', 'investments'],
    answer: A('why-not-raise-platform'),
    links: [L.platform, L.demo],
    topic: true,
    followups: ['How do I see cost per investor?', 'Do you run my ads?'],
  },
  {
    keywords: ['theia', 'assistant', 'ask theia'],
    answer: A('theia'),
    links: [L.theia, L.demo],
    topic: true,
    followups: ['Does Theia replace an analyst?', 'How do investor reports work?'],
  },
  {
    keywords: ['analyst', 'replace', 'human', 'person'],
    answer: A('analyst'),
    links: [L.theia, L.contact],
    topic: true,
    followups: ['What is Theia?', 'Is my data secure?'],
  },
  {
    keywords: ['run my ads', 'run ads', 'buy media', 'media buyer', 'manage ads', 'ad spend', 'manage my', 'agency fee'],
    answer: A('ads'),
    links: [L.platform, L.demo],
    topic: true,
    followups: ['Which channels do you cover?', 'What is Theia?'],
  },
  {
    keywords: ['channel', 'platforms', 'meta', 'facebook', 'google ads', 'linkedin', 'integration', 'connect', 'live campaigns', 'dashboard'],
    answer: A('channels'),
    links: [L.live, L.demo],
    topic: true,
    followups: ['How do I see cost per investor?', 'How much does it cost?'],
  },
  {
    keywords: ['report', 'deck', 'investor report', 'theia reports', 'slides', 'board'],
    answer: A('reports'),
    links: [L.reports, L.demo],
    topic: true,
    followups: ['What is Theia?', 'How much does it cost?'],
  },
  {
    keywords: ['roas', 'return on ad spend', 'dropped', 'why did', 'performance', 'cpa', 'cpl'],
    answer: A('roas'),
    links: [L.theia, L.demo],
    topic: true,
    followups: ['Does Theia replace an analyst?', 'How do investor reports work?'],
  },
  {
    keywords: ['secure', 'security', 'privacy', 'private', 'encrypt', 'data', 'mask', 'train', 'gdpr', 'soc'],
    answer: A('security'),
    links: [L.security, L.demo],
    topic: true,
    followups: ['What is Theia?', 'How do I get started?'],
  },
  {
    keywords: ['agency', 'agencies', 'my clients', 'white label', 'for clients'],
    answer: A('agencies'),
    links: [L.pricing, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'How do investor reports work?'],
  },
  {
    keywords: ['website', 'web design', 'web site', 'landing page', 'redesign'],
    answer: A('websites'),
    links: [L.website, L.demo],
    topic: true,
    followups: ['What is Axia Atlas?', 'How do I get started?'],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'fee', 'tier', 'plan', 'package', 'seat'],
    answer:
      'There are three plans, Launch, Campaign and Portfolio. Each includes Live Campaigns, Raise Ledger and Theia, with full seats for the people who ask Theia questions, view-only seats for everyone else, live ad channels and investor decks each month. Pricing depends on your raise, so we share it on a demo.',
    links: [L.pricing, L.demo],
    followups: ['What is the difference between seats?', 'How do I get started?'],
  },
  {
    keywords: ['full seat', 'view-only', 'view only', 'difference between seats'],
    answer:
      'A full seat includes Theia: that person can ask questions, build reports and share them. A view-only seat can sign in and read every dashboard and report, without Theia. Most teams give full seats to the people who run the raise and view-only seats to the board and partners.',
    links: [L.pricing, L.demo],
    topic: true,
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['career', 'job', 'jobs', 'hiring', 'work for you', 'join the team', 'open role', 'resume', 'cv'],
    topic: true,
    answer:
      "We're glad you asked. Open roles and how to apply live on our careers page. If your skills fit how we work, we'd love to see your application.",
    links: [L.careers, L.contact],
    followups: ['What is Axia Atlas?', 'Where are you located?'],
  },
  {
    keywords: ['start', 'get started', 'begin', 'sign up', 'onboard', 'first step', 'how do i', 'demo', 'book', 'trial'],
    answer:
      'Book a demo. It is a quick survey, then a walkthrough of Live Campaigns, Raise Ledger and Theia on a demo raise. We talk through your own channels and team, and you leave knowing which plan fits and what it costs.',
    links: [L.demo, L.pricing],
    followups: ['How much does it cost?', 'Is my data secure?'],
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'message'],
    answer:
      'New and prospective clients can email partner@axiaatlas.com. Current clients can reach our team at strategy@axiaatlas.com. We reply within 24 hours, usually the same day. If you want to see the platform, the fastest path is to book a demo.',
    links: [L.contact, L.demo],
    followups: ['How do I get started?', 'What is Axia Atlas?'],
  },
  {
    keywords: ['portal', 'login', 'log in', 'client login', 'sign in', 'account'],
    answer: 'Clients sign in to Axia Atlas at app.axiaatlas.com. There is also a Sign In link at the top of every page.',
    links: [L.signin, L.contact],
    followups: ['How do I get started?', 'What is Theia?'],
  },
  {
    keywords: ['where', 'located', 'location', 'remote', 'city', 'based', 'miami', 'headquarters'],
    answer: "We're headquartered in Miami, working with clients across the US.",
    links: [L.demo, L.contact],
    followups: ['What is Axia Atlas?', 'How do I get started?'],
  },
]

const DEFAULT_LINKS: ChatLink[] = [L.demo, L.contact]
const SUGGESTIONS = ['What is Axia Atlas?', 'What is Theia?', 'How much does it cost?', 'Is my data secure?']

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
    followups: ['What is Axia Atlas?', 'How much does it cost?'],
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
          followups: ['What is Axia Atlas?', 'How do I get started?'],
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
