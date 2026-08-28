import { SignupForm } from "@/components/SignupForm";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import styles from "./get-started.module.css";

export default function GetStartedPage() {
  return (
    <div className={styles.page}>
      <SiteNav />
      <main className={styles.main}>
        <h1 className={styles.heading}>Get started with Kili.</h1>
        <p className={styles.subheading}>
          Self-serve is coming. For now, tell us who you are and we&apos;ll set you up.
        </p>
        <SignupForm />
      </main>
      <SiteFooter />
    </div>
  );
}
