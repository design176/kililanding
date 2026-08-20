import type { ReactNode } from "react";
import {
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import styles from "./SiteFooter.module.css";

const SOCIALS = [
  { label: "X", href: "https://x.com/scribble_dao", Icon: XLogo },
  { label: "Instagram", href: "https://www.instagram.com/0xscribble", Icon: InstagramLogo },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/0xscribble", Icon: LinkedinLogo },
  { label: "YouTube", href: "https://www.youtube.com/@0xScribble", Icon: YoutubeLogo },
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
      <div className={styles.inner}>
        {heading && (
          <div className={styles.cta}>
            <h2 className={styles.ctaHeading}>{heading}</h2>
            {body && <p className={styles.ctaBody}>{body}</p>}
            <GetStartedButton variant="primary" size="lg" pill>
              Get Started
            </GetStartedButton>
          </div>
        )}

        <div className={styles.bottomRow}>
          <span>Kili by Scribble Network</span>
          <div className={styles.iconGroup}>
            <div className={styles.socials}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
