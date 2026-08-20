import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Providers } from './providers';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'kili',
  description: "we're figuring out who pays for ai.",
  openGraph: {
    title: 'kili',
    description: "we're figuring out who pays for ai.",
    images: [{ url: '/og.png', width: 1512, height: 812 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kili',
    description: "we're figuring out who pays for ai.",
    images: ['/og.png'],
  },
};

const isDev = process.env.APP_ENV === 'dev';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={workSans.variable} suppressHydrationWarning>
      {!isDev && (
        <>
          <Analytics />
          <GoogleTagManager gtmId='GTM-WX32SVGQ' />
        </>
      )}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
