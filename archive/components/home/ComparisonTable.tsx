"use client";

import { X, Clock, MapPinLine, Package, Target, Pulse, ChartLineUp } from "@phosphor-icons/react";
import { MoneyNoiseBackground } from "./MoneyNoiseBackground";
import styles from "./ComparisonTable.module.css";

const ROWS = [
  {
    key: "signal",
    dimension: "Signal",
    icon: Target,
    banner: "Cookies, demographics and what someone did last week, stitched into a profile that ages badly",
    kili: "The question the user just typed, read as the brief it actually is",
  },
  {
    key: "timing",
    dimension: "Timing",
    icon: Clock,
    banner: "Shown before the need exists, in the hope that someone remembers the brand later",
    kili: "Shown at the moment the need is described, while the user is still deciding",
  },
  {
    key: "placement",
    dimension: "Placement",
    icon: MapPinLine,
    banner: "Wrapped around the content, competing with the thing the user actually came for",
    kili: "One labelled line inside the answer, or nothing at all when nothing fits",
  },
  {
    key: "measurement",
    dimension: "Measurement",
    icon: ChartLineUp,
    banner: "Browser pixels, increasingly blocked, dropped, or simply absent in a chat client",
    kili: "Server-side conversions through CAPI, attributed to the placement that earned them",
  },
  {
    key: "effect",
    dimension: "Effect",
    icon: Pulse,
    banner: "Something users learn to scroll past, and then to install an extension against",
    kili: "Something users sometimes act on, because it answers the question they just asked",
  },
  {
    key: "builtfor",
    dimension: "Built for",
    icon: Package,
    banner: "Pages and feeds — a surface with margins, a scroll position, and room to interrupt",
    kili: "Conversations, where there is one answer and no margin to hide an ad in",
  },
];

export function ComparisonTable() {
  return (
    <div className={styles.chart}>
      <div className={styles.headerRow}>
        <MoneyNoiseBackground interactive={false} maxOpacity={0.4} />
        <span className={styles.pillMuted}>Banner and display networks</span>
        <span className={styles.pillBrand}>Kili</span>
      </div>

      <div className={styles.table}>
        {ROWS.map((row) => (
          <div className={styles.tableRow} key={row.key}>
            <div className={styles.rowLabel}>
              <span className={styles.labelIconBox}>
                <row.icon size={15} weight="regular" />
              </span>
              <span>{row.dimension}</span>
            </div>
            <div className={styles.rowValue}>
              <X size={13} weight="bold" className={styles.xIcon} />
              <span>{row.banner}</span>
            </div>
            <div className={styles.rowValue}>
              <span className={styles.squareBullet} />
              <span className={styles.kiliValue}>{row.kili}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mobileRows}>
        {ROWS.map((row, i) => (
          <div className={styles.mobileCard} key={row.key}>
            {i > 0 && <hr className={styles.mobileDivider} />}
            <div className={styles.mobileLabel}>
              <span className={styles.labelIconBox}>
                <row.icon size={16} weight="regular" className={styles.mobileLabelIcon} />
              </span>
              {row.dimension}
            </div>
            <div className={styles.mobileField}>
              <span className={styles.mobileFieldLabel}>
                <X size={11} weight="bold" className={styles.mobileFieldBulletX} />
                Banner and display networks
              </span>
              <p className={styles.mobileBannerValue}>{row.banner}</p>
            </div>
            <div className={styles.mobileField}>
              <span className={styles.mobileFieldLabelKili}>
                <span className={styles.mobileFieldBulletSquare} />
                Kili
              </span>
              <p className={styles.mobileKiliValue}>{row.kili}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
