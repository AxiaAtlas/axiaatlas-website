'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AMark } from './Logo'
import { Send, Arrow } from './icons'

type ChatLink = { label: string; href: string }
type Message = { role: 'user' | 'assistant'; content: string; links?: ChatLink[]; followups?: string[] }

const WELCOME =
  "Hi — I'm the Axia Atlas assistant. Ask me what we do, how we work, our tiers, or how to get started. Pick a question below or type your own."

// ── Predetermined Q&A. No external calls. First entry that matches wins. ──
type QA = { keywords: string[]; answer: string; links?: ChatLink[]; followups: string[] }

const L = {
  demo: { label: 'Book a free audit', href: '/demo' },
  services: { label: 'See all services', href: '/services' },
  pricing: { label: 'View pricing', href: '/pricing' },
  cases: { label: 'See results', href: '/case-studies' },
  contact: { label: 'Contact us', href: '/contact' },
} satisfies Record<string, ChatLink>

const QA_SET: QA[] = [
  {
    keywords: ['what do you do', 'what is axia', 'who are you', 'about', 'services overview', 'what you offer'],
    answer:
      'Axia Atlas is a digital marketing studio. We make brands, local businesses, and founders impossible to miss — in Google, in answer engines (ChatGPT, Perplexity, Gemini), in local search, and across social. We start with strategy, then build content and systems that compound.',
    links: [L.services, L.demo],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['service', 'offer', 'what can you', 'help with', 'channels'],
    answer:
      'We run eight services: Social Media, Answer-Engine Optimization (GEO/AEO), SEO & Content, Local Presence, Founder/Executive Brand, Website Design, Campaigns, and Lead Generation. Most clients combine three or four.',
    links: [L.services, L.demo],
    followups: ['How does answer-engine optimization work?', 'What are your tiers?'],
  },
  {
    keywords: ['answer engine', 'chatgpt', 'perplexity', 'gemini', 'geo', 'aeo', 'cited', 'answer'],
    answer:
      "Answer-Engine Optimization (GEO/AEO) gets you cited inside ChatGPT, Perplexity, and Gemini results. We audit where you're missing, publish structured content built to be quoted, and track your citations over time.",
    links: [{ label: 'AEO details', href: '/services#geo' }, L.demo],
    followups: ['How long until I see results?', 'How much does it cost?'],
  },
  {
    keywords: ['local', 'google business', 'maps', 'near me', 'reviews'],
    answer:
      "Local Presence covers your Google Business Profile, citations, review strategy, and local landing pages — so you win the 'near me' searches and the map pack. It's usually the highest-ROI channel for service businesses.",
    links: [{ label: 'Local details', href: '/services#local' }, L.demo],
    followups: ['What services do you offer?', 'How do I get started?'],
  },
  {
    keywords: ['founder', 'executive', 'personal brand', 'linkedin'],
    answer:
      'Founder/Executive Brand builds your authority on LinkedIn and beyond — content in your voice that earns trust before the first call. Great for founders and execs who are the face of the business.',
    links: [{ label: 'Founder brand details', href: '/services#executive' }, L.demo],
    followups: ['What are your tiers?', 'See some results?'],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'fee'],
    answer:
      'We work in three tiers — Starter, Growth, and Authority — scoped to how fast you want to move. Exact pricing is shared on your free audit call, once we know your goals. See what each tier includes:',
    links: [L.pricing, L.demo],
    followups: ['What are your tiers?', 'How do I get started?'],
  },
  {
    keywords: ['tier', 'starter', 'growth', 'authority', 'plan', 'package'],
    answer:
      'Three tiers: Starter (one or two channels, get momentum), Growth (multi-channel system, our most popular), and Authority (full-spectrum, founder brand + campaigns).',
    links: [L.pricing, L.demo],
    followups: ['How much does it cost?', 'How do I get started?'],
  },
  {
    keywords: ['start', 'get started', 'begin', 'sign up', 'onboard', 'first step', 'how do i', 'audit', 'demo', 'book', 'consult'],
    answer:
      "Getting started is one step: book a free audit. It's a quick two-step survey — your business, then your goals. We review what you have, find the gaps, and tell you the two or three moves that will compound fastest. Work begins in week one.",
    links: [L.demo, L.services],
    followups: ['How much does it cost?', 'See some results?'],
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'message', 'question'],
    answer:
      'You can send us a message any time and we reply within 24 hours — usually the same day. Or, if you’re ready to start, the fastest path is a free audit.',
    links: [L.contact, L.demo],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['portal', 'login', 'log in', 'client login', 'dashboard', 'sign in', 'account'],
    answer:
      'Existing clients can sign in to the portal at app.axiaatlas.com — there’s also a Client Login button at the top of every page.',
    links: [{ label: 'Client login', href: 'https://app.axiaatlas.com' }, L.contact],
    followups: ['How do I get started?', 'What services do you offer?'],
  },
  {
    keywords: ['where', 'located', 'location', 'remote', 'city', 'based'],
    answer:
      "We're based in Toronto and work with clients across North America and beyond — fully remote, with regular strategy calls and live reporting.",
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

function answerFor(text: string): Message {
  const q = text.toLowerCase()
  for (const qa of QA_SET) {
    if (qa.keywords.some((k) => q.includes(k))) {
      return { role: 'assistant', content: qa.answer, links: qa.links, followups: qa.followups }
    }
  }
  return {
    role: 'assistant',
    content:
      "Good question — I don't have a canned answer for that one. The fastest way to a real answer is a free audit, or send us a message and we'll reply within 24 hours.",
    links: DEFAULT_LINKS,
    followups: ['What services do you offer?', 'What are your tiers?'],
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send(preset?: string) {
    const text = (preset ?? input).trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }, answerFor(text)])
  }

  const showSuggestions = messages.length <= 1
  const lastAssistant = messages.map((m) => m.role).lastIndexOf('assistant')

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Axia Atlas assistant">
          <div className="chat-panel-header">
            <AMark className="amark" />
            <div style={{ flex: 1 }}>
              <div className="chat-panel-title">Ask Axia Atlas</div>
              <span className="chat-status"><span className="dot" /> Typically replies in 24h</span>
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
        </div>
      )}

      <button className="chat-btn" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        <AMark className="amark" />
      </button>
    </>
  )
}
