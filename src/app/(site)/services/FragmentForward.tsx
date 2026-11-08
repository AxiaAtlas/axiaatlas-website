'use client'
import { useEffect } from 'react'

/* Old links point at rows that used to live on this page (/services#geo).
   A fragment never reaches the server, so next.config.mjs cannot 301 it; this
   forwards it in the browser to the same place the /services/<id> redirects
   send. Keep the two maps in step. */
const FORWARD: Record<string, string> = {
  website: '/services/website-design',
  social: '/services/social-media-management',
  geo: '/services/add-ons#seo-aeo',
  seo: '/services/add-ons#seo-aeo',
  local: '/services/add-ons#local',
  leadgen: '/services/add-ons#lead-generation',
  executive: '/services/add-ons#executive-brand',
  intel: '/services/add-ons#competitive-intelligence',
  strategy: '/services/add-ons#strategic-advisory',
  dashboards: '/services/add-ons#custom-dashboards',
}

export default function FragmentForward() {
  useEffect(() => {
    const to = FORWARD[window.location.hash.slice(1)]
    if (to) window.location.replace(to)
  }, [])
  return null
}
