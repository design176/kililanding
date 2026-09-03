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
import { KiliMark } from "@/components/Logo";
import { BODY_FONTS, HEADING_FONTS } from "@/lib/fonts";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { useMounted } from "@/lib/use-mounted";
import { WindowChrome } from "./WindowChrome";

/** Sponsor mark for the "Rocket X" ad slot - literal brand color, not a design token (third-party mark). */
function RocketXMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#ECF335" />
      <path
        d="M4 4H9V9H4V4ZM9 9H15V15H9V9ZM15 4H20V9H15V4ZM4 15H9V20H4V15ZM15 15H20V20H15V15Z"
        fill="#0A0A0A"
      />
    </svg>
  );
}
import styles from "./CodeEditorMockup.module.css";

const PAGE_FILE = "page.tsx";
const CONFIG_FILE = "kili.config.ts";
/** Both stay open as tabs; the `file` prop decides which one reads as active. */
const TABS = [PAGE_FILE, CONFIG_FILE];

/** The Kili integration is stubbed out until the platform side ships - only
 * the intro line is live, everything below it reads as commented out. */
const COMING_SOON_COMMENTED_LINES = [
  "",
  "export default defineConfig({",
  "  apiKey: process.env.KILI_API_KEY,",
  '  placement: "in-answer",',
  "});",
];

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

/** The rotating asterisk glyph Claude Code's CLI uses for its "thinking" spinner. */
const SPINNER_FRAMES = ["✶", "✳", "✢", "✳"];
const SPINNER_TICK_MS = 130;

/** Matches the CSS `ccThinkingStrikeDraw` cycle (CodeEditorMockup.module.css):
 * the line is struck through from 8% to 81% of the shared 6.6s loop, so the
 * spinner freezes there instead of still cycling underneath a strikethrough. */
const TERMINAL_CYCLE_MS = 6600;
const STRUCK_START_MS = 0.13 * TERMINAL_CYCLE_MS;
const STRUCK_END_MS = 0.89 * TERMINAL_CYCLE_MS;

function ThinkingSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let lastTick = 0;

    const update = (now: number) => {
      const cyclePosition = now % TERMINAL_CYCLE_MS;
      const isStruck = cyclePosition >= STRUCK_START_MS && cyclePosition < STRUCK_END_MS;

      if (!isStruck && now - lastTick >= SPINNER_TICK_MS) {
        lastTick = now;
        setFrame((current) => (current + 1) % SPINNER_FRAMES.length);
      }

      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <>{SPINNER_FRAMES[frame]}</>;
}

const COUNTER_DURATION_MS = 18000;
const COUNTER_LOOP_MS = 22000;

/** Matches the CSS `ccAdReveal` cycle (CodeEditorMockup.module.css) that
 * fades the ad block + tooltips in at 17% and starts fading them out at
 * 77% of the shared 6.6s loop, so the tooltip counters can be phase-locked
 * to that same reveal instead of ticking on their own independent clock. */
const AD_VISIBLE_AT_MS = 0.17 * TERMINAL_CYCLE_MS;
const AD_FADE_OUT_AT_MS = 0.77 * TERMINAL_CYCLE_MS;
const AD_COUNT_SETTLE_MS = 300;
const AD_COUNT_START_MS = AD_VISIBLE_AT_MS + AD_COUNT_SETTLE_MS;
const AD_COUNT_END_MS = AD_FADE_OUT_AT_MS - AD_COUNT_SETTLE_MS;

