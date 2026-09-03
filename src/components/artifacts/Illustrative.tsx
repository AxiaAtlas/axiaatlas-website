/* ────────────────────────────────────────────────────────────────────────────
   THE LABEL THAT MAKES AN ARTIFACT HONEST — AND WHERE IT STOPPED EARNING ITS
   PLACE.

   We sell measurement, so an artifact that could be mistaken for a record has
   to say on itself that it is not one. That is still the rule. What the third
   pass settled is the SCOPE of it: the test is whether a crop of the artifact
   could be read as a real record of somebody, not whether it contains an
   invented number.

     <Illustrative />  the content could pass for a real record. Used on the
                       mock search result list, where four business names above
                       an empty fifth slot is exactly the shape of a real SERP
                       screenshot. Default wording: "Not a real search".

   WHAT CAME OFF. The hero's visibility audit carried "Sample data" and does
   not any more. It sits under the H1, beside a Book a Demo button, on a page
   the visitor reached before giving us a domain — there is no client to
   attribute it to and no reading of it in which four labelled channel bars are
   somebody's actual audit. The tag was answering a charge nobody had made, and
   a disclaimer in that position reads as an apology for the graphic. The
   portal shot lost its badge earlier for the same reason (see PortalShot.tsx).

   ON THE WORDING. It read "Illustrative", which is the word a designer reaches
   for and not the one a reader needs: it describes the graphic's function
   rather than saying what the reader is looking at. The default is "Not a real
   search" — the sentence the label exists to make. Two alternatives were on the
   table and are recorded here so the next person does not re-litigate it:
   "Example", which is shorter but leaves open "an example of a real one?"; and
   "Mock-up", which is jargon in the other direction. The default names the
   exact thing it must not be mistaken for, which is the job.

   The label lives INSIDE the frame, never as a caption underneath, because the
   crop that ends up in a deck or a screenshot never includes the caption.
   ──────────────────────────────────────────────────────────────────────────── */

export function Illustrative({ children = 'Not a real search' }: { children?: string }) {
  return <span className="artifact-tag">{children}</span>
}
