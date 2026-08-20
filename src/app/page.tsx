import Link from "next/link";
import { MoneyWavy, Code, ShieldStar, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import { HomeTabs } from "@/components/home/HomeTabs";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteClosingCta } from "@/components/site/SiteClosingCta";
import { SiteFooter } from "@/components/site/SiteFooter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteNav active="home" />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Link href="#" className={styles.newPill}>
          <span className={styles.newTag}>NEW</span>
          <span>Learn how we are making AI free</span>
          <CaretRight size={12} weight="bold" />
        </Link>

        <h1 className={styles.h1}>The Ad Network for AI apps.</h1>

        <p className={styles.lede}>
          User intent now lives in chatboxes agents, MCPs, AI apps. Kili suggests
          brands inside the answer, and pays the app that carried it.
        </p>

        <div className={styles.heroButtons}>
          <Link href="#">
            <Button variant="secondary" size="lg" pill>View Docs</Button>
          </Link>
          <Link href="/get-started">
            <Button variant="primary" size="lg" pill>Get Started</Button>
          </Link>
        </div>
      </section>

      {/* ── Tab strip + screenshot band ────────────────────── */}
      <section className={styles.demoBand}>
        <HomeTabs />
        <Placeholder
          label="Product screenshot — Claude Code sponsored suggestion (Chat tools demo)"
          width="min(882px, 100%)"
          height={320}
          className={styles.demoFrame}
        />
      </section>

      {/* ── For Advertiser / For Publisher split ───────────── */}
      <section className={styles.split}>
        <div className={styles.splitCol}>
          <span className={styles.audiencePill}>
            <MoneyWavy size={20} weight="bold" />
            For Advertiser
          </span>
          <h2 className={styles.splitHeading}>
            <span className={styles.splitHeadingGreen}>Show up on ai answers,</span>
            {" "}the moment they express buying intent not three days later in a retargeting feed.
          </h2>
          <Link href="/get-started">
            <Button variant="primary" size="lg" pill>Start a Campaign</Button>
          </Link>
          <Placeholder
            label="Advertiser dashboard screenshot — Overview, dark mode"
            width="100%"
            height={420}
            className={styles.dashboardFrame}
          />
        </div>

        <div className={styles.splitCol}>
          <span className={styles.audiencePill}>
            <Code size={20} weight="bold" />
            For Publishers
          </span>
          <h2 className={styles.splitHeading}>
            <span className={styles.splitHeadingGreen}>Run a free tier profitably,</span>
            {" "}Add Kili once and earn whenever a relevant sponsor is matched inside a user session.
          </h2>
          <Link href="/get-started">
            <Button variant="primary" size="lg" pill>Integrate Now</Button>
          </Link>
          <Placeholder
            label="Publisher dashboard screenshot — Overview, dark mode"
            width="100%"
            height={420}
            className={styles.dashboardFrame}
          />
        </div>
      </section>

      {/* ── Two consoles. One network. ─────────────────────── */}
      <section className={styles.consoles}>
        <h2 className={styles.consolesHeading}>
          <span>Two consoles. One network,</span>{" "}
          <span className={styles.consolesHeadingMuted}>
            Standard ad-server mechanics, applied to a surface that never had them.
          </span>
        </h2>

        <div className={styles.consolesGrid}>
          <div className={styles.consoleCell}>
            <Placeholder label="Isometric icon — Match" width={200} height={168} />
            <h3 className={styles.consoleCellTitle}>Match</h3>
            <p className={styles.consoleCellBody}>
              Triggered by user intent. Kili scores every eligible sponsor against
              the buying intent in the query and drops anything below your floor.
            </p>
          </div>
          <div className={styles.consoleCell}>
            <Placeholder label="Isometric icon — Serve" width={200} height={168} />
            <h3 className={styles.consoleCellTitle}>Serve</h3>
            <p className={styles.consoleCellBody}>
              A new surface. Loading placement, in-answer text or display card
              inventory brands cannot buy anywhere else, rendered inside your own
              interface.
            </p>
          </div>
          <div className={styles.consoleCell}>
            <Placeholder label="Isometric icon — Measure" width={200} height={168} />
            <h3 className={styles.consoleCellTitle}>Measure</h3>
            <p className={styles.consoleCellBody}>
              Attributable. Closed-loop measurement with CAPI, so a CPM buy can
              still be judged on what it actually produced.
            </p>
          </div>
        </div>

        <div className={styles.protectBanner}>
          <div>
            <h3 className={styles.protectTitle}>Protect</h3>
            <p className={styles.protectBody}>
              Kili holds the safety policy and never runs a sponsor against a brand
              you compete with. You set the relevancy floor and approve the
              categories.
            </p>
          </div>
          <ShieldStar size={72} weight="duotone" className={styles.protectIcon} />
        </div>
      </section>

      {/* ── Comparison table ────────────────────────────────── */}
      <section className={styles.compare}>
        <div className={styles.compareHead}>
          <h2 className={styles.compareHeading}>Relevance no cookie can match.</h2>
          <Link href="/get-started">
            <Button variant="primary" size="lg" pill>Get Started</Button>
          </Link>
        </div>

        <ComparisonTable />
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <SiteClosingCta
        heading={
          <>
            Turn conversations <em>into revenue.</em>
          </>
        }
        body="Whether you run an AI product or want to reach the people using one, Kili gives you a cleaner way to start."
        secondary={{ label: "View Docs", href: "#" }}
      />

      <SiteFooter />
    </div>
  );
}
