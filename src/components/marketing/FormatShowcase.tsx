"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { WindowChrome } from "@/components/home/mockups/WindowChrome";
import styles from "./FormatShowcase.module.css";

/**
 * The three placement formats ("Where you appear"), shown as recreations of
 * the actual surfaces a Kili unit can appear in - a chat display card, an
 * in-answer text suggestion, and a loading-state placement. Ported from the
 * Figma format reference (node 209:199). The row is wider than its viewport
 * on every breakpoint (so the next window always peeks at the edge) and
 * slides horizontally as the section scrolls through view, like a
 * scroll-driven carousel.
 */
export function FormatShowcase() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    function measure() {
      if (!rowRef.current || !viewportRef.current) return;
      const overflow = rowRef.current.scrollWidth - viewportRef.current.clientWidth;
      setMaxShift(Math.max(overflow, 0));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: viewportRef,
    offset: ["start end", "end start"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const x = useSpring(rawX, { stiffness: 220, damping: 32, mass: 0.6 });

  return (
    <div className={styles.viewport} ref={viewportRef} aria-hidden="true">
      <motion.div className={styles.row} ref={rowRef} style={{ x }}>
        <div className={styles.panel}>
          <WindowChrome app="claude" title="Claude Code" className={styles.chromeFill}>
            <div className={styles.terminalBody}>
              <div className={styles.question}>
                <Image
                  className={styles.claudeMark}
                  src="/format-showcase/claude-flower.svg"
                  alt=""
                  width={23}
                  height={23}
                />
                <p className={styles.questionText}>
                  Which stack should I use for a scalable Ethereum app?
                </p>
              </div>

              <ul className={styles.answerList}>
                <li>Optimism</li>
                <li>Arbitrum</li>
                <li className={styles.adLine}>
                  <Image src="/format-showcase/fuel-ad-mark.svg" alt="" width={15} height={16} />
                  <span>[Fuel Ad]&nbsp;</span>
                  <span className={styles.adLineBody}>Build and scale on Base</span>
                </li>
              </ul>
            </div>
          </WindowChrome>
        </div>

        <div className={styles.panel}>
          <div className={styles.chatPanel}>
            <div className={styles.chatRow}>
              <div className={styles.modelIcon}>
                <Image src="/format-showcase/model-icon.png" alt="" width={38} height={38} />
              </div>
              <div className={styles.chatBubble}>
                <p>Here are a few Bitcoin DeFi networks worth exploring:</p>
                <ul>
                  <li>Nike</li>
                  <li>Adidas</li>
                </ul>
              </div>
            </div>

            <div className={styles.adUnit}>
              <div className={styles.adBanner}>Get $10 in rewards on your First Bridge</div>
              <div className={styles.adBody}>
                <div className={styles.adLogo}>
                  <Image src="/format-showcase/bob-logo.png" alt="" width={58} height={58} />
                </div>
                <div className={styles.adCopy}>
                  <div className={styles.adHeading}>
                    <strong>BOB</strong>
                    <span className={styles.sponsoredPill}>Sponsored</span>
                  </div>
                  <p>Bitcoin DeFi, without leaving Bitcoin</p>
                  <div className={styles.adActions}>
                    <span>
                      <Image src="/format-showcase/files.svg" alt="" width={13} height={13} />
                      Copy Coupon
                    </span>
                    <span>
                      <Image src="/format-showcase/storefront.svg" alt="" width={13} height={13} />
                      Visit Store
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <WindowChrome app="claude" title="Claude Code" className={styles.chromeFill}>
            <div className={styles.terminalBody}>
              <div className={styles.question}>
                <Image
                  className={styles.claudeMark}
                  src="/format-showcase/claude-flower.svg"
                  alt=""
                  width={23}
                  height={23}
                />
                <p className={styles.thinkingText}>
                  Thinking… <span>(thinking with medium effort)</span>
                </p>
                <span className={styles.thinkingRule} />
              </div>

              <div className={styles.loadingAd}>
                <Image src="/format-showcase/rocketx-logo.png" alt="" width={20} height={20} />
                <strong>[Rocket X]</strong>
                <span>Best CEX and DEX aggregator</span>
                <small>Bashing · 0.17s</small>
              </div>
            </div>
          </WindowChrome>
        </div>
      </motion.div>
    </div>
  );
}
