import { AEO, ORG_DESCRIPTION, PATHS, PRODUCTS, TAGLINE, TAGLINE_2 } from '@/lib/site'
import { SITE_URL } from '@/lib/seo'

/* /llms.txt: the site in plain text for answer engines, per the llms.txt
   convention. The header block is saas-copy.md section 6's; the Q&As are the
   same strings the pages, the FAQPage JSON-LD and the chat widget use
   (lib/site AEO), so this file cannot drift from what the site says. */
export const dynamic = 'force-static'

const PAGES: [string, string, string][] = [
  ['Investment platform', PATHS.platform, `${PRODUCTS.live} and ${PRODUCTS.ledger}: every ad platform, campaign and channel behind a raise, set against reported investments.`],
  ['Theia', PATHS.theia, `${PRODUCTS.ask} and ${PRODUCTS.reports}: the proprietary AI-powered analysis assistant built into Axia Atlas.`],
  ['Security and privacy', PATHS.security, 'How names and figures are masked before analysis, and how data is encrypted.'],
  ['Pricing', PATHS.pricing, 'Launch, Campaign and Portfolio plans. Pricing is shared on a demo.'],
  ['Website design', PATHS.website, 'Websites designed and built as one-off projects, separate from the platform.'],
  ['About', PATHS.about, 'The company behind Axia Atlas and Theia.'],
  ['Contact', PATHS.contact, 'partner@axiaatlas.com for new enquiries, strategy@axiaatlas.com for current clients.'],
  ['Book a demo', PATHS.demo, 'A walkthrough on a demo raise.'],
]

export function GET() {
  const body = [
    '# Axia Atlas',
    '',
    `> ${ORG_DESCRIPTION}`,
    '',
    `Slogan: ${TAGLINE}. Tagline: ${TAGLINE_2}.`,
    `Products: ${PRODUCTS.live}, ${PRODUCTS.ledger}, ${PRODUCTS.reports}, ${PRODUCTS.ask}.`,
    '',
    '## Pages',
    '',
    ...PAGES.map(([name, path, what]) => `- [${name}](${SITE_URL}${path}): ${what}`),
    '',
    '## Questions and answers',
    '',
    ...AEO.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
