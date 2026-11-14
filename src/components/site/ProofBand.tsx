/* The proof row: which channels Axia Atlas reads.

   Only connectors that are live are named as live. Source:
   axiaatlas-platform (origin/preview/staging) src/lib/invest/connectors/index.ts
   (Meta Ads, Google Ads, LinkedIn Ads, each liveSync in platforms.ts) and
   src/lib/invest/raise/platforms.ts (DealMaker read by API). Everything else
   in those files is read from its export, so it is listed as imported.
   LinkedIn Ads is live too but is not featured (Amit, 13 Nov 2026). */
export const LIVE_CHANNELS = ['Meta Ads', 'Google Ads', 'DealMaker']
export const IMPORTED = ['Microsoft Ads', 'X Ads', 'StartEngine', 'Republic', 'Wefunder']

export default function ProofBand({ mark }: { mark: string }) {
  return (
    <section data-aa-section={mark} className="proof">
      <div className="wrap proof-grid">
        <div className="proof-cell">
          <span className="badge badge-live">Read live</span>
          <p className="proof-names">{LIVE_CHANNELS.join(' · ')}</p>
        </div>
        <div className="proof-cell">
          <span className="badge badge-manual">Imported</span>
          <p className="proof-names">{IMPORTED.join(' · ')} and other exports</p>
        </div>
        <div className="proof-cell">
          <span className="badge badge-manual">By hand</span>
          <p className="proof-names">Affiliates · newspapers · press</p>
        </div>
      </div>
    </section>
  )
}
