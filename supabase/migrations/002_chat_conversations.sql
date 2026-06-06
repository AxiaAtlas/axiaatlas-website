-- ============================================================
-- 002 — Chat-widget conversation logging
--
-- The chat_conversations table is also defined in platform migration
-- 012 (the portal's Site Chats view reads it). Both files are
-- idempotent — run this one and the table + widget-write policies
-- are correct regardless of whether 012 already ran.
--
-- Safe to run multiple times.
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_conversations (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id    text,
  page          text,                       -- page the chat happened on
  referrer      text,
  visitor_name  text,
  visitor_email text,
  visitor_phone text,
  visitor_meta  jsonb DEFAULT '{}'::jsonb,  -- anything else captured (e.g. company)
  messages      jsonb DEFAULT '[]'::jsonb,  -- [{ role, text, at }]
  message_count integer DEFAULT 0,
  status        text DEFAULT 'open',
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_conversations_created_idx ON chat_conversations(created_at DESC);

-- The widget upserts the whole thread keyed by session_id on every message,
-- so session_id must be unique (NULLs from any legacy rows are still allowed).
CREATE UNIQUE INDEX IF NOT EXISTS chat_conversations_session_uidx ON chat_conversations(session_id);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "chat_conversations_admin"  ON chat_conversations;
DROP POLICY IF EXISTS "chat_conversations_insert" ON chat_conversations;
DROP POLICY IF EXISTS "chat_conversations_update" ON chat_conversations;

-- Admins (portal) read and manage everything.
CREATE POLICY "chat_conversations_admin"
  ON chat_conversations FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- The website logs with the anon key: insert a conversation row, then
-- update it as the thread grows. SELECT stays admin-only, so transcripts
-- can never be read back with the public key.
CREATE POLICY "chat_conversations_insert"
  ON chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "chat_conversations_update"
  ON chat_conversations FOR UPDATE USING (true) WITH CHECK (true);

GRANT ALL ON chat_conversations TO anon, authenticated;
