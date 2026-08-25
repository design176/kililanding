import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { MoneyNoiseBackground } from "@/components/home/MoneyNoiseBackground";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import styles from "./marketing.module.css";

/** Closing line both marketing pages hand to the footer. */
export const MARKETING_CLOSE = (
  <>
    Ads kept the web free. <em>Kili keeps AI free.</em>
  </>
);

type Door = { label: string; href: string; modal?: boolean };

/** Top-of-page block: copy on the left, a visual on the right. */
export function MarketingHero({
  eyebrow,
  title,
  lede,
  doors,
  note,
  media,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  doors: readonly Door[];
  note: ReactNode;
  media: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <MoneyNoiseBackground interactive={false} maxOpacity={0.28} />
      <div className={cx(styles.wrap, styles.heroGrid)}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p className={styles.lede}>{lede}</p>
          <div className={styles.doors}>
            {doors.map(({ label, href, modal }, index) =>
              modal ? (
                <GetStartedButton
                  key={label}
                  variant={index === 0 ? "primary" : "secondary"}
                  size="lg"
                  pill
                >
                  {label}
                </GetStartedButton>
              ) : (
                <Link href={href} key={href}>
                  <Button variant={index === 0 ? "primary" : "secondary"} size="lg" pill>
                    {label}
                  </Button>
                </Link>
              )
            )}
          </div>
          <p className={styles.note}>{note}</p>
        </div>
        <div className={styles.heroMedia}>{media}</div>
      </div>
    </section>
  );
}

/** A horizontal-ruled page section with an optional eyebrow/title/lede head. */
export function Band({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={styles.band} id={id}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2>{title}</h2>
          {lede && <p>{lede}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export type Cell = {
  kicker?: string;
  title: string;
  body: string;
  icon?: Icon;
  visual?: ReactNode;
};

/** Row of hairline-separated cards — "three reasons", "the maths", the steps. */
export function CellGrid({ cells }: { cells: readonly Cell[] }) {
  return (
    <div className={styles.cellGrid}>
      {cells.map(({ kicker, title, body, icon: CellIcon, visual }) => (
        <div className={styles.cell} key={title}>
          {visual}
          {CellIcon && (
            <span className={styles.cellIcon} aria-hidden="true">
              <CellIcon size={18} weight="regular" />
            </span>
          )}
          {kicker && <div className={styles.cellKicker}>{kicker}</div>}
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

/** Two-up container for panels, placeholders, or format cards. */
export function Split({ columns = 2, children }: { columns?: 2 | 3; children: ReactNode }) {
  return <div className={columns === 3 ? cx(styles.two, styles.three) : styles.two}>{children}</div>;
}

/** Bordered card: a claim, a line of context, then a bulleted list. */
export function Panel({
  title,
  lede,
  icon: PanelIcon,
  items,
  children,
}: {
  title: string;
  lede: ReactNode;
  icon?: Icon;
  items?: readonly ReactNode[];
  children?: ReactNode;
}) {
  return (
    <div className={cx(styles.panel, PanelIcon && styles.panelWithIcon)}>
      {PanelIcon && <PanelIcon className={styles.panelIcon} size={30} weight="regular" aria-hidden="true" />}
      <h3>{title}</h3>
      <p>{lede}</p>
      {items && (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

/** Screenshot/mockup with a caption underneath — the publisher formats row. */
export function FormatCard({
  media,
  title,
  body,
}: {
  media: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className={styles.formatCard}>
      {media}
      <h3 className={styles.formatTitle}>{title}</h3>
      <p className={styles.formatBody}>{body}</p>
    </div>
  );
}

export function PlacementPreview({
  variant,
}: {
  variant: "answer" | "loading" | "display";
}) {
  return (
    <div className={cx(styles.productPreview, styles[variant])} aria-hidden="true">
      <div className={styles.previewChrome}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.previewBody}>
        {variant === "loading" && <div className={styles.loadingOrbit}><span /></div>}
        <div className={styles.copyLine} />
        <div className={cx(styles.copyLine, styles.copyLineShort)} />
        <div className={styles.sponsorUnit}>
          <span className={styles.sponsorLabel}>Sponsored</span>
          <div>
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

const PERFORMANCE_BARS = [34, 46, 41, 58, 52, 71, 64, 82, 76, 91, 84, 96];

export function PerformancePreview() {
  return (
    <div className={styles.performancePreview} aria-hidden="true">
      <div className={styles.metricStrip}>
        <div><span>Impressions</span><strong>48.2k</strong></div>
        <div><span>Conversions</span><strong>1,284</strong></div>
        <div><span>CPA</span><strong>$18.40</strong></div>
      </div>
      <div className={styles.chart}>
        {PERFORMANCE_BARS.map((height, index) => (
          <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className={styles.chartFooter}>
        <span>Attributed through CAPI</span>
        <strong>+18.6%</strong>
      </div>
    </div>
  );
}

export function StepPreview({ variant }: { variant: "install" | "context" | "render" }) {
  return (
    <div className={cx(styles.stepPreview, styles[`stepPreview_${variant}`])} aria-hidden="true">
      <div className={styles.stepPreviewBar}>
        <span />
        <span />
        <span />
      </div>

      {variant === "install" && (
        <div className={styles.installPreview}>
          <code><i>$</i> npm install @kili/sdk</code>
          <p><span>✓</span> package added</p>
          <p><span>✓</span> publisher connected</p>
        </div>
      )}

      {variant === "context" && (
        <div className={styles.contextPreview}>
          <span className={styles.contextBubble}>Find a payroll tool for my team</span>
          <div className={styles.contextPacket}>
            <small>CONTEXT</small>
            <i /><i /><i />
          </div>
          <strong>Intent matched</strong>
        </div>
      )}

      {variant === "render" && (
        <div className={styles.renderPreview}>
          <div className={styles.renderAnswer}><i /><i /></div>
          <div className={styles.renderSponsor}>
            <small>SPONSORED</small>
            <i /><i />
          </div>
          <div className={styles.renderStats}><span>1 impression</span><strong>+$0.04</strong></div>
        </div>
      )}
    </div>
  );
}

export type FaqItem = { question: string; answer: ReactNode };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className={styles.faq}>
      {items.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
