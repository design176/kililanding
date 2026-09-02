"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XLogo, LinkedinLogo, DiscordLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { Button } from "@/components/ui/Button";
import styles from "./SiteNav.module.css";

const ICON_SOCIALS = [
  { label: "X", href: "https://x.com/trykili", Icon: XLogo },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/trykili/about/",
    Icon: LinkedinLogo,
  },
];

const DISCORD_URL = "https://discord.gg/vNvkVK24bw";

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateNav = () => setIsScrolled(window.scrollY > 24);

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className={styles.nav} data-scrolled={isScrolled}>
      <div className={styles.navInner} data-menu-open={isMenuOpen}>
        <Link className={styles.logoLink} href="/" aria-label="Kili home">
          <Logo width={70} />
        </Link>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          <div className={styles.audienceLinks} id="mobile-nav-menu">
            <Link href="/advertiser" onClick={() => setIsMenuOpen(false)}>
              For advertisers
            </Link>
            <a
              href="https://docs.trykili.ai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </a>

            <hr className={styles.mobileDivider} />

            <div className={styles.mobileSocials}>
              {ICON_SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="secondary" size="lg" iconOnly>
                    <Icon size={16} weight="bold" aria-hidden="true" />
                  </Button>
                </a>
              ))}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="secondary" size="lg">
                  <DiscordLogo size={16} weight="bold" aria-hidden="true" />
                  Join Community
                </Button>
              </a>
            </div>
          </div>
          <div className={styles.navButtons}>
            <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
            <button
              className={styles.menuToggle}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-nav-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
