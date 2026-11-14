# Films for axiaatlas.com

Five named film slots wait in `src/lib/films.ts`. Until a film exists, each slot plays its mock interaction (code, sample data), so nothing on the site is empty. To ship a film, put the files in `public/media/films/`, fill in `src` and `poster` for that slot, and open a preview PR.

## For every film

- Dark only, in the portal's Theia look. Real product, recorded on the Kova sample raise. No real client, no real person's name (check the sidebar user and every share dialog), no provider names.
- 16:9, master at 3840 x 2160, delivered at 1920 x 1080. 24 fps, to match the logo frames.
- Silent. The site plays films muted and looped; any words on screen are product UI or a single line of Montserrat 600 caps.
- Deliver: `<slot>.mp4` (H.264, 6 to 8 Mbps, under 8 MB for 30 s), `<slot>.webm` (VP9 or AV1), and `<slot>-poster.webp` (the first frame, 1920 wide).
- Calm: slow push-ins and pans, one idea per shot, cuts on the beat of an interaction, no whip pans, no stock footage.
- Also cut a 9:16 version of each for social (2160 x 3840).

## The five films

| Slot | Length | What happens |
|---|---|---|
| `home-hero` | 45 to 60 s | The Axia Atlas mark on black, waves fade up. "Everything in sight." Push into Live Campaigns: every channel's spend counts up, a filter is clicked. Cut to Raise Ledger: the funnel fills, cost per investor by channel, Live and Manual badges. Cut to Ask Theia: a question is typed, the thinking mark loops, the answer writes in with its chart. Cut to Theia Reports: the deck builds, a flagged slide. A share link is copied. End on the Axia Atlas mark and "Growth, engineered." |
| `live-campaigns` | 30 s | All channels in one view. Tiles count up, the 30-day chart draws. The Meta filter is clicked and the view narrows to Meta and its campaigns. Drill into one campaign, then one creative. A chart opens, zooms and exports. |
| `raise-ledger` | 30 s | The investor funnel fills (visits, started investing, invested). The channel table builds: Meta and Google Search marked Live, Affiliates and the newspaper marked Manual. A Manual row is added by hand. Cost per investor by channel settles, lowest to highest. |
| `ask-theia` | 30 s | "Why did our click rate fall over the last three weeks?" is typed and sent. The thinking mark loops while the steps tick. The answer writes in under four headings: what happened, where it fell (the chart draws), why (three creatives named), what we recommend. A follow-up is offered. |
| `theia-reports` | 30 s | "Build the October investor report." The deck builds slide by slide beside the chat (pack sequence B01 to B07 is the reference). Theia flags the Meta slide. A comment is left on a slide and Theia revises it. Present, then Share: Can view, Copy link. |

The pack's README suggests shot orders for the Ask and Build sequences (A02 to A10, B01 to B07) and the logo (reveal, then thinking). Those screens show the pack's own demo content; the films should be recorded fresh on Kova so the story matches the site.
