import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Retune } from 'retune';
import { Providers } from './providers';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const TITLE = 'kili';
const DESCRIPTION = "we're figuring out who pays for ai.";
const OG_IMAGE = { url: '/og.png', width: 1512, height: 812 };

/**
 * Absolute base for the OG/Twitter image URLs. Vercel supplies the production
 * domain automatically; set NEXT_PUBLIC_SITE_URL to override it.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

// Analytics and tag manager are skipped on local/dev environments.
const isDev = process.env.APP_ENV === 'dev';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={workSans.variable}
      data-theme='dark'
      suppressHydrationWarning
    >
      {!isDev && (
        <>
          <Analytics />
          <GoogleTagManager gtmId='GTM-WX32SVGQ' />
        </>
      )}
      <body>
        <Providers>{children}</Providers>
        <Retune hotkey='alt+e' />
      </body>
    </html>
  );
}
