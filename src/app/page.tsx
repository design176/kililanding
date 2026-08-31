import type { Metadata } from 'next';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { MoneyNoiseBackground } from '@/components/home/MoneyNoiseBackground';
import { BenefitsBento } from '@/components/home/BenefitsBento';
import { FaqSection } from '@/components/home/FaqSection';
import { SiteNav } from '@/components/site/SiteNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { GetStartedTrigger } from '@/components/site/GetStartedTrigger';
import { InstallCommand } from '@/components/site/InstallCommand';
import { HeroReveal } from '@/components/site/HeroReveal';
import { AdMetricsSection } from '@/components/home/AdMetricsSection';
import { HomeDemoSection } from '@/components/home/HomeDemoSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Kili',
  description:
    'Kili turns your AI agent\'s idle "thinking" time into an ad marketplace. Every thinking pause earns you ad revenue, automatically.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteNav />

      <div className={styles.firstFold}>
        {/* ── Hero ──────────────────────────────────────────── */}
        <HeroReveal className={styles.hero}>
          <GetStartedTrigger className={styles.newPill}>
            <span className={styles.newTag}>NEW</span>
            <span>Learn how we are making AI free</span>
            <CaretRight size={12} weight='bold' />
          </GetStartedTrigger>

          <h1 className={styles.h1}>Get Paid everytime your agent thinks...</h1>

          <p className={styles.lede}>We turned your agent’s idle time into an ad marketplace.
Every time your agent is “thinking…”, you earn 50% of net ad revenue.</p>

          <div className={styles.heroButtons}>
            <InstallCommand />
          </div>
        </HeroReveal>

        {/* ── Without Kili / with Kili activity comparison ─── */}
        <section className={styles.demoBand}>
          <MoneyNoiseBackground />
          <HomeDemoSection />
        </section>
      </div>

      <div className={styles.sectionDivider} />

      {/* ── Ads only appear while the user is waiting ────────── */}
      <section className={styles.metricsSection}>
        <AdMetricsSection />
      </section>

      <div className={styles.sectionDivider} />

      {/* ── Publisher benefits bento ───────────────────────── */}
      <section className={styles.bentoSection} aria-label='Why publishers choose Kili'>
        <BenefitsBento />
      </section>

      <div className={styles.sectionDivider} />

      {/* ── Install CTA ────────────────────────────────────── */}
      <section className={styles.bentoCta} aria-labelledby='install-kili-heading'>
        <MoneyNoiseBackground maxOpacity={0.7} />
        <div className={styles.bentoCtaContent}>
          <h2 id='install-kili-heading'>Your tokens can now bring you revenue.</h2>
          <InstallCommand className={styles.bentoCtaCommand} />
        </div>
      </section>

      <div className={styles.sectionDivider} />

      <FaqSection />

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
