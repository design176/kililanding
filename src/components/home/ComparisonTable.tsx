"use client";

import styles from "./ComparisonTable.module.css";

const ROWS = [
  {
    key: "signal",
    dimension: "Signal",
    banner: "Cookies, demographics, what someone did last week",
    kili: "The question the user just typed",
  },
  {
    key: "timing",
    dimension: "Timing",
    banner: "Shown before the need exists, and hoping",
    kili: "Shown at the moment the need is described",
  },
  {
    key: "placement",
    dimension: "Placement",
    banner: "Wrapped around the content, competing with it",
    kili: "One labelled line inside the answer",
  },
  {
    key: "measurement",
    dimension: "Measurement",
    banner: "Browser pixels, increasingly blocked or dropped",
    kili: "Server-side conversions through CAPI",
  },
  {
    key: "effect",
    dimension: "Effect on the product",
    banner: "Something users learn to scroll past",
    kili: "Something users sometimes act on",
  },
  {
    key: "builtfor",
    dimension: "Built for",
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
    </div>
  );
}
