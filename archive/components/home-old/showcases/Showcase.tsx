import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import styles from "./Showcase.module.css";

export type ShowcasePoint = { icon: Icon; label: string };

/** Outer tile + inset screenshot card the two home-page showcases share. */
export function ShowcaseFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.outer}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}

/** The brand-green selling points listed under each showcase. */
export function ShowcasePoints({ points }: { points: readonly ShowcasePoint[] }) {
  return (
    <div className={styles.pointsList}>
      {points.map(({ icon: PointIcon, label }) => (
        <div key={label} className={styles.pointRow}>
          <span className={styles.pointIcon}>
            <PointIcon size={16} weight="bold" />
          </span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
