/* ────────────────────────────────────────────────────────────────────────────
   THE LABEL THAT MAKES AN ARTIFACT HONEST.

   We sell measurement. Every artifact on this site is therefore one of exactly
   two things, and it says which ON ITSELF:

     <Sample />        the numbers are representative, not a real client's.
                       Used on the visibility audit in the hero, which shows the
                       shape of a deliverable rather than anybody's actual one.
     <Illustrative />  the content is a generic stand-in, not a real record.
                       Used for the mock result list.

   ON THE WORDING OF THE SECOND ONE. It read "Illustrative", which is the word a
   designer reaches for and not the one a reader needs: it describes the
   graphic's function rather than saying what the reader is looking at. The
   default is "Not a real search" — the sentence the label exists to make. Two
   alternatives were on the table and are recorded here so the next person does
   not re-litigate it: "Example", which is shorter but leaves open "an example
   of a real one?"; and "Mock-up", which is jargon in the other direction. The
   default names the exact thing it must not be mistaken for, which is the job.

   The label lives INSIDE the frame, never as a caption underneath, because the
   crop that ends up in a deck or a screenshot never includes the caption. If an
   artifact cannot carry one of these two labels inside its own border, it does
   not belong on the page.
   ──────────────────────────────────────────────────────────────────────────── */

export function Sample({ children = 'Sample data' }: { children?: string }) {
  return <span className="artifact-tag">{children}</span>
}

export function Illustrative({ children = 'Not a real search' }: { children?: string }) {
  return <span className="artifact-tag">{children}</span>
}
