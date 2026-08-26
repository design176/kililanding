"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import styles from "./HomeDemoSection.module.css";

const ACTIVITY_STEP_MS = 2400;
const WAITING_WORDS = ["Conjuring", "Reading", "Globbing", "Indexing"];
const CLAUDE_WORDS = ["Reading", "Grepping", "Bashing", "Globbing", "Searching", "Thinking"];

function useActivityClock(words: string[]) {
  const [activity, setActivity] = useState({ word: words[0], seconds: 0 });

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const totalElapsed = performance.now() - startedAt;
      const step = Math.floor(totalElapsed / ACTIVITY_STEP_MS);

      setActivity({
        word: words[step % words.length],
        seconds: (totalElapsed % ACTIVITY_STEP_MS) / 1000,
      });
    }, 50);

    return () => window.clearInterval(timer);
  }, [words]);

  return activity;
}

export function HomeDemoSection() {
  const waiting = useActivityClock(WAITING_WORDS);
  const claude = useActivityClock(CLAUDE_WORDS);

  return (
    <div className={styles.comparison} aria-label="AI activity without and with Kili">
      <section className={styles.comparisonSide} aria-label="Without Kili">
        <div className={styles.activityStrip}>
          <span className={styles.waitingMark} aria-hidden="true">✳</span>
          <span className={styles.waitingText}>{waiting.word}...</span>
          <span className={styles.spacer} />
          <span className={styles.status}>Working · {waiting.seconds.toFixed(1)}s</span>
        </div>
      </section>

      <span className={styles.transition} aria-hidden="true">
        <span><CaretRight size={18} weight="bold" /></span>
      </span>

      <section className={styles.comparisonSide} aria-label="With Kili">
        <div className={`${styles.activityStrip} ${styles.activityStripActive}`}>
          <div className={styles.adLine}>
            <Image className={styles.kiliLogo} src="/icon.svg" alt="" width={18} height={18} />
            <span className={styles.kiliBrand}>[KILI]</span>
            <span className={styles.kiliMessage}>Get paid on every AI answer.</span>
            <span className={styles.spacer} />
            <span className={styles.status}>{claude.word} · {claude.seconds.toFixed(1)}s</span>
          </div>
        </div>
      </section>
    </div>
  );
}
