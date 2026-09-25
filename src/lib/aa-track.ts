/* On-site behavior tracker calls (axiaatlas-platform docs/site-behavior-tracking.md).
   Goes through the window.aaq queue so it works whether or not the script has
   loaded yet, and does nothing when it never loads (no site key, GPC/DNT). */
type AaCall =
  | ['chat', 'open']
  | ['chat', 'message' | 'close', number]
  | ['formSubmit', string]

export function aaTrack(...call: AaCall) {
  try {
    const w = window as unknown as { aaq?: { push: (c: AaCall) => void } }
    const q = w.aaq ?? (w.aaq = [] as AaCall[])
    q.push(call)
  } catch {
    // Tracking must never break the page.
  }
}
