import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import styles from "./SiteNav.module.css";

type Active = "home" | "advertiser" | "publisher";

export function SiteNav({ active }: { active: Active }) {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/">
          <Logo width={70} />
        </Link>
        <nav className={styles.navLinks}>
          <Link
            href="/advertiser"
            className={active === "advertiser" ? styles.navLinkActive : styles.navLink}
          >
            For Advertisers
          </Link>
          <Link
            href="/publisher"
            className={active === "publisher" ? styles.navLinkActive : styles.navLink}
          >
            For Publishers
          </Link>
          <div className={styles.navButtons}>
            <Link href="#">
              <Button variant="secondary" size="lg" pill>Docs</Button>
            </Link>
            <Link href="/get-started">
              <Button variant="primary" size="lg" pill>Get Started</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
