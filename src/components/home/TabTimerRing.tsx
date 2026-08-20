"use client";

import type { CSSProperties } from "react";
import styles from "./TabTimerRing.module.css";

interface TabTimerRingProps {
  /** How long the ring takes to fill, in ms. */
  duration: number;
  /** Changing this remounts the progress circle, restarting the animation. */
  animationKey: string | number;
  size?: number;
}

export function TabTimerRing({ duration, animationKey, size = 14 }: TabTimerRingProps) {
  const stroke = 1.8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.ring} aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth={stroke}
      />
      <circle
        key={animationKey}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        className={styles.progress}
        style={{ "--circumference": circumference, animationDuration: `${duration}ms` } as CSSProperties}
      />
    </svg>
  );
}
