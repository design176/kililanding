"use client";

import { useEffect, useRef, useState } from "react";
import { Robot } from "@phosphor-icons/react";
import { WindowChrome } from "./WindowChrome";
import styles from "./ScribbleMockup.module.css";

const QUESTION = "Summarise the Scribble docs";

// Generic skeleton backdrop — stands in for the real Scribble page behind
// the widget, instead of embedding a live iframe.
function SkeletonBackdrop() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.backdropBar} />
      <div className={styles.backdropLine} style={{ width: "70%" }} />
      <div className={styles.backdropLine} style={{ width: "88%" }} />
      <div className={styles.backdropLine} style={{ width: "60%" }} />
      <div className={styles.backdropBlock} />
      <div className={styles.backdropLine} style={{ width: "78%" }} />
      <div className={styles.backdropLine} style={{ width: "52%" }} />
    </div>
  );
}

export function ScribbleMockup() {
  // 0 = typing question, 1 = thinking (sponsored card shown), 2 = answer
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [answerStage, setAnswerStage] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== 0 || typedQuestion === QUESTION) return;
    const timer = window.setTimeout(() => setTypedQuestion(QUESTION.slice(0, typedQuestion.length + 1)), 45);
    return () => window.clearTimeout(timer);
  }, [phase, typedQuestion]);

  // Auto-send shortly after typing finishes — no press-Enter cue.
  useEffect(() => {
    if (phase !== 0 || typedQuestion !== QUESTION) return;
    const timer = window.setTimeout(() => setPhase(1), 700);
    return () => window.clearTimeout(timer);
  }, [phase, typedQuestion]);

  useEffect(() => {
    if (phase !== 1) return;
    const timer = window.setTimeout(() => setPhase(2), 2600);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;
    const timers = [
      window.setTimeout(() => setAnswerStage(1), 200),
      window.setTimeout(() => setAnswerStage(2), 900),
      window.setTimeout(() => setAnswerStage(3), 1600),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [phase]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [answerStage, phase]);

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
                  <b />
                  <div>
                    <strong>Algolia</strong>
                    <em>Kili Sponsored Ad</em>
                    <p>Search that understands your documentation.</p>
                  </div>
                  <button type="button">Learn more ↗</button>
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
            <input value={phase === 0 ? typedQuestion : ""} placeholder={phase === 0 ? "" : "Ask a follow-up…"} readOnly aria-label="Ask Docs Assistant" />
            <button type="button" aria-label="Send message">↑</button>
          </div>
          <footer>Powered by Kili Ad Network</footer>
        </aside>
      </div>
    </WindowChrome>
  );
}
