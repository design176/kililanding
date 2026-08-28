import { Cookie, Eyes, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { cx } from "@/lib/cx";
import { ShowcaseFrame, ShowcasePoints, type ShowcasePoint } from "./Showcase";
import styles from "./AdvertiserShowcase.module.css";

const LOGO_COUNT = 6;

const POINTS: ShowcasePoint[] = [
  { icon: Cookie, label: "Triggered by the prompt, not a cookie" },
  { icon: Eyes, label: "Attention you cannot buy elsewhere" },
  { icon: TrendUp, label: "Closed-loop measurement with CAPI" },
];

/** Widths of the grey placeholder lines standing in for chat copy. */
const CHIP_LINES = ["46px", "20px", "29px"];
const REPLY_LINES = ["85%", "45%", "25%"];

function SkeletonLine({ width }: { width: string }) {
  return <span className={styles.skeletonLine} style={{ width }} />;
}

export function AdvertiserShowcase() {
  return (
    <ShowcaseFrame>
      <div className={styles.topChipRow}>
        <div className={styles.skeletonChip}>
          {CHIP_LINES.map((width) => (
            <SkeletonLine key={width} width={width} />
          ))}
        </div>
      </div>

      <div className={styles.logoRow}>
        {Array.from({ length: LOGO_COUNT }, (_, index) => (
          <span key={index} className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/logo-${index + 1}.png`} alt="" />
          </span>
        ))}
      </div>

      <div className={styles.bubbles}>
        <div className={styles.bubble}>
          <SkeletonLine width={REPLY_LINES[0]} />
          <div className={styles.skeletonRow}>
            <SkeletonLine width={REPLY_LINES[1]} />
            <SkeletonLine width={REPLY_LINES[2]} />
          </div>
        </div>

        <div className={cx(styles.bubble, styles.adBubble)}>
          <span className={styles.adPill}>Kili Ad</span>
          <SkeletonLine width="100%" />
          <div className={styles.skeletonRow}>
            <SkeletonLine width="48%" />
            <SkeletonLine width="28%" />
          </div>
          <SkeletonLine width="100%" />
        </div>
      </div>

      <ShowcasePoints points={POINTS} />
    </ShowcaseFrame>
  );
}
