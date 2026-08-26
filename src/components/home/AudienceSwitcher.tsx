"use client";

import { cx } from "@/lib/cx";
import styles from "./AudienceSwitcher.module.css";

export function AudienceSwitcher({
  isPlatform,
  onChange,
}: {
  isPlatform: boolean;
  onChange: (isPlatform: boolean) => void;
}) {
  return (
    <div className={styles.switcher} role="group" aria-label="Choose your audience">
      <button
        type="button"
        className={cx(styles.label, !isPlatform && styles.labelActive)}
        onClick={() => onChange(false)}
      >
        I use AI Agents
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={isPlatform}
        aria-label="Toggle audience"
        className={styles.track}
        onClick={() => onChange(!isPlatform)}
      >
        <span className={cx(styles.thumb, isPlatform && styles.thumbRight)} />
      </button>

      <button
        type="button"
        className={cx(styles.label, isPlatform && styles.labelActive)}
        onClick={() => onChange(true)}
      >
        I build AI Platforms
      </button>
    </div>
  );
}
