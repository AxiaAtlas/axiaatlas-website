'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setDone(true)
  }

  if (done) {
    return <p style={{ color: 'var(--sage)', fontSize: 13, fontWeight: 600 }}>✓ You&apos;re on the list. We&apos;ll be in touch.</p>
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn-primary">Subscribe</button>
    </form>
  )
}
