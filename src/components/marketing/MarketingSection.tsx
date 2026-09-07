import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  ChartLineUp,
  CreditCard,
  CursorClick,
  CurrencyDollar,
  Eye,
  GearSix,
  House,
  Megaphone,
  Percent,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { KiliMark } from "@/components/Logo";
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

/** Top-of-page block: centered copy, then a full-bleed band with the
 * visual - matching the home page's hero + demo band composition. */
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
    <>
      <section className={styles.hero}>
        <div className={cx(styles.wrap, styles.heroCopy)}>
          <span className={cx(styles.eyebrow, styles.eyebrowPill)}>{eyebrow}</span>
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
                <Link
                  href={href}
                  key={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Button variant={index === 0 ? "primary" : "secondary"} size="lg" pill>
                    {label}
                  </Button>
                </Link>
              )
            )}
          </div>
          <p className={styles.note}>{note}</p>
        </div>
      </section>

      <section className={styles.heroDemo}>
        <MoneyNoiseBackground interactive={false} maxOpacity={0.28} />
        <div className={styles.heroMedia}>{media}</div>
      </section>
    </>
  );
}

/** A horizontal-ruled page section with an optional title/lede head. */
export function Band({
  id,
  title,
  lede,
  children,
}: {
  id?: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={styles.band} id={id}>
      <div className={styles.wrap}>
        <div className={styles.head}>
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

/** Row of hairline-separated cards - "three reasons", "the maths", the steps. */
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
export function Split({
  columns = 2,
  stacked = false,
  children,
}: {
  columns?: 2 | 3;
  stacked?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cx(styles.two, columns === 3 && styles.three, stacked && styles.twoStacked)}>
      {children}
    </div>
  );
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

/** Screenshot/mockup with a caption underneath - the publisher formats row. */
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

const SPEND_Y_LABELS = ["$1.1K", "$799", "$533", "$266", "$0"];
const SPEND_X_LABELS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function PerformancePreview() {
  return (
    <div className={styles.performanceWrap}>
      <MoneyNoiseBackground interactive={false} maxOpacity={0.35} />
      <div className={styles.performancePreview} aria-hidden="true">
      <div className={styles.performanceSidebar}>
        <div className={styles.performanceLogo}>
          <KiliMark size={14} />
          <span className={styles.performanceCollapseHide}>kili</span>
        </div>

        <div className={styles.performanceNavGroup}>
          <p className={cx(styles.performanceNavLabel, styles.performanceCollapseHide)}>Workspace</p>
          <div className={cx(styles.performanceNavItem, styles.performanceNavItemActive)}>
            <House size={13} weight="bold" />
            <span className={styles.performanceCollapseHide}>Overview</span>
          </div>
          <div className={styles.performanceNavItem}>
            <Megaphone size={13} weight="bold" />
            <span className={styles.performanceCollapseHide}>Campaigns</span>
          </div>
          <div className={styles.performanceNavItem}>
            <ChartLineUp size={13} weight="bold" />
            <span className={styles.performanceCollapseHide}>Events Tracking</span>
          </div>
        </div>

        <div className={styles.performanceNavGroup}>
          <p className={cx(styles.performanceNavLabel, styles.performanceCollapseHide)}>Account</p>
          <div className={styles.performanceNavItem}>
            <CreditCard size={13} weight="bold" />
            <span className={styles.performanceCollapseHide}>Billing</span>
          </div>
          <div className={styles.performanceNavItem}>
            <GearSix size={13} weight="bold" />
            <span className={styles.performanceCollapseHide}>Settings</span>
          </div>
        </div>
      </div>

      <div className={styles.performanceMain}>
      <div className={styles.metricStrip}>
        <div>
          <strong>$4.2K</strong>
          <span>Spend</span>
          <div className={styles.metricIcon}><CurrencyDollar size={13} weight="bold" /></div>
        </div>
        <div>
          <strong>182.4K</strong>
          <span>Impressions</span>
          <div className={styles.metricIcon}><Eye size={13} weight="bold" /></div>
        </div>
        <div>
          <strong>3.1K</strong>
          <span>Clicks</span>
          <div className={styles.metricIcon}><CursorClick size={13} weight="bold" /></div>
        </div>
        <div>
          <strong>1.7%</strong>
          <span>CTR</span>
          <div className={styles.metricIcon}><Percent size={13} weight="bold" /></div>
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartYLabels}>
          {SPEND_Y_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className={styles.chart}>
          <svg viewBox="0 0 400 148" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="spendHatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.4" />
              </pattern>
            </defs>

            <g stroke="var(--color-border)" strokeWidth="1">
              <line x1="0" y1="0" x2="400" y2="0" />
              <line x1="0" y1="37" x2="400" y2="37" />
              <line x1="0" y1="74" x2="400" y2="74" />
              <line x1="0" y1="111" x2="400" y2="111" />
              <line x1="0" y1="147" x2="400" y2="147" />
            </g>

            <path
              d="M0,120 C50,108 90,100 130,95 S210,72 250,80 S330,20 400,8 V148 H0 Z"
              fill="url(#spendHatch)"
            />
            <path
              d="M0,120 C50,108 90,100 130,95 S210,72 250,80 S330,20 400,8"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.chartXLabels}>
        {SPEND_X_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className={styles.chartFooter}>
        <span>Attributed through CAPI</span>
        <strong>+18.6%</strong>
      </div>
      </div>
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
