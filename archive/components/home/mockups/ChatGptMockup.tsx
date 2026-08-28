"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Plus,
  MagnifyingGlass,
  PushPin,
  ChatCircle,
  PencilLine,
  CaretDown,
  Microphone,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { cx } from "@/lib/cx";
import { useTimedSteps } from "@/lib/use-timed-steps";
import { useTypewriter } from "@/lib/use-typewriter";
import { useAutoScrollToBottom } from "@/lib/use-auto-scroll";
import { WindowChrome } from "./WindowChrome";
import styles from "./ChatGptMockup.module.css";

const PROMPT = "Help me build a private AI assistant for my documents";

const ANSWER_STEPS = [
  "Parse and chunk each document as it is uploaded.",
  "Create embeddings and store them in a vector index.",
  "Retrieve only the most relevant passages for every question.",
  "Send those passages to your model with clear source citations.",
];

/** Reveal schedule, in ms from send: intro line, four list items, then the ad. */
const REVEAL_DELAYS = [700, 1200, 1700, 2200, 2700, 3400];

const SIDEBAR_ACTIONS = [
  { label: "New chat", Icon: PencilLine },
  { label: "Search", Icon: MagnifyingGlass },
  { label: "Pinned chats", Icon: PushPin },
  { label: "Chats", Icon: ChatCircle },
];

const VOICE_BAR_HEIGHTS = [6, 12, 8, 10];

export function ChatGptMockup() {
  const [sent, setSent] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const typedPrompt = useTypewriter(PROMPT, {
    enabled: !sent,
    speed: 38,
    settleMs: 700,
    onSettle: () => setSent(true),
  });

  // -1 while the assistant is still "thinking", then 0…5 as each piece lands.
  const step = useTimedSteps(REVEAL_DELAYS, { enabled: sent, initial: -1 });
  useAutoScrollToBottom(threadRef, step);

  return (
    <WindowChrome app="chatgpt" title="ChatGPT">
      <div className={styles.app}>
        <aside className={styles.sidebar} aria-label="ChatGPT navigation">
          <Image src="/assets/chatgpt.png" alt="ChatGPT" width={22} height={22} />
          {SIDEBAR_ACTIONS.map(({ label, Icon }) => (
            <button key={label} type="button" aria-label={label}><Icon size={17} /></button>
          ))}
          <span className={styles.avatar}>GL</span>
        </aside>

        <main className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.modeSwitch}>
              <button className={styles.active} type="button">Chat</button>
              <button type="button">Work</button>
            </div>
            <ChatCircle size={17} />
          </header>

          {!sent ? (
            <section className={styles.start}>
              <h2>Hey. Ready to dive in?</h2>
              <div className={styles.composer}>
                <Plus size={17} />
                <span className={styles.prompt}>
                  {typedPrompt}
                  <i className={styles.caret} />
                </span>
                <button className={styles.model} type="button">Instant <CaretDown size={11} /></button>
                <Microphone size={16} />
                <span className={styles.voiceBtn} aria-hidden="true">
                  {VOICE_BAR_HEIGHTS.map((height, index) => (
                    <i key={index} style={{ height }} />
                  ))}
                </span>
              </div>
              <div className={styles.suggestions}>
                <button type="button">▧ <span>Create an image</span></button>
                <button type="button"><PencilLine size={14} /> <span>Write or edit</span></button>
                <button type="button">◎ <span>Search the web</span></button>
              </div>
            </section>
          ) : (
            <section className={styles.thread}>
              <div className={styles.threadInner} ref={threadRef}>
                <p className={styles.userMessage}>{PROMPT}</p>
                <article className={styles.response}>
                  <Image src="/assets/chatgpt.png" alt="" width={22} height={22} />
                  <div>
                    {step < 0 ? (
                      <div className={styles.thinking}><i /><i /><i /></div>
                    ) : (
                      <strong className={styles.reveal}>Here&apos;s a clean way to structure it:</strong>
                    )}

                    <ol>
                      {ANSWER_STEPS.map((text, index) =>
                        step > index ? (
                          <li className={styles.reveal} key={text}>{text}</li>
                        ) : null
                      )}
                    </ol>

                    {step >= ANSWER_STEPS.length + 1 && (
                      <div className={cx(styles.reveal, styles.adReveal)}>
                        <aside className={styles.sponsoredCard}>
                          <span className={styles.sponsoredLabel}>Kili Sponsored Ad</span>
                          <div className={styles.sponsoredCopy}>
                            <strong>Pinecone</strong>
                            <p>Add production-ready vector search as your document collection grows.</p>
                          </div>
                          <button type="button">Explore Pinecone →</button>
                        </aside>
                      </div>
                    )}
                  </div>
                </article>
              </div>

              <div className={styles.followup}>
                <Plus size={17} /><span>Ask anything</span><Microphone size={16} />
                <button className={styles.send} type="button"><PaperPlaneRight size={13} weight="fill" /></button>
              </div>
            </section>
          )}
        </main>
      </div>
    </WindowChrome>
  );
}
