"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cx } from "@/lib/cx";
import { useAutoScrollToBottom } from "@/lib/use-auto-scroll";
import { useTypewriter } from "@/lib/use-typewriter";
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
    text: "✓ Deployment plan ready - build and environment configuration verified.",
  },
  { kind: "deployment-options", text: "I found three good deployment paths for this project." },
] as const;

/** Character offset at the end of each line, so streaming is a single counter. */
const LINE_ENDS = RESPONSE_LINES.map((_, index) =>
  RESPONSE_LINES.slice(0, index + 1).reduce((total, line) => total + line.text.length, 0)
);
const TOTAL_LENGTH = LINE_ENDS[LINE_ENDS.length - 1];

const STREAM_START_MS = 400;
const CHARS_PER_TICK = 3;
const TICK_MS = 16;
/** Beat held at the end of each line, so output reads as discrete steps. */
const LINE_PAUSE_MS = 260;

const DEPLOYMENT_OPTIONS = [
  { name: "Vercel", detail: "Zero-config Next.js deployment" },
  { name: "Render", detail: "Managed web service with simple scaling" },
];

export function ClaudeCodeMockup() {
  const [started, setStarted] = useState(false);
  const [streamed, setStreamed] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const typedQuery = useTypewriter(QUERY, {
    enabled: !started,
    speed: 42,
    settleMs: 700,
    onSettle: () => setStarted(true),
  });

  // Stream the response character by character, pausing at every line break.
  useEffect(() => {
    if (!started) return;

    let length = 0;
    let timer: number | undefined;

    const typeNext = () => {
      length = Math.min(length + CHARS_PER_TICK, TOTAL_LENGTH);
      setStreamed(length);
      if (length >= TOTAL_LENGTH) return;

      const justFinishedLine = LINE_ENDS.some(
        (end) => length >= end && length - CHARS_PER_TICK < end
      );
      timer = window.setTimeout(typeNext, justFinishedLine ? LINE_PAUSE_MS : TICK_MS);
    };

    timer = window.setTimeout(typeNext, STREAM_START_MS);
    return () => window.clearTimeout(timer);
  }, [started]);

  useAutoScrollToBottom(transcriptRef, streamed);

  /** How much of a given line has been streamed so far. */
  function visibleText(index: number) {
    const start = LINE_ENDS[index] - RESPONSE_LINES[index].text.length;
    return RESPONSE_LINES[index].text.slice(0, Math.max(0, streamed - start));
  }

  if (!started) {
    return (
      <WindowChrome app="claude" title="Claude Code">
        <div className={styles.tui}>
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
        </div>
      </WindowChrome>
    );
  }

  return (
    <WindowChrome app="claude" title="Claude Code">
      <div className={styles.tui}>
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
              const visible = visibleText(index);
              if (!visible) return null;
              const streaming = visible.length < line.text.length;

              if (line.kind === "deployment-options") {
                return (
                  <section className={styles.deploymentOptions} key={line.text}>
                    <p>
                      {visible}
                      {streaming && <i className={styles.streamCaret} />}
                    </p>

                    {DEPLOYMENT_OPTIONS.map(({ name, detail }) => (
                      <div className={styles.option} key={name}>
                        <strong>{name}</strong>
                        <small>{detail}</small>
                      </div>
                    ))}

                    <div className={cx(styles.option, styles.sponsored)}>
                      <div className={styles.optionHeading}>
                        <strong>Railway</strong>
                        <span>Kili Sponsored Ad</span>
                      </div>
                      <p>Managed builds, environment variables, and preview environments. Get $5 in free credits.</p>
                      {!streaming && <button type="button">Set up Railway and get started →</button>}
                    </div>
                  </section>
                );
              }

              return (
                <p className={cx(styles.line, styles[line.kind])} key={line.text}>
                  {visible}
                  {streaming && <span className={styles.streamCaret} aria-hidden="true" />}
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
      </div>
    </WindowChrome>
  );
}
