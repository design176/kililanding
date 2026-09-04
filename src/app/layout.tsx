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
import Script from 'next/script';
import { Retune } from 'retune';
import { Providers } from './providers';
import { SITE_URL } from '@/lib/site-url';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

// Heading font options (Satoshi, the default, is Fontshare-only - loaded via
// the @import in globals.css instead, see src/lib/fonts.ts). Not the default,
// so `preload: false` - they're only ever needed if the visitor switches to
// them in the settings modal, and preloading all of them on every page load
// costs real FCP/LCP for weight nobody's using yet.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  preload: false,
});
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});
const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});

// Body font options - same reasoning: none of these is the default, so none
// should preload.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], weight: 'variable', preload: false });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], weight: 'variable', preload: false });
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: 'variable',
  preload: false,
});
const sora = Sora({ variable: '--font-sora', subsets: ['latin'], weight: 'variable', preload: false });

// The site's one monospace font (mockup/terminal chrome) - not user-selectable.
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

const TITLE = 'Kili';
const DESCRIPTION = "we're figuring out who pays for ai.";
const OG_IMAGE = { url: '/og.png', width: 1512, height: 812 };

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

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: TITLE,
  url: SITE_URL,
  description: DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={FONT_VARIABLES}
      data-theme='dark'
      suppressHydrationWarning
    >
      <head>
        {/* Satoshi (globals.css) is the one font still loaded via external
            @import rather than next/font - warm the connection for it. */}
        <link rel='preconnect' href='https://api.fontshare.com' crossOrigin='anonymous' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      {!isDev && (
        <>
          <Analytics />
          <GoogleTagManager gtmId='GTM-WX32SVGQ' />
        </>
      )}
      <body>
        <Providers>{children}</Providers>
        {/* No `force` - renders only when NODE_ENV is "development", i.e. `npm run dev`, never in a production build. */}
        <Retune />
        {!isDev && (
          <Script
            id='gravity-pixel'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `!function(w,d,t,u,n,a,m){w['GravityPixelObject']=n;w[n]=w[n]||function(){
(w[n].q=w[n].q||[]).push(arguments)},w[n].l=1*new Date();a=d.createElement(t),
m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
}(window,document,'script','https://code.trygravity.ai/gr-pix.js','gravity');
gravity('init', 'bf55ad8b-3ec3-43ae-8f5c-59b6df49e360');`,
            }}
          />
        )}
      </body>
    </html>
  );
}
