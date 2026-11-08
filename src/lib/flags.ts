/* ════════════════════════════════════════════════════════════════════════════
   THEIA LAUNCH FLAG

   The portal and Theia are a relaunch. Until NEXT_PUBLIC_THEIA_LAUNCH is
   "true", nothing about either may be live: /services/portal and /theia answer
   404, they stay out of the sitemap, the nav and the footer, and the home page,
   /services, /pricing, /contact and the chat widget leave them out.

   Switch it on in Vercel (Production) and redeploy. No code change is needed.
   ════════════════════════════════════════════════════════════════════════════ */
export const THEIA_LAUNCH = process.env.NEXT_PUBLIC_THEIA_LAUNCH === 'true'
