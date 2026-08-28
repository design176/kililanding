"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Robot } from "@phosphor-icons/react";
import { useAutoScrollToBottom } from "@/lib/use-auto-scroll";
import { useTimedSteps } from "@/lib/use-timed-steps";
import { useTypewriter } from "@/lib/use-typewriter";
import { WindowChrome } from "./WindowChrome";
import styles from "./ScribbleMockup.module.css";

const QUESTION = "Summarise the Scribble docs";

/** How long the assistant "reads the docs" before answering. */
const THINKING_MS = 2600;

/** Reveal schedule for the three answer paragraphs, in ms from phase 2. */
const ANSWER_DELAYS = [200, 900, 1600];

const BACKDROP_LINE_WIDTHS = ["70%", "88%", "60%"];
const BACKDROP_TAIL_WIDTHS = ["78%", "52%"];

/** Generic page skeleton behind the widget — cheaper than embedding a live site. */
function SkeletonBackdrop() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.backdropBar} />
      {BACKDROP_LINE_WIDTHS.map((width) => (
        <div key={width} className={styles.backdropLine} style={{ width }} />
      ))}
      <div className={styles.backdropBlock} />
      {BACKDROP_TAIL_WIDTHS.map((width) => (
        <div key={width} className={styles.backdropLine} style={{ width }} />
      ))}
    </div>
  );
}

export function ScribbleMockup() {
  // 0 = typing the question, 1 = thinking (sponsored card shown), 2 = answering.
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const typedQuestion = useTypewriter(QUESTION, {
    enabled: phase === 0,
    speed: 45,
    settleMs: 700,
    onSettle: () => setPhase(1),
  });

  useEffect(() => {
    if (phase !== 1) return;
    const timer = window.setTimeout(() => setPhase(2), THINKING_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const answerStage = useTimedSteps(ANSWER_DELAYS, { enabled: phase === 2 });
  useAutoScrollToBottom(chatRef, `${phase}-${answerStage}`);

  return (
    <WindowChrome app="scribble" title="Scribble">
      <div className={styles.site}>
        <SkeletonBackdrop />
        <div className={styles.scrim} aria-hidden="true" />

        <aside className={styles.widget}>
          <header>
            <span className={styles.logo} aria-hidden="true">
              <Robot size={16} weight="fill" />
            </span>
            <div>
              <strong>Docs Assistant</strong>
              <small>Free AI answers supplemented by ads</small>
            </div>
          </header>

          <div className={styles.body} ref={chatRef}>
            <div className={styles.botMessage}>Hi there! 👋 How can I help you with Scribble?</div>

            {phase >= 1 && <div className={styles.userMessage}>{QUESTION}</div>}

            {phase === 1 && (
              <div className={styles.thinking}>
                <div className={styles.dots}><i /><i /><i /></div>
                <span>Reading the Scribble docs…</span>
                <aside className={styles.sponsored}>
                  <div className={styles.sponsoredTop}>
                    <b />
                    <div>
                      <div className={styles.sponsoredTitle}>
                        <strong>Algolia</strong>
                        <em>Kili Sponsored Ad</em>
                      </div>
                      <p>Search that understands your documentation.</p>
                    </div>
                  </div>
                  <button type="button">
                    Learn more <ArrowUpRight size={12} weight="bold" />
                  </button>
                </aside>
              </div>
            )}

            {phase === 2 && (
              <div className={styles.answer}>
                {answerStage >= 1 && (
                  <p>Scribble helps brands turn product knowledge into structured, citation-ready content that both customers and AI systems can understand.</p>
                )}
                {answerStage >= 2 && (
                  <p>It brings documentation, content publishing, creator distribution, and measurable brand visibility into one workflow.</p>
                )}
                {answerStage >= 3 && (
                  <p>
                    For faster discovery across those published pages, <strong>Algolia</strong>{" "}
                    <span className={styles.inlineAd}>Kili Sponsored Ad</span> can index the
                    documentation and provide instant, relevant search inside the product.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <input
              value={phase === 0 ? typedQuestion : ""}
              placeholder={phase === 0 ? "" : "Ask a follow-up…"}
              readOnly
              aria-label="Ask Docs Assistant"
            />
            <button type="button" aria-label="Send message"><ArrowUp size={13} weight="bold" /></button>
          </div>
          <footer>Powered by Kili Ad Network</footer>
        </aside>
      </div>
    </WindowChrome>
  );
}
