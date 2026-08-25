import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Badge.module.css";

type Tone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "amber";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  dot?: boolean;
};

export function Badge({ tone = "neutral", dot, className, children, ...props }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)} {...props}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
