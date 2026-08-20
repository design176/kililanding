"use client";

import { useEffect, useState } from "react";
import { WindowChrome } from "./WindowChrome";
import styles from "./MiroMockup.module.css";

const PROMPT = "Create a launch plan for a new fitness app";
const LOADING_MESSAGES = [
  "Understanding your launch goals…",
  "Organizing milestones…",
  "Building your launch board…",
];

export function MiroMockup() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(0);

  useEffect(() => {
    if (step !== 0 || typedPrompt === PROMPT) return;
    const timer = window.setTimeout(() => setTypedPrompt(PROMPT.slice(0, typedPrompt.length + 1)), 40);
    return () => window.clearTimeout(timer);
  }, [step, typedPrompt]);

  // Auto-generate shortly after typing finishes — no press-Enter cue.
  useEffect(() => {
    if (step !== 0 || typedPrompt !== PROMPT) return;
    const timer = window.setTimeout(() => {
      setLoadingMessage(0);
      setStep(1);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [step, typedPrompt]);

  useEffect(() => {
    if (step !== 1) return;
    const messageTimer = window.setInterval(
      () => setLoadingMessage((current) => Math.min(current + 1, 2)),
      1250
    );
    const finishTimer = window.setTimeout(() => setStep(2), 4200);
    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(finishTimer);
    };
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
          <button className={styles.active} type="button">➤</button>
          <button type="button">▣</button>
          <button type="button">▢</button>
          <button type="button">T</button>
          <button type="button">◇</button>
          <button type="button">✎</button>
          <button type="button">＋</button>
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
                <button type="button">Learn more ↗</button>
              </aside>
            </div>
          )}

          {step === 2 && (
            <div className={styles.canvas}>
              <div className={styles.boardTitle}>
                <small>PRODUCT LAUNCH</small>
                <strong>FitFlow launch plan</strong>
                <span>Six-week go-to-market workspace</span>
              </div>
              <section className={`${styles.frame} ${styles.goals}`}>
                <header><strong>Launch goals</strong><span>3 notes</span></header>
                <div>
                  <i>Reach 10k installs</i>
                  <i>Validate premium plan</i>
                  <i>Build a referral loop</i>
                </div>
              </section>
              <section className={`${styles.frame} ${styles.timeline}`}>
                <header><strong>Six-week timeline</strong><span>May — June</span></header>
                <div className={styles.track}>
                  <b>Research</b><b>Beta</b><b>Creator launch</b><b>Release</b>
                </div>
              </section>
              <section className={`${styles.frame} ${styles.channels}`}>
                <header><strong>Launch channels</strong><span>Owner</span></header>
                <p><i>●</i> App Store optimization <b>Jordan</b></p>
                <p><i>●</i> Fitness creators <b>Maya</b></p>
                <p><i>●</i> Community challenge <b>Alex</b></p>
              </section>
              <section className={`${styles.frame} ${styles.metrics}`}>
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
