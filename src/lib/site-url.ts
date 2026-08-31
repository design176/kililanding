/**
 * Absolute base URL for this deployment. Vercel supplies the production
 * domain automatically; set NEXT_PUBLIC_SITE_URL to override it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
