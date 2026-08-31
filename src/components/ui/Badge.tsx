import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Badge.module.css";

type Tone = "neutral" | "brand" | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone], className)} {...props} />;
}
