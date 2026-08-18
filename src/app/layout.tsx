import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "kili",
  description: "we're figuring out who pays for ai.",
  openGraph: {
    title: "kili",
    description: "we're figuring out who pays for ai.",
    images: [{ url: "/og.png", width: 1512, height: 812 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kili",
    description: "we're figuring out who pays for ai.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={workSans.variable}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
