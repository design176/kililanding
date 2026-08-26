import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldStar, CaretRight, Megaphone, Code } from "@phosphor-icons/react/dist/ssr";
import { IsoIllustration } from "@/components/home-old/illustrations/IsoIllustration";
import { HomeDemoBand } from "@/components/home-old/HomeDemoBand";
import { ScrollRevealHeading } from "@/components/home-old/ScrollRevealHeading";
import { AdvertiserShowcase } from "@/components/home-old/showcases/AdvertiserShowcase";
import { PublisherShowcase } from "@/components/home-old/showcases/PublisherShowcase";
import { MoneyNoiseBackground } from "@/components/home-old/MoneyNoiseBackground";
import { ComparisonTable } from "@/components/home-old/ComparisonTable";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { GetStartedTrigger } from "@/components/site/GetStartedTrigger";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import styles from "./page.module.css";

const OFFERINGS: { showcase: ReactNode; title: string; subtitle: string }[] = [
  {
    showcase: <AdvertiserShowcase />,
    title: "Show up on ai answers",
    subtitle:
      "The moment they express buying intent, not three days later in a retargeting feed.",
  },
  {
    showcase: <PublisherShowcase />,
    title: "Run a free tier profitably",
    subtitle:
      "Add Kili once and earn whenever a relevant sponsor is matched inside a user session.",
  },
];

/** The three ad-server stages, alternating sides down the page. */
const CONSOLE_ROWS = [
  {
    illustration: "match",
    accent: "Match",
    title: "Triggered by user intent.",
    body: "Kili scores every eligible sponsor against the buying intent in the query and drops anything below your floor.",
  },
  {
    illustration: "serve",
    accent: "Serve",
    title: "A new surface.",
    body: "Loading placement, in-answer text or display card inventory brands cannot buy anywhere else, rendered inside your own interface.",
  },
  {
    illustration: "measure",
    accent: "Measure",
    title: "Attributable.",
    body: "Closed-loop measurement with CAPI, so a CPM buy can still be judged on what it actually produced.",
  },
] as const;

export default function OldHome() {
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
        <MoneyNoiseBackground />
        <HomeDemoBand />
      </section>

      <div className={styles.sectionDivider} />

      {/* ── For Advertiser / For Publisher split ───────────── */}
      <section className={styles.split}>
        <div className={styles.offeringsIntro}>
          <h2 className={styles.offeringsHeading}>
            Two sides.
            <br />
            One ad network.
          </h2>
          <p className={styles.offeringsSubtext}>
            Built for advertisers chasing intent, and publishers monetizing conversations.
          </p>
          <div className={styles.offeringsActions}>
            <Link href="/advertiser">
              <Button variant="secondary" size="lg" pill>
                <Megaphone size={16} weight="bold" />
                Kili for Advertisers
              </Button>
            </Link>
            <Link href="/publisher">
              <Button variant="secondary" size="lg" pill>
                <Code size={16} weight="bold" />
                Kili for Platforms
              </Button>
            </Link>
          </div>
        </div>

        {OFFERINGS.map(({ showcase, title, subtitle }) => (
          <div className={styles.offeringCard} key={title}>
            <div className={styles.offeringImage}>{showcase}</div>
            <h3 className={styles.offeringTitle}>{title}</h3>
            <p className={styles.offeringSubtitle}>{subtitle}</p>
          </div>
        ))}
      </section>

      <div className={styles.sectionDivider} />

      {/* ── Two consoles. One network. ─────────────────────── */}
      <section className={styles.consolesHeadingSection}>
        <ScrollRevealHeading
          className={styles.consolesHeading}
          text="Standard ad-server mechanics, applied to a surface that never had them."
        />
      </section>

      <div className={styles.sectionDivider} />

      <section className={styles.consoles}>
        <div className={styles.consoleRows}>
          {CONSOLE_ROWS.map(({ illustration, accent, title, body }, index) => (
            <div
              className={cx(styles.consoleRow, index % 2 === 1 && styles.consoleRowReverse)}
              key={accent}
            >
              <div className={styles.consoleMedia}>
                <IsoIllustration name={illustration} className={styles.consoleIcon} />
              </div>
              <div className={styles.consoleText}>
                <h3 className={styles.consoleCellTitle}>
                  <span className={styles.consoleCellTitleAccent}>{accent}</span> {title}
                </h3>
                <p className={styles.consoleCellBody}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Protect, full-bleed with the hero's noise texture ─ */}
      <section className={styles.protectSection}>
        <MoneyNoiseBackground interactive={false} maxOpacity={0.7} />
        <div className={styles.protectBannerInner}>
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

          <hr className={styles.compareDivider} />

          <ComparisonTable />
        </div>
      </section>

      {/* ── Audience value propositions ────────────────────── */}
      <section className={styles.audienceSection} aria-label="How Kili helps publishers and advertisers">
        <MoneyNoiseBackground interactive={false} maxOpacity={0.16} />
        <div className={styles.audienceGrid}>
          <article className={styles.audiencePanel}>
            <span className={styles.audienceEyebrow}>For publishers</span>
            <Code size={30} weight="regular" className={styles.audienceIcon} />
            <h3 className={styles.audienceTitle}>Ads kept the web free.</h3>
            <p className={styles.audienceBody}>
              The next billion AI users will not pay $20 a month. Accessibility is
              supply: ads offset inference, cheaper AI grows usage, usage grows
              answers.
            </p>
          </article>

          <article className={styles.audiencePanel}>
            <span className={styles.audienceEyebrow}>For advertisers</span>
            <Megaphone size={30} weight="regular" className={styles.audienceIcon} />
            <h3 className={styles.audienceTitle}>Brands want in on AI answers.</h3>
            <p className={styles.audienceBody}>
              Because a branded AI answer meets the customer at the highest point
              of intent. Buy the placement, not the hope that your content gets
              picked up.
            </p>
          </article>
        </div>
      </section>

      {/* ── Final CTA, merged into the footer ────────────────── */}
      <SiteFooter
        heading={
          <>
            Turn conversations <em>into revenue.</em>
          </>
        }
      />
    </div>
  );
}
