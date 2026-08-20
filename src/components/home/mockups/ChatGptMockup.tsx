"use client";

import { useEffect, useState } from "react";
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
import { WindowChrome } from "./WindowChrome";
import styles from "./ChatGptMockup.module.css";

const PROMPT = "Help me build a private AI assistant for my documents";

export function ChatGptMockup() {
  const [sent, setSent] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [responseStep, setResponseStep] = useState(-1);

  useEffect(() => {
    if (sent || typedPrompt === PROMPT) return;
    const timer = window.setTimeout(() => setTypedPrompt(PROMPT.slice(0, typedPrompt.length + 1)), 38);
    return () => window.clearTimeout(timer);
  }, [sent, typedPrompt]);

  // Auto-send shortly after typing finishes — no press-Enter cue.
  useEffect(() => {
    if (sent || typedPrompt !== PROMPT) return;
    const timer = window.setTimeout(() => setSent(true), 700);
    return () => window.clearTimeout(timer);
  }, [sent, typedPrompt]);

  useEffect(() => {
    if (!sent) return;
    const timers = [
      window.setTimeout(() => setResponseStep(0), 700),
      window.setTimeout(() => setResponseStep(1), 1200),
      window.setTimeout(() => setResponseStep(2), 1700),
      window.setTimeout(() => setResponseStep(3), 2200),
      window.setTimeout(() => setResponseStep(4), 2700),
      window.setTimeout(() => setResponseStep(5), 3400),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sent]);

  return (
    <WindowChrome app="chatgpt" title="ChatGPT">
      <div className={styles.app}>
        <aside className={styles.sidebar} aria-label="ChatGPT navigation">
          <Image src="/assets/chatgpt.png" alt="ChatGPT" width={22} height={22} />
          <button type="button" aria-label="New chat"><PencilLine size={17} /></button>
          <button type="button" aria-label="Search"><MagnifyingGlass size={17} /></button>
          <button type="button" aria-label="Pinned chats"><PushPin size={17} /></button>
          <button type="button" aria-label="Chats"><ChatCircle size={17} /></button>
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
                  <i /><i /><i /><i />
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
              <div className={styles.threadInner}>
                <p className={styles.userMessage}>{PROMPT}</p>
                <article className={styles.response}>
                  <Image src="/assets/chatgpt.png" alt="" width={22} height={22} />
                  <div>
                    {responseStep < 0 && (
                      <div className={styles.thinking}><i /><i /><i /></div>
                    )}
                    {responseStep >= 0 && (
                      <strong className={styles.reveal}>Here&apos;s a clean way to structure it:</strong>
                    )}
                    <ol>
                      {responseStep >= 1 && <li className={styles.reveal}>Parse and chunk each document as it is uploaded.</li>}
                      {responseStep >= 2 && <li className={styles.reveal}>Create embeddings and store them in a vector index.</li>}
                      {responseStep >= 3 && <li className={styles.reveal}>Retrieve only the most relevant passages for every question.</li>}
                      {responseStep >= 4 && <li className={styles.reveal}>Send those passages to your model with clear source citations.</li>}
                    </ol>
                    {responseStep >= 5 && (
                      <div className={`${styles.reveal} ${styles.adReveal}`}>
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
