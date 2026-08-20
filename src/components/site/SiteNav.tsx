import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/">
          <Logo width={70} />
        </Link>
        <nav className={styles.navLinks}>
          {/* For Advertisers / For Publishers links hidden for now */}
          <div className={styles.navButtons}>
            {/* Docs button hidden for now — no docs site yet */}
            <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
