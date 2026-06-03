'use client'
import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const WELCOME =
  "Hi — I'm the Axia Atlas assistant. Ask me what we do, how we work, our tiers, or how to get started. Pick a question below or type your own."

const CONTACT_LINE =
  "The fastest way to a real answer is a free audit call. Tell us about your goals at axiaatlas.com/contact or email strategy@axiaatlas.com — we reply within 24 hours."

// ── Predetermined Q&A. No API. First entry whose keywords all-or-any match wins. ──
type QA = { keywords: string[]; answer: string }

const QA_SET: QA[] = [
  {
    keywords: ['what do you do', 'what is axia', 'who are you', 'about', 'services overview', 'what you offer'],
    answer:
      "Axia Atlas is a digital marketing studio. We make brands, local businesses, and founders impossible to miss — in Google, in AI answers (ChatGPT, Perplexity, Gemini), in local search, and across social. We start with strategy, then build content and systems that compound month over month.",
  },
  {
    keywords: ['service', 'offer', 'what can you', 'help with'],
    answer:
      "We run eight services: Social Media, AI Search (GEO/AEO), SEO & Content, Local Presence, Founder/Executive Brand, Website Design, Campaigns, and Lead Generation. Most clients combine three or four. See them all at axiaatlas.com/services.",
  },
  {
    keywords: ['ai search', 'chatgpt', 'perplexity', 'gemini', 'geo', 'aeo', 'cited', 'ai answer'],
    answer:
      "AI Search (GEO/AEO) gets you cited inside ChatGPT, Perplexity, and Gemini answers. We audit where you're missing, publish structured content built to be quoted, and track your citations. Buyers ask AI before they ask you — this puts you in the answer.",
  },
  {
    keywords: ['local', 'google business', 'maps', 'near me', 'reviews'],
    answer:
      "Local Presence covers your Google Business Profile, citations, review strategy, and local landing pages — so you win the 'near me' searches and the map pack in your area. It's usually the highest-ROI channel for service businesses.",
  },
  {
    keywords: ['founder', 'executive', 'personal brand', 'linkedin'],
    answer:
      "Founder/Executive Brand builds your authority on LinkedIn and beyond — content in your voice that earns trust before the first call. Great for founders and execs who are the face of the business.",
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'fee'],
    answer:
      "We work in three tiers — Starter, Growth, and Authority — scoped to how fast you want to move. We share exact pricing on your audit call, once we know your goals and what you already have. See what each tier includes at axiaatlas.com/pricing.",
  },
  {
    keywords: ['tier', 'starter', 'growth', 'authority', 'plan', 'package'],
    answer:
      "Three tiers: Starter (one or two channels, get momentum), Growth (multi-channel system, our most popular), and Authority (full-spectrum, founder brand + campaigns). Details at axiaatlas.com/pricing — pricing is shared on a quick audit call.",
  },
  {
    keywords: ['start', 'get started', 'begin', 'sign up', 'onboard', 'first step', 'how do i'],
    answer:
      "Getting started is one step: book a free audit. We review what you have, find the gaps, and tell you the two or three moves that will compound fastest. No 30-day onboarding — work begins in week one. Start at axiaatlas.com/contact.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'book', 'audit', 'demo', 'consult'],
    answer:
      "Book a free 30-minute audit at axiaatlas.com/contact, or email strategy@axiaatlas.com. We reply within 24 hours — usually the same day.",
  },
  {
    keywords: ['portal', 'login', 'log in', 'client login', 'dashboard', 'sign in', 'account'],
    answer:
      "Existing clients can sign in to the portal at app.axiaatlas.com. There's also a Client Login button at the top of every page.",
  },
  {
    keywords: ['where', 'located', 'location', 'remote', 'city', 'based'],
    answer:
      "We're based in Toronto and work with clients across North America and beyond — fully remote, with regular strategy calls and live reporting.",
  },
  {
    keywords: ['b2c', 'consumer', 'ecommerce', 'e-commerce', 'retail', 'shop', 'brand'],
    answer:
      "Yes — we work with B2C and consumer brands as well as B2B. The playbook adapts: the goal is the same, making you impossible to miss where your buyers actually spend attention.",
  },
  {
    keywords: ['result', 'guarantee', 'roi', 'work', 'proof', 'case study', 'results'],
    answer:
      "We measure success in pipeline, rankings, citations, and compounding assets — not posts published. See real outcomes at axiaatlas.com/case-studies. We only take on work we believe we can move.",
  },
]

const SUGGESTIONS = ['What do you do?', 'What are your tiers?', 'How do I get started?', 'How do I contact you?']

function findAnswer(text: string): string {
  const q = text.toLowerCase()
  for (const qa of QA_SET) {
    if (qa.keywords.some(k => q.includes(k))) return qa.answer
  }
  return `Good question — I don't have a canned answer for that one. ${CONTACT_LINE}`
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
    setMessages(m => [
      ...m,
      { role: 'user', content: text },
      { role: 'assistant', content: findAnswer(text) },
    ])
  }

  const showSuggestions = messages.length <= 1

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Axia Atlas assistant">
          <div className="chat-panel-header">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-amark-bone.svg" alt="Axia Atlas" />
            <span className="chat-panel-title">Ask Axia Atlas</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
            ))}

            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map(s => (
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
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question…"
            />
            <button className="chat-send" onClick={() => send()} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button className="chat-btn" onClick={() => setOpen(o => !o)} aria-label="Open chat">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-amark-bone.svg" alt="Chat" />
      </button>
    </>
  )
}
