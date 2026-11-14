/* What masking does, drawn on sample data: the same sentence as it sits in
   your workspace and as analysis receives it. Names become placeholders,
   figures are multiplied by a secret factor (6, for the illustration), and a
   rate passes through unchanged. Every claim it illustrates is a "May say"
   sentence in the platform's docs/security/privacy-claims.md (rows 1 and 2). */
const M = ({ children }: { children: React.ReactNode }) => <mark className="mask-tok">{children}</mark>

export default function MaskingFigure() {
  return (
    <figure className="masking rv">
      <div className="masking-grid">
        <div className="masking-card card">
          <div className="label">In your workspace</div>
          <p>
            <M>Kova</M> raised <M>$1,839,816</M> from <M>1,212</M> investors. Meta’s click rate was <span className="mask-same">1.42%</span>.
            Contact: <M>Maya Chen</M>, <M>maya@kova.example</M>
          </p>
        </div>
        <div className="masking-arrow" aria-hidden="true">
          <svg viewBox="0 0 48 12"><path d="M0 6h44M39 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </div>
        <div className="masking-card card">
          <div className="label">What analysis receives</div>
          <p>
            <M>[Company 1]</M> raised <M>$11,038,896</M> from <M>7,272</M> investors. Meta’s click rate was <span className="mask-same">1.42%</span>.
            Contact: <M>[Person 1]</M>, <M>[Email 1]</M>
          </p>
        </div>
      </div>
      <figcaption>Illustration on sample data. Names become placeholders and every figure is multiplied by a secret factor (6, here), while a rate such as click rate comes out unchanged. The real names and figures are put back only inside your workspace.</figcaption>
    </figure>
  )
}
