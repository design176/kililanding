"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cx } from "@/lib/cx";
import { useTimedSteps } from "@/lib/use-timed-steps";
import { useTypewriter } from "@/lib/use-typewriter";
import { useAutoScrollToBottom } from "@/lib/use-auto-scroll";
import { WindowChrome } from "./WindowChrome";
import styles from "./MiroMockup.module.css";

const PROMPT = "Create a launch plan for a new fitness app";

const LOADING_MESSAGES = [
  "Understanding your launch goals…",
  "Organizing milestones…",
  "Building your launch board…",
];

/** When each loading message after the first swaps in, in ms from generate. */
const LOADING_DELAYS = [1250, 2500];

/** How long generation runs before the finished board appears. */
const GENERATING_MS = 4200;

const TOOLBAR_TOOLS = ["➤", "▣", "▢", "T", "◇", "✎", "＋"];

export function MiroMockup() {
  // 0 = typing the prompt, 1 = generating, 2 = finished board.
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const typedPrompt = useTypewriter(PROMPT, {
    enabled: step === 0,
    speed: 40,
    settleMs: 700,
    onSettle: () => setStep(1),
  });

  const loadingMessage = useTimedSteps(LOADING_DELAYS, { enabled: step === 1 });
  useAutoScrollToBottom(canvasRef, step);

  useEffect(() => {
    if (step !== 1) return;
    const timer = window.setTimeout(() => setStep(2), GENERATING_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  return (
    <WindowChrome app="miro" title="Miro">
      <div className={styles.app}>
        <header className={styles.boardMenu}>
          <button type="button" aria-label="Main menu">☰</button>
          <strong className={styles.wordmark}>miro</strong>
          <span>🧪</span>
          <b>Fitness app launch plan</b>
          <button type="button" aria-label="More options">⋮</button>
        </header>

        <div className={styles.actions}>
          <span>〽</span>
          <span>◉</span>
          <div className={styles.collaborators}>
            <i>AM</i><i>JK</i><i>RS</i><b>7⌄</b>
          </div>
          <button type="button">▶&nbsp; Present</button>
          <button className={styles.share} type="button">Share</button>
        </div>

        <aside className={styles.toolbar}>
          <button type="button" aria-label="Miro AI">✦</button>
          {TOOLBAR_TOOLS.map((tool, index) => (
            <button key={tool} className={index === 0 ? styles.active : undefined} type="button">
              {tool}
            </button>
          ))}
        </aside>

        <div className={styles.board}>
          {step === 0 && (
            <div className={styles.empty}>
              <span>✦</span>
              <strong>Create with Miro AI</strong>
              <p>Describe the board you want to build.</p>
              <div className={styles.promptRow}>
                <div className={styles.promptField}>
                  <span>{typedPrompt}</span>
                  <i className={styles.caret} />
                </div>
                <button type="button">Generate</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={styles.generating}>
              <div className={styles.generationStatus}>
                <div className={styles.spinner} />
                <div>
                  <small>MIRO AI</small>
                  <strong>{LOADING_MESSAGES[loadingMessage]}</strong>
                </div>
              </div>
              <div className={styles.progress}>
                <i />
              </div>
              <aside className={styles.loadingSponsor}>
                <div>
                  <div className={styles.sponsorTitle}>
                    <strong>RevenueCat</strong>
                    <span className={styles.sponsorPill}>Kili Sponsored Ad</span>
                  </div>
                  <p>Subscriptions and trials for mobile apps</p>
                </div>
                <button type="button">
                  Learn more <ArrowUpRight size={12} weight="bold" />
                </button>
              </aside>
            </div>
          )}

          {step === 2 && (
            <div className={styles.canvas} ref={canvasRef}>
              <div className={styles.boardTitle}>
                <small>PRODUCT LAUNCH</small>
                <strong>FitFlow launch plan</strong>
                <span>Six-week go-to-market workspace</span>
              </div>

              <section className={cx(styles.frame, styles.goals)}>
                <header><strong>Launch goals</strong><span>3 notes</span></header>
                <div>
                  <i>Reach 10k installs</i>
                  <i>Validate premium plan</i>
                  <i>Build a referral loop</i>
                </div>
              </section>

              <section className={cx(styles.frame, styles.timeline)}>
                <header><strong>Six-week timeline</strong><span>May — June</span></header>
                <div className={styles.track}>
                  <b>Research</b><b>Beta</b><b>Creator launch</b><b>Release</b>
                </div>
              </section>

              <section className={cx(styles.frame, styles.channels)}>
                <header><strong>Launch channels</strong><span>Owner</span></header>
                <p><i>●</i> App Store optimization <b>Jordan</b></p>
                <p><i>●</i> Fitness creators <b>Maya</b></p>
                <p><i>●</i> Community challenge <b>Alex</b></p>
              </section>

              <section className={cx(styles.frame, styles.metrics)}>
                <header><strong>Success metrics</strong></header>
                <div>
                  <span><b>10k</b> installs</span>
                  <span><b>32%</b> activation</span>
                  <span><b>18%</b> paid</span>
                </div>
              </section>

              <aside className={styles.dragSponsor}>
                <span className={styles.sponsorPill}>Kili Sponsored Ad</span>
                <strong>RevenueCat</strong>
                <p>Add subscriptions and trials to FitFlow.</p>
                <button type="button">Explore setup →</button>
              </aside>
            </div>
          )}

          <div className={styles.zoom}>
            <button type="button">☷</button>
            <button type="button">−</button>
            <b>82%</b>
            <button type="button">＋</button>
            <button type="button">?</button>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}