function LoopingCounter({
  target,
  currency = false,
  seconds = false,
  syncToAdCycle = false,
}: {
  target: number;
  currency?: boolean;
  seconds?: boolean;
  /** Ties the count-up to the shared ad-reveal cycle (see above) instead of
   * running its own independent loop - for the two tooltip counters that
   * flank the sponsored ad in `RevenueShowcase`. */
  syncToAdCycle?: boolean;
}) {
  const startingValue = target * 0.82;
  const [value, setValue] = useState(startingValue);

  useEffect(() => {
    let animationFrame = 0;
    const startedAt = performance.now();

    const update = (now: number) => {
      let progress: number;

      if (syncToAdCycle) {
        const cyclePosition = now % TERMINAL_CYCLE_MS;
        progress =
          (cyclePosition - AD_COUNT_START_MS) / (AD_COUNT_END_MS - AD_COUNT_START_MS);
      } else {
        const elapsed = (now - startedAt) % COUNTER_LOOP_MS;
        progress = elapsed / COUNTER_DURATION_MS;
      }
      progress = Math.min(Math.max(progress, 0), 1);

      const easedProgress = 1 - (1 - progress) ** 3;

      setValue(startingValue + (target - startingValue) * easedProgress);
      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [startingValue, target, syncToAdCycle]);

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

/** The floating terminal window used standalone on the home page: just the
 * macOS-style title bar and the sponsored ad line, nothing else. */
function ClaudeCodeTerminal() {
  return (
    <div className={`${styles.agentPanel} ${styles.agentPanelStandalone}`}>
      <div className={styles.terminalBar}>
        <div className={styles.terminalControls}>
          <span className={`${styles.terminalDot} ${styles.terminalClose}`} aria-hidden="true" />
          <span className={`${styles.terminalDot} ${styles.terminalMinimize}`} aria-hidden="true" />
          <span className={`${styles.terminalDot} ${styles.terminalExpand}`} aria-hidden="true" />
        </div>
        <span className={styles.terminalTitle}>Claude Code</span>
      </div>

      <div className={styles.terminalBody}>
        <div className={styles.ccThinkingLine} aria-hidden="true">
          <span className={styles.ccThinkingMark}>
            <ThinkingSpinner />
          </span>
          <span className={styles.ccThinkingText}>Thinking&hellip;</span>
          <span className={styles.ccThinkingMeta}>(thinking with medium effort)</span>
          <span className={styles.ccThinkingStrike} aria-hidden="true" />
        </div>

        <div className={styles.ccAd}>
          <div className={styles.ccAdLine}>
            <KiliMark size={16} className={styles.ccAdLogo} />
            <span className={styles.ccAdBrand}>[KILI AD]</span>
            <span className={styles.ccAdSubtext}>Get paid on every AI answer.</span>
            <span className={styles.ccAdSpacer} />
            <span className={styles.ccAdStatus}>
              <span className={styles.ccAdStatusDefault}>
                <ThinkingStatusWord /> &middot; <LoopingCounter target={0.2} seconds />
              </span>
              {/* Mobile swaps the status timer for the tooltip content that's
                  hidden at that width - see the ≤640px rules below. */}
              <span className={styles.ccAdStatusMobile}>
                <span className={styles.ccAdStatusMobileLabel}>Earned with Kili</span>
                <strong className={styles.ccAdStatusMobileValue}>
                  <LoopingCounter target={1248.36} currency />
                </strong>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClaudeCodePanel() {
  return (
    <div className={styles.agentPanel}>
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

      <div className={styles.ccTitleRow}>
        <span className={styles.ccTitle}>Ship the ad placement</span>
        <div className={styles.ccTitleIcons}>
          <Clock size={13} weight="bold" />
          <ChatCircle size={13} weight="bold" />
        </div>
      </div>

      <div className={styles.ccMessages}>
        <div className={styles.ccUserBubble}>Add Kili to my app</div>

        <p className={styles.ccAssistantText}>
          On it - I&apos;ll wire the SDK and match it against your existing ad slots (
          <span className={styles.ccChip}>match.ts</span> and{" "}
          <span className={styles.ccChip}>kili.config.ts</span>), so nothing else in the app has to change.
        </p>

        <div className={styles.ccUserBubble}>read my codebase</div>

        <div className={styles.ccAd}>
          <div className={styles.ccAdLine}>
            <RocketXMark size={16} className={styles.ccAdLogo} />
            <span className={`${styles.ccAdBrand} ${styles.ccAdBrandAlt}`}>[Rocket X]</span>
            <span className={styles.ccAdSubtext}></span>
            <span className={styles.ccAdSpacer} />
            <span className={styles.ccAdStatus}>
              <ThinkingStatusWord /> &middot; 0.2s
            </span>
          </div>
          <span className={`${styles.ccAdCta} ${styles.ccAdCtaAlt}`}>
            Best CEX and DEX aggregator &rarr;
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
 * the editor. Purely presentational - nothing inside is clickable or focusable.
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
  const resolveFont = <T extends { id: string }>(list: T[], id: string) =>
    (mounted ? list.find((font) => font.id === id) : undefined) ?? list[0];
  const headingFont = resolveFont(HEADING_FONTS, headingFontId);
  const bodyFont = resolveFont(BODY_FONTS, bodyFontId);
  const codeLines = file === CONFIG_FILE ? CODE_BY_FILE[CONFIG_FILE] : null;

  return (
    <WindowChrome app="editor" title="VS Code">
      <div className={styles.editor} aria-hidden="true">
        {/* The Explorer stays collapsed - no icon is active and the file tree
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
 * The "I use AI Agents" side of the home page toggle: the standalone Claude
 * Code panel with the running earnings/tokens callouts.
 */
export function RevenueShowcase() {
  return (
    <section className={styles.revenueClaudeShowcase} aria-label="Kili revenue and Claude Code demo">
      <aside className={`${styles.revenueTooltip} ${styles.earningsTooltip}`} aria-label="Earned with Kili">
        <span>Earned with Kili</span>
        <strong aria-label="1,248 dollars and 36 cents earned with Kili">
          <LoopingCounter target={1248.36} currency />
        </strong>
        <svg
          className={`${styles.earningsConnector} ${styles.earningsConnectorThinking}`}
          viewBox="0 0 84 20"
          aria-hidden="true"
        >
          <path className={styles.connectorRoute} d="M0 2V14H80" />
          <path className={styles.connectorArrow} d="M73 9L80 14L73 19" />
        </svg>
        <svg
          className={`${styles.earningsConnector} ${styles.earningsConnectorKili}`}
          viewBox="0 0 84 38"
          aria-hidden="true"
        >
          <path className={styles.connectorRoute} d="M0 2V31H80" />
          <path className={styles.connectorArrow} d="M73 26L80 31L73 36" />
        </svg>
      </aside>
      <ClaudeCodeTerminal />
    </section>
  );
}

/**
 * The "I build AI Platforms" side of the home page toggle: a single-tab VS
 * Code window with the Kili config stubbed out - a plain "coming soon"
 * line up top, every line below it commented out.
 */
export function ComingSoonMockup() {
  return (
    <WindowChrome app="editor" title="VS Code" className={styles.comingSoonWindow}>
      <div className={styles.comingSoonEditor} aria-hidden="true">
        <div className={styles.tabs}>
          <span className={styles.tabActive}>{CONFIG_FILE}</span>
        </div>

        <div className={styles.code}>
          <CodeLine number={1}>
            <span className={styles.comingSoonHeading}>
              Integrate Kili in your products and earn from ads - coming soon
            </span>
          </CodeLine>
          <CodeLine number={2}>
            <span className={styles.comment}>
              {"// import { defineConfig } from "}
              <span className={styles.blurredText}>&quot;@kili-ai/sdk&quot;</span>;
            </span>
          </CodeLine>
          {COMING_SOON_COMMENTED_LINES.map((line, index) => (
            <CodeLine number={index + 3} key={index}>
              <span className={styles.comment}>{line ? `// ${line}` : "//"}</span>
            </CodeLine>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
}
