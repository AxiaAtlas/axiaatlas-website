import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are a friendly representative for Axia Atlas, a strategy-first digital marketing agency.
You help website visitors understand our services and whether Axia Atlas is right for them.
Our services: Social Media Strategy, GEO/AEO, SEO & Content Marketing, Local Digital Presence, Executive Brand, Website Design, Campaigns, Lead Generation.
Our tiers: Starter ($1,200-2,000/mo), Growth ($2,500-4,500/mo), Authority ($5,000-8,000/mo).
Our tagline: Growth, Engineered.
To book a consultation: strategy@axiaatlas.com
Be direct, helpful, and never use jargon. Keep responses under 3 sentences.
Do not mention any tools, AI, or technology — focus only on outcomes and strategy.`

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_KEY
  if (!apiKey) return NextResponse.json({ reply: 'Chat unavailable. Email us at strategy@axiaatlas.com' })

  const { messages } = await req.json()
  const apiMessages = messages.map((m: any) => ({ role: m.role, content: m.content }))

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM,
      messages: apiMessages.filter((m: any) => m.role !== 'system'),
    }),
  })

  if (!res.ok) return NextResponse.json({ reply: 'Sorry, I couldn\'t process that. Email us at strategy@axiaatlas.com' })

  const data = await res.json()
  const reply = data.content?.[0]?.text || 'Email us at strategy@axiaatlas.com'
  return NextResponse.json({ reply })
}
