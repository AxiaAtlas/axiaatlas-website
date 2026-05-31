'use client'
import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const WELCOME = 'Hi! Ask me anything about Axia Atlas services, pricing, or how we work.'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Sorry, I couldn\'t process that. Email us at strategy@axiaatlas.com' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong. Email us at strategy@axiaatlas.com' }])
    }
    setLoading(false)
  }

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-amark-bone.svg" alt="Axia Atlas" />
            <span className="chat-panel-title">Ask us anything</span>
            <button className="chat-close" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && (
              <div className="chat-msg assistant" style={{ opacity: 0.5 }}>Thinking…</div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button className="chat-send" onClick={send} disabled={loading} aria-label="Send">
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
