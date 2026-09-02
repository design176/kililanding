import type { ReactNode } from "react";
import Link from "next/link";
import { XLogo, LinkedinLogo, DiscordLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MoneyNoiseBackground } from "@/components/home/MoneyNoiseBackground";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { Button } from "@/components/ui/Button";
import styles from "./SiteFooter.module.css";

const DISCORD_URL = "https://discord.gg/vNvkVK24bw";

const SOCIALS = [
  { label: "X", href: "https://x.com/trykili", Icon: XLogo },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/trykili/about/",
    Icon: LinkedinLogo,
  },
  { label: "Discord", href: "https://discord.gg/vNvkVK24bw", Icon: DiscordLogo },
];

const PRODUCT_LINKS = [
  { label: "For Advertisers", href: "/advertiser" },
  { label: "Docs", href: "https://docs.trykili.ai/" },
];

export function SiteFooter({
  heading,
  body,
}: {
  /** Optional closing-CTA heading shown above the footer nav row. */
  heading?: ReactNode;
  body?: string;
}) {
  return (
    <footer className={styles.footer}>
      <MoneyNoiseBackground />
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logoLink} aria-label="Kili home">
              <Logo width={84} />
            </Link>
            {heading && <h2 className={styles.ctaHeading}>{heading}</h2>}
            {body && <p className={styles.ctaBody}>{body}</p>}
            <div className={styles.ctaButtons}>
              <GetStartedButton variant="primary" size="lg" pill>
                Get Started
              </GetStartedButton>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" pill>
                  <DiscordLogo size={18} aria-hidden="true" />
                  Join Community
                </Button>
              </a>
            </div>
          </div>

          <nav className={styles.navColumns} aria-label="Footer navigation">
            <div className={styles.navColumn}>
              <h3 className={styles.navHeading}>Social</h3>
              <ul className={styles.navList}>
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      className={styles.navLink}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={17} aria-hidden="true" />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.navColumn}>
              <h3 className={styles.navHeading}>Product</h3>
              <ul className={styles.navList}>
                {PRODUCT_LINKS.map(({ label, href }) =>
                  href.startsWith("/") ? (
                    <li key={label}>
                      <Link className={styles.navLink} href={href}>
                        {label}
                      </Link>
                    </li>
                  ) : (
                    <li key={label}>
                      <a
                        className={styles.navLink}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottomRow}>
          <span>Kili by Scribble Network</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
