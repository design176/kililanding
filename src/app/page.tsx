import { IsoIllustration } from "@/components/home/illustrations/IsoIllustration";
import {
  MoneyWavy,
  Code,
  ShieldStar,
  CaretRight,
  Cookie,
  TrendUp,
  Eyes,
  Sliders,
  Wallet,
  Unite,
} from "@phosphor-icons/react/dist/ssr";
import { HomeDemoBand } from "@/components/home/HomeDemoBand";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { GetStartedTrigger } from "@/components/site/GetStartedTrigger";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteNav />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <GetStartedTrigger className={styles.newPill}>
          <span className={styles.newTag}>NEW</span>
          <span>Learn how we are making AI free</span>
          <CaretRight size={12} weight="bold" />
        </GetStartedTrigger>

        <h1 className={styles.h1}>The Ad Network for AI apps.</h1>

        <p className={styles.lede}>
          User intent now lives in chatboxes agents, MCPs, AI apps. Kili suggests
          brands inside the answer, and pays the app that carried it.
        </p>

        <div className={styles.heroButtons}>
          {/* View Docs button hidden for now — no docs site yet */}
          <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
        </div>
      </section>

      {/* ── Tab strip + screenshot band ────────────────────── */}
      <section className={styles.demoBand}>
        <HomeDemoBand />
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
          <ul className={styles.splitBullets}>
            <li><Cookie size={28} /> Triggered by the prompt, not a cookie</li>
            <li><TrendUp size={28} /> Closed-loop measurement with CAPI</li>
            <li><Eyes size={28} /> Attention you cannot buy elsewhere</li>
          </ul>
          <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
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
          <ul className={styles.splitBullets}>
            <li><Sliders size={28} /> One SDK, live in an afternoon</li>
            <li><Wallet size={28} /> You keep 50% of advertiser spend</li>
            <li><Unite size={28} /> Approve or block advertiser categories</li>
          </ul>
          <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
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
            <IsoIllustration name="match" className={styles.consoleIcon} />
            <h3 className={styles.consoleCellTitle}>Match</h3>
            <p className={styles.consoleCellBody}>
              Triggered by user intent. Kili scores every eligible sponsor against
              the buying intent in the query and drops anything below your floor.
            </p>
          </div>
          <div className={`${styles.consoleCell} ${styles.consoleCellDivided}`}>
            <IsoIllustration name="serve" className={styles.consoleIcon} />
            <h3 className={styles.consoleCellTitle}>Serve</h3>
            <p className={styles.consoleCellBody}>
              A new surface. Loading placement, in-answer text or display card
              inventory brands cannot buy anywhere else, rendered inside your own
              interface.
            </p>
          </div>
          <div className={`${styles.consoleCell} ${styles.consoleCellDivided}`}>
            <IsoIllustration name="measure" className={styles.consoleIcon} />
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
        <div className={styles.compareCard}>
          <div className={styles.compareHead}>
            <h2 className={styles.compareHeading}>Relevance no cookie can match.</h2>
            <GetStartedButton variant="primary" size="lg" pill>Get Started</GetStartedButton>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* ── Final CTA, merged into the footer ────────────────── */}
      <SiteFooter
        heading={
          <>
            Turn conversations <em>into revenue.</em>
          </>
        }
        body="Whether you run an AI product or want to reach the people using one, Kili gives you a cleaner way to start."
      />
    </div>
  );
}
