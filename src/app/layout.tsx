import type { Metadata } from 'next';
import {
  Work_Sans,
  Fraunces,
  Instrument_Serif,
  Newsreader,
  Playfair_Display,
  Source_Serif_4,
  Inter,
  Manrope,
  Plus_Jakarta_Sans,
  DM_Sans,
  Sora,
  Geist_Mono,
} from 'next/font/google';
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

// Heading font options (Satoshi, the default, is Fontshare-only — loaded via
// the @import in globals.css instead, see src/lib/fonts.ts).
const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'], weight: 'variable' });
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
});
const newsreader = Newsreader({ variable: '--font-newsreader', subsets: ['latin'], weight: 'variable' });
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: 'variable',
});
const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  subsets: ['latin'],
  weight: 'variable',
});

// Body font options.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], weight: 'variable' });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], weight: 'variable' });
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: 'variable',
});
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], weight: 'variable' });
const sora = Sora({ variable: '--font-sora', subsets: ['latin'], weight: 'variable' });

// The site's one monospace font (mockup/terminal chrome) — not user-selectable.
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], weight: 'variable' });

const FONT_VARIABLES = [
  workSans.variable,
  fraunces.variable,
  instrumentSerif.variable,
  newsreader.variable,
  playfairDisplay.variable,
  sourceSerif4.variable,
  inter.variable,
  manrope.variable,
  plusJakartaSans.variable,
  dmSans.variable,
  sora.variable,
  geistMono.variable,
].join(' ');

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
      className={FONT_VARIABLES}
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
