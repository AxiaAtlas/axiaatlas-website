import { NextRequest, NextResponse } from 'next/server'

// Logs chat-widget conversations to chat_conversations (read by the portal's
// Site Chats view). Called fire-and-forget from the widget — this route never
// throws outward and the widget never waits on it.

const MAX_MESSAGES = 200
const MAX_TEXT = 2000

type LoggedMessage = { role: string; text: string; at?: string }

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Prefer the service-role key when configured; the anon key works too via
  // the chat_conversations insert/update policies.
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  try {
    const body = await req.json()
    const { sessionId, page, referrer, visitor, messages } = body

    if (typeof sessionId !== 'string' || !sessionId || !Array.isArray(messages)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const thread: LoggedMessage[] = messages
      .slice(0, MAX_MESSAGES)
      .filter((m: any) => m && typeof m.text === 'string')
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        text: String(m.text).slice(0, MAX_TEXT),
        at: typeof m.at === 'string' ? m.at : undefined,
      }))

    const record: Record<string, unknown> = {
      session_id: sessionId.slice(0, 100),
      page: typeof page === 'string' ? page.slice(0, 300) : null,
      referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : null,
      messages: thread,
      message_count: thread.length,
      updated_at: new Date().toISOString(),
    }

    // Identifying info, only when the visitor shared it (omitted fields are
    // left untouched on upsert, so earlier captures aren't overwritten).
    if (visitor && typeof visitor === 'object') {
      if (typeof visitor.name === 'string' && visitor.name) record.visitor_name = visitor.name.slice(0, 120)
      if (typeof visitor.email === 'string' && visitor.email) record.visitor_email = visitor.email.slice(0, 200)
      if (typeof visitor.phone === 'string' && visitor.phone) record.visitor_phone = visitor.phone.slice(0, 50)
      if (typeof visitor.company === 'string' && visitor.company) record.visitor_meta = { company: visitor.company.slice(0, 200) }
    }

    // Upsert by session_id: first message inserts the row, every message after
    // that replaces the stored thread with the full, current one.
    await fetch(`${supabaseUrl}/rest/v1/chat_conversations?on_conflict=session_id`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(record),
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Logging must never surface an error to the widget.
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
