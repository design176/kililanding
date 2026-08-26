"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Files,
  MagnifyingGlass,
  GitBranch,
  PuzzlePiece,
  GitFork,
  X,
  ArrowsOut,
  Clock,
  ChatCircle,
  Microphone,
  Plus,
  Lightning,
  Stop,
} from "@phosphor-icons/react";
import { BODY_FONTS, HEADING_FONTS } from "@/lib/fonts";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { useMounted } from "@/lib/use-mounted";
import { WindowChrome } from "./WindowChrome";
import styles from "./CodeEditorMockup.module.css";

const PAGE_FILE = "page.tsx";
const CONFIG_FILE = "kili.config.ts";
/** Both stay open as tabs; the `file` prop decides which one reads as active. */
const TABS = [PAGE_FILE, CONFIG_FILE];

type EditorFile = typeof PAGE_FILE | typeof CONFIG_FILE;

/** Manually tokenized so each snippet reads as syntax-highlighted without a highlighter dependency. */
const CODE_BY_FILE: Record<string, { text: string; cls: string }[][]> = {
  [CONFIG_FILE]: [
    [{ text: "import", cls: "kw" }, { text: " { defineConfig } ", cls: "plain" }, { text: "from", cls: "kw" }, { text: ' "@kili-ai/sdk"', cls: "str" }, { text: ";", cls: "plain" }],
    [{ text: "", cls: "plain" }],
    [{ text: "export default ", cls: "kw" }, { text: "defineConfig", cls: "fn" }, { text: "({", cls: "plain" }],
    [{ text: "  apiKey", cls: "prop" }, { text: ": ", cls: "plain" }, { text: "process.env.KILI_API_KEY", cls: "plain" }, { text: ",", cls: "plain" }],
    [{ text: "  placement", cls: "prop" }, { text: ": ", cls: "plain" }, { text: '"in-answer"', cls: "str" }, { text: ",", cls: "plain" }],
    [{ text: "  floorCpm", cls: "prop" }, { text: ": ", cls: "plain" }, { text: "4", cls: "num" }, { text: ",", cls: "plain" }],
    [{ text: "  categories", cls: "prop" }, { text: ": [", cls: "plain" }, { text: '"dev-tools"', cls: "str" }, { text: ", ", cls: "plain" }, { text: '"finance"', cls: "str" }, { text: "],", cls: "plain" }],
    [{ text: "});", cls: "plain" }],
  ],
};

/** Cycles through the tool verbs Claude Code prints to its status line while it works. */
const STATUS_WORDS = ["Reading", "Grepping", "Bashing", "Globbing", "Searching", "Thinking"];
const STATUS_WORD_TICK_MS = 900;

function ThinkingStatusWord() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % STATUS_WORDS.length);
    }, STATUS_WORD_TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  return <>{STATUS_WORDS[frame]}</>;
}

const COUNTER_DURATION_MS = 18000;
const COUNTER_LOOP_MS = 22000;

