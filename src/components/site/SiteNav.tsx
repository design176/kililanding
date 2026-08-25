"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import styles from "./SiteNav.module.css";

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
            <Link href="/publisher" onClick={() => setIsMenuOpen(false)}>
              For publishers
            </Link>
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
