"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WindowChrome } from "./WindowChrome";
import styles from "./ClaudeCodeMockup.module.css";

const QUERY = "Deploy this Next.js app using Deployment Expert MCP";

const RESPONSE_LINES = [
  { kind: "copy", text: "I'll inspect the project and prepare a production deployment." },
  { kind: "tool", text: "⏺ Read package.json" },
  { kind: "tool", text: "⏺ Read .env.example" },
  { kind: "mcp", text: "⏺ deployment-expert · compare_deployment_targets" },
  { kind: "tool", text: "✓ Deployment Expert MCP · platform comparison received" },
  { kind: "tool", text: "⏺ Bash npm run build" },
  { kind: "copy", text: "The production build passes. Your app is ready to deploy." },
  {
    kind: "success",
    text: "✓ Deployment plan ready — build and environment configuration verified.",
  },
  { kind: "deployment-options", text: "I found three good deployment paths for this project." },
] as const;

export function ClaudeCodeMockup() {
  const [step, setStep] = useState<0 | 1>(0);
  const [typedQuery, setTypedQuery] = useState("");
  const [responseLength, setResponseLength] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Type the query, then auto-submit shortly after (no press-Enter cue).
  useEffect(() => {
    if (step !== 0 || typedQuery === QUERY) return;
    const timer = window.setTimeout(() => setTypedQuery(QUERY.slice(0, typedQuery.length + 1)), 42);
    return () => window.clearTimeout(timer);
  }, [step, typedQuery]);

  useEffect(() => {
    if (step !== 0 || typedQuery !== QUERY) return;
    const timer = window.setTimeout(() => setStep(1), 700);
    return () => window.clearTimeout(timer);
  }, [step, typedQuery]);

  // Stream the response, character by character, with pauses at line breaks.
  useEffect(() => {
    if (step !== 1) return;

    const totalLength = RESPONSE_LINES.reduce((total, line) => total + line.text.length, 0);
    const lineEnds = RESPONSE_LINES.map((_, index) =>
      RESPONSE_LINES.slice(0, index + 1).reduce((total, line) => total + line.text.length, 0)
    );
    let currentLength = 0;
    let timer: number | undefined;

    const typeNext = () => {
      currentLength = Math.min(currentLength + 3, totalLength);
      setResponseLength(currentLength);
      if (currentLength >= totalLength) return;

      const crossedLineEnd = lineEnds.some(
        (end) => currentLength >= end && currentLength - 3 < end
      );
      timer = window.setTimeout(typeNext, crossedLineEnd ? 260 : 16);
    };

    timer = window.setTimeout(typeNext, 400);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [responseLength]);

  function visibleLine(index: number) {
    const consumed = RESPONSE_LINES.slice(0, index).reduce((t, l) => t + l.text.length, 0);
    return RESPONSE_LINES[index].text.slice(0, Math.max(0, responseLength - consumed));
  }

  return (
    <WindowChrome app="claude" title="Claude Code">
      <div className={styles.tui}>
        {step === 0 ? (
          <div className={styles.startScreen}>
            <div className={styles.identity}>
              <Image src="/assets/claude-code.svg" alt="" width={56} height={56} priority />
              <div>
                <strong>Claude Code</strong>
                <p>Sonnet 4.5</p>
                <small>~/project/kili</small>
              </div>
              <Image className={styles.mark} src="/assets/claude-mark.png" alt="" width={24} height={24} />
            </div>
            <div className={styles.composer}>
              <div className={styles.startInput}>
                <span className={styles.prompt}>❯</span>
                <span>{typedQuery}</span>
                <span className={styles.caret} aria-hidden="true" />
              </div>
              <div className={styles.startMeta}>
                <span>Sonnet 4.5</span>
                <span>Deployment Expert MCP enabled</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.sessionHeader}>
              <div className={styles.sessionBrand}>
                <Image src="/assets/claude-code.svg" alt="" width={26} height={26} />
                <div>
                  <strong>Claude Code</strong>
                  <span>Sonnet 4.5 · ~/project/kili</span>
                </div>
              </div>
              <span>Deployment Expert MCP</span>
            </div>

            <div className={styles.transcript} ref={transcriptRef}>
              <div className={styles.userPrompt}>
                <span>❯</span> {QUERY}
              </div>
              <div className={styles.response} aria-live="polite">
                {RESPONSE_LINES.map((line, index) => {
                  const visible = visibleLine(index);
                  if (!visible) return null;

                  if (line.kind === "deployment-options") {
                    return (
                      <section className={styles.deploymentOptions} key={line.text}>
                        <p>
                          {visible}
                          {visible.length < line.text.length && <i className={styles.streamCaret} />}
                        </p>
                        <div className={styles.option}>
                          <strong>Vercel</strong>
                          <small>Zero-config Next.js deployment</small>
                        </div>
                        <div className={styles.option}>
                          <strong>Render</strong>
                          <small>Managed web service with simple scaling</small>
                        </div>
                        <div className={`${styles.option} ${styles.sponsored}`}>
                          <div className={styles.optionHeading}>
                            <strong>Railway</strong>
                            <span>Kili Sponsored Ad</span>
                          </div>
                          <p>Managed builds, environment variables, and preview environments. Get $5 in free credits.</p>
                          {visible.length === line.text.length && (
                            <button type="button">Set up Railway and get started →</button>
                          )}
                        </div>
                      </section>
                    );
                  }

                  return (
                    <p className={`${styles.line} ${styles[line.kind]}`} key={line.text}>
                      {visible}
                      {visible.length < line.text.length && (
                        <span className={styles.streamCaret} aria-hidden="true" />
                      )}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.composerWrap}>
              <div className={styles.followup}>
                <span>❯</span>
                <div className={styles.followupMeta}>
                  <span>Sonnet 4.5</span>
                  <span>Deployment Expert MCP connected</span>
                </div>
              </div>
              <div className={styles.shortcuts}>
                <span>esc to interrupt</span>
                <span>shift+tab cycle mode &nbsp;·&nbsp; ? shortcuts</span>
              </div>
            </div>
          </>
        )}
      </div>
    </WindowChrome>
  );
}
