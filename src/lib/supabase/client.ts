import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Public (browser-safe) config. When these are absent — e.g. a build with no
// env, or local dev before .env.local is filled — we fall back to a harmless
// placeholder client. Queries then fail at runtime and every caller already
// wraps them in try/catch to fall back to placeholder content, so the site
// renders cleanly either way instead of crashing at module load.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
