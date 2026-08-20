"use client";

import { CaretRight, Clock, MapPinLine, Package, Target, TrendUp, ChartLineUp } from "@phosphor-icons/react";
import styles from "./ComparisonTable.module.css";

const ROWS = [
  {
    key: "signal",
    dimension: "Signal",
    icon: Target,
    banner: "Cookies, demographics, what someone did last week",
    kili: "The question the user just typed",
  },
  {
    key: "timing",
    dimension: "Timing",
    icon: Clock,
    banner: "Shown before the need exists, and hoping",
    kili: "Shown at the moment the need is described",
  },
  {
    key: "placement",
    dimension: "Placement",
    icon: MapPinLine,
    banner: "Wrapped around the content, competing with it",
    kili: "One labelled line inside the answer",
  },
  {
    key: "measurement",
    dimension: "Measurement",
    icon: ChartLineUp,
    banner: "Browser pixels, increasingly blocked or dropped",
    kili: "Server-side conversions through CAPI",
  },
  {
    key: "effect",
    dimension: "Effect on the product",
    icon: TrendUp,
    banner: "Something users learn to scroll past",
    kili: "Something users sometimes act on",
  },
  {
    key: "builtfor",
    dimension: "Built for",
    icon: Package,
    banner: "Pages and feeds",
    kili: "Conversations",
  },
];

export function ComparisonTable() {
  return (
    <div className={styles.chart}>
      <div className={styles.grid}>
        <div className={styles.headRow}>
          <span className={styles.headLabel} />
          <span className={styles.headBanner}>Banner and display networks</span>
        </div>

        {ROWS.map((row) => (
          <div className={styles.row} key={row.key}>
            <span className={styles.label}>{row.dimension}</span>
            <span className={styles.banner}>{row.banner}</span>
          </div>
        ))}
      </div>

      <div className={styles.kiliCard}>
        <div className={styles.kiliHead}>Kili</div>
        {ROWS.map((row) => (
          <div className={styles.kiliRow} key={row.key}>
            {row.kili}
          </div>
        ))}
      </div>

      <div className={styles.mobileRows}>
        {ROWS.map((row, i) => (
          <div className={styles.mobileCard} key={row.key}>
            {i > 0 && <hr className={styles.mobileDivider} />}
            <div className={styles.mobileLabel}>
              <row.icon size={18} weight="bold" className={styles.mobileLabelIcon} />
              {row.dimension}
            </div>
            <div className={styles.mobileField}>
              <span className={styles.mobileFieldLabel}>
                <CaretRight size={12} weight="bold" className={styles.mobileFieldBullet} />
                Banner and display networks
              </span>
              <p className={styles.mobileBannerValue}>{row.banner}</p>
            </div>
            <div className={styles.mobileField}>
              <span className={styles.mobileFieldLabelKili}>
                <CaretRight size={12} weight="bold" className={styles.mobileFieldBullet} />
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