function LoopingCounter({
  target,
  currency = false,
  seconds = false,
}: {
  target: number;
  currency?: boolean;
  seconds?: boolean;
}) {
  const startingValue = target * 0.82;
  const [value, setValue] = useState(startingValue);

  useEffect(() => {
    let animationFrame = 0;
    const startedAt = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startedAt) % COUNTER_LOOP_MS;
      const progress = Math.min(elapsed / COUNTER_DURATION_MS, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setValue(startingValue + (target - startingValue) * easedProgress);
      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [startingValue, target]);

  return (
    <>
      {seconds
        ? `${value.toFixed(2).replace(/0$/, "")}s`
        : currency
          ? `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : Math.round(value).toLocaleString("en-US")}
    </>
  );
}

function CodeLine({ number, children }: { number: number; children: ReactNode }) {
  return (
    <div className={styles.codeLine}>
      <span className={styles.lineNumber}>{number}</span>
      <span className={styles.lineContent}>{children}</span>
    </div>
  );
}

function EarningsChart() {
  return (
    <svg
      className={styles.earningsChart}
      viewBox="0 0 320 128"
      preserveAspectRatio="none"
      role="img"
      aria-label="Tokens spent and dollars earned with Kili over time"
    >
      <defs>
        <pattern id="kili-earnings-stripes" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" className={styles.chartStripe} />
        </pattern>
        <marker id="tokens-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="2.2" markerHeight="2.2" markerUnits="strokeWidth" preserveAspectRatio="xMidYMid meet" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#71717a" />
        </marker>
        <marker id="earnings-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="2.2" markerHeight="2.2" markerUnits="strokeWidth" preserveAspectRatio="xMidYMid meet" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#22c55e" />
        </marker>
      </defs>
      <path
        d="M0 105 C36 93 70 78 104 83 C139 89 164 51 199 46 C230 42 249 78 274 76 C288 75 298 66 304 54 L304 128 L0 128Z"
        className={styles.chartEarnedArea}
      />
      <path
        d="M0 96 C69 82 132 76 188 60 C235 48 270 42 304 30"
        className={styles.chartTokensLine}
        markerEnd="url(#tokens-arrow)"
      />
      <path
        d="M0 105 C36 93 70 78 104 83 C139 89 164 51 199 46 C230 42 249 78 274 76 C288 75 298 66 304 54"
        className={styles.chartEarnedLine}
        markerEnd="url(#earnings-arrow)"
      />
    </svg>
  );
}

function ClaudeCodePanel({ standalone = false }: { standalone?: boolean }) {
  return (
    <div className={`${styles.agentPanel} ${standalone ? styles.agentPanelStandalone : ""}`}>
      <div className={styles.ccTabs}>
        <span className={styles.ccTabActive}>
          <Image src="/assets/claude-mark.png" alt="" width={14} height={14} />
          Claude Code
        </span>
        <span className={styles.ccTab}>Chat</span>
        <div className={styles.ccTabIcons}>
          <ArrowsOut size={13} weight="bold" />
          <X size={13} weight="bold" />
        </div>
      </div>

      {!standalone && (
        <div className={styles.ccTitleRow}>
          <span className={styles.ccTitle}>Ship the ad placement</span>
          <div className={styles.ccTitleIcons}>
            <Clock size={13} weight="bold" />
            <ChatCircle size={13} weight="bold" />
          </div>
        </div>
      )}

      <div className={styles.ccMessages}>
        {!standalone && (
          <>
            <div className={styles.ccUserBubble}>Add Kili to my app</div>

            <p className={styles.ccAssistantText}>
              On it — I&apos;ll wire the SDK and match it against your existing ad slots (
              <span className={styles.ccChip}>match.ts</span> and{" "}
              <span className={styles.ccChip}>kili.config.ts</span>), so nothing else in the app has to change.
            </p>
          </>
        )}

        <div className={styles.ccUserBubble}>read my codebase</div>

        <div className={styles.ccAd}>
          <span className={styles.ccAdCaption}>Sponsored</span>
          <div className={styles.ccAdLine}>
            <Image src="/icon.svg" alt="" width={16} height={16} className={styles.ccAdLogo} />
            <span className={styles.ccAdBrand}>[KILI]</span>
            <span className={styles.ccAdSubtext}>Get paid on every AI answer.</span>
            <span className={styles.ccAdSpacer} />
            <span className={styles.ccAdStatus}>
              <ThinkingStatusWord /> &middot;{" "}
              {standalone ? <LoopingCounter target={0.2} seconds /> : "0.2s"}
            </span>
          </div>
          {/* Deliberately not a link: the whole mockup is decorative, and a
              focusable `href="#"` inside an aria-hidden tree is a trap. */}
          <span className={styles.ccAdCta}>
            See how Kili pays out on every session &rarr;
          </span>
        </div>
      </div>

      <div className={styles.ccComposer}>
        <div className={styles.ccComposerInput}>Queue another message&hellip;</div>
        <div className={styles.ccComposerRow}>
          <Plus size={13} weight="bold" />
          <span className={styles.ccComposerSlash}>/</span>
          <span className={styles.ccComposerSpacer} />
          <Microphone size={13} weight="bold" />
          <span className={styles.ccAutoPill}>
            <Lightning size={10} weight="fill" />
            Auto
          </span>
          <span className={styles.ccStopButton}>
            <Stop size={9} weight="fill" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * A VS Code window with Claude Code docked on the right, mid-turn: the agent is
 * working, and the sponsored placement sits in the agent panel rather than over
 * the editor. Purely presentational — nothing inside is clickable or focusable.
 *
 * It narrows by dropping panes rather than shrinking type, driven by container
 * queries on `.editor`, so it reacts to the width it is actually given.
 */
export function CodeEditorMockup({ file = PAGE_FILE }: { file?: EditorFile }) {
  // Read-only: the sample markup echoes whichever fonts the visitor picked in
  // the settings modal, but the mockup itself never changes them. The ids come
  // from localStorage, so they have to stay at the defaults until hydration or
  // the server and client render different text.
  const mounted = useMounted();
  const { headingFontId, bodyFontId } = useSiteSettings();
  const headingFont =
    (mounted ? HEADING_FONTS.find((font) => font.id === headingFontId) : undefined) ??
    HEADING_FONTS[0];
  const bodyFont =
    (mounted ? BODY_FONTS.find((font) => font.id === bodyFontId) : undefined) ?? BODY_FONTS[0];
  const codeLines = file === CONFIG_FILE ? CODE_BY_FILE[CONFIG_FILE] : null;

  return (
    <WindowChrome app="editor" title="VS Code">
      <div className={styles.editor} aria-hidden="true">
        {/* The Explorer stays collapsed — no icon is active and the file tree
            is not rendered, which is what gives the code pane its width. */}
        <div className={styles.activityBar}>
          <Files size={18} weight="regular" className={styles.activityIcon} />
          <MagnifyingGlass size={18} weight="regular" className={styles.activityIcon} />
          <GitFork size={18} weight="regular" className={styles.activityIcon} />
          <PuzzlePiece size={18} weight="regular" className={styles.activityIcon} />
        </div>

        <div className={styles.main}>
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <span key={tab} className={tab === file ? styles.tabActive : styles.tab}>
                {tab}
              </span>
            ))}
          </div>

          <div className={styles.code}>
            {file === PAGE_FILE ? (
              <>
                <CodeLine number={1}>
                  <span className={styles.kw}>import</span>
                  <span className={styles.plain}> {"{ InstallCommand }"} </span>
                  <span className={styles.kw}>from</span>
                  <span className={styles.str}> &quot;@/components/site/InstallCommand&quot;</span>
                  <span className={styles.plain}>;</span>
                </CodeLine>
                <CodeLine number={2}>
                  <span className={styles.kw}>import</span>
                  <span className={styles.plain}> styles </span>
                  <span className={styles.kw}>from</span>
                  <span className={styles.str}> &quot;./page.module.css&quot;</span>
                  <span className={styles.plain}>;</span>
                </CodeLine>
                <CodeLine number={3}>
                  <span className={styles.plain} />
                </CodeLine>
                <CodeLine number={4}>
                  <span className={styles.kw}>export default function </span>
                  <span className={styles.fn}>Page</span>
                  <span className={styles.plain}>() {"{"}</span>
                </CodeLine>
                <CodeLine number={5}>
                  <span className={styles.plain}>  </span>
                  <span className={styles.kw}>return</span>
                  <span className={styles.plain}> (</span>
                </CodeLine>
                <CodeLine number={6}>
                  <span className={styles.plain}>    &lt;</span>
                  <span className={styles.tag}>div</span>
                  <span className={styles.plain}> </span>
                  <span className={styles.prop}>className</span>
                  <span className={styles.plain}>=&quot;</span>
                  <span className={styles.str}>heading-{headingFont.id} body-{bodyFont.id}</span>
                  <span className={styles.plain}>&quot;&gt;</span>
                </CodeLine>
                <CodeLine number={7}>
                  <span className={styles.plain}>      &lt;</span>
                  <span className={styles.tag}>p</span>
                  <span className={styles.plain}> </span>
                  <span className={styles.prop}>className</span>
                  <span className={styles.plain}>={"{"}</span>
                  <span className={styles.prop}>styles.eyebrow</span>
                  <span className={styles.plain}>{"}"}&gt;</span>
                  <span className={styles.str}>Your tokens, your revenue.</span>
                  <span className={styles.plain}>&lt;/</span>
                  <span className={styles.tag}>p</span>
                  <span className={styles.plain}>&gt;</span>
                </CodeLine>
                <CodeLine number={8}>
                  <span className={styles.plain}>      &lt;</span>
                  <span className={styles.tag}>h1</span>
                  <span className={styles.plain}>&gt;</span>
                  <span className={styles.str}>Get Paid everytime your agent thinks...</span>
                  <span className={styles.plain}>&lt;/</span>
                  <span className={styles.tag}>h1</span>
                  <span className={styles.plain}>&gt;</span>
                </CodeLine>
                <CodeLine number={9}>
                  <span className={styles.plain}>      &lt;</span>
                  <span className={styles.tag}>p</span>
                  <span className={styles.plain}>&gt;</span>
                  <span className={styles.str}>Your tokens can now bring you revenue.</span>
                  <span className={styles.plain}>&lt;/</span>
                  <span className={styles.tag}>p</span>
                  <span className={styles.plain}>&gt;</span>
                </CodeLine>
                <CodeLine number={10}>
                  <span className={styles.plain}>      &lt;</span>
                  <span className={styles.tag}>InstallCommand</span>
                  <span className={styles.plain}> /&gt;</span>
                </CodeLine>
                <CodeLine number={11}>
                  <span className={styles.plain}>    &lt;/</span>
                  <span className={styles.tag}>div</span>
                  <span className={styles.plain}>&gt;</span>
                </CodeLine>
                <CodeLine number={12}>
                  <span className={styles.plain}>  );</span>
                </CodeLine>
                <CodeLine number={13}>
                  <span className={styles.plain}>{"}"}</span>
                </CodeLine>
                <CodeLine number={14}>
                  <span className={styles.plain} />
                </CodeLine>
                <CodeLine number={15}>
                  <span className={styles.kw}>function </span>
                  <span className={styles.fn}>RevenueNote</span>
                  <span className={styles.plain}>() {"{"}</span>
                </CodeLine>
                <CodeLine number={16}>
                  <span className={styles.plain}>  </span>
                  <span className={styles.kw}>return</span>
                  <span className={styles.plain}> &lt;</span>
                  <span className={styles.tag}>small</span>
                  <span className={styles.plain}>&gt;</span>
                  <span className={styles.str}>Built for the next answer.</span>
                  <span className={styles.plain}>&lt;/</span>
                  <span className={styles.tag}>small</span>
                  <span className={styles.plain}>&gt;;</span>
                </CodeLine>
                <CodeLine number={17}>
                  <span className={styles.plain}>{"}"}</span>
                </CodeLine>
              </>
            ) : (
              codeLines?.map((line, index) => (
                <div className={styles.codeLine} key={index}>
                  <span className={styles.lineNumber}>{index + 1}</span>
                  <span className={styles.lineContent}>
                    {line.map((token, tokenIndex) => (
                      <span className={styles[token.cls]} key={tokenIndex}>
                        {token.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className={styles.statusBar}>
            <span className={styles.statusItem}>
              <GitBranch size={12} weight="bold" />
              main
            </span>
            <span className={styles.statusItem}>TypeScript</span>
          </div>
        </div>

        <ClaudeCodePanel />
      </div>
    </WindowChrome>
  );
}

/**
 * Not currently placed on any page. The standalone Claude Code panel with the
 * running earnings/tokens callouts, kept from the earlier split-view concept.
 */
export function RevenueShowcase() {
  return (
    <section className={styles.revenueClaudeShowcase} aria-label="Kili revenue and Claude Code demo">
      <aside className={`${styles.revenueTooltip} ${styles.earningsTooltip}`} aria-label="Earned with Kili">
        <span>Earned with Kili</span>
        <strong aria-label="1,248 dollars and 36 cents earned with Kili">
          <LoopingCounter target={1248.36} currency />
        </strong>
        <svg className={styles.earningsConnector} viewBox="0 0 84 38" aria-hidden="true">
          <path className={styles.connectorRoute} d="M0 2V31H80" />
          <path className={styles.connectorArrow} d="M73 26L80 31L73 36" />
        </svg>
      </aside>
      <aside className={`${styles.revenueTooltip} ${styles.tokensTooltip}`} aria-label="Tokens spent">
        <span>Tokens spent</span>
        <strong aria-label="48,200 tokens spent">
          <LoopingCounter target={48200} />
        </strong>
        <svg className={styles.tokensConnector} viewBox="0 0 88 38" aria-hidden="true">
          <path className={styles.connectorRoute} d="M88 2V31H5" />
          <path className={styles.connectorArrow} d="M12 26L5 31L12 36" />
        </svg>
      </aside>
      <ClaudeCodePanel standalone />
    </section>
  );
}

/**
 * Not currently placed on any page. The earnings dashboard that used to sit
 * behind the draggable split in the editor window.
 */
export function EarningsPane() {
  return (
    <aside className={styles.blankPane} aria-label="Kili earnings snapshot">
      <div className={styles.metricCards}>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Tokens spent</span>
          <strong className={styles.metricValueTokens}>48,200</strong>
        </article>
        <hr className={styles.metricDivider} />
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Earned with Kili</span>
          <strong className={styles.metricValueEarned}>$1,248.36</strong>
        </article>
      </div>
      <div className={styles.chartPanel}>
        <div className={styles.chartHeader}>
          <div className={styles.chartLegend}>
            <span><i className={styles.legendTokens} />Tokens spent</span>
            <span><i className={styles.legendEarned} />$ earned</span>
          </div>
        </div>
        <EarningsChart />
      </div>
    </aside>
  );
}
