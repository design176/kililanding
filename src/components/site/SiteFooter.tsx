import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>Kili by Scribble Network</span>
        <nav className={styles.footerLinks}>
          <Link href="/advertiser">For advertisers</Link>
          <Link href="/publisher">For publishers</Link>
          <Link href="#docs">Docs</Link>
          <Link href="#book-a-call">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
