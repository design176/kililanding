"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChatGptMockup } from "./mockups/ChatGptMockup";
import { ClaudeCodeMockup } from "./mockups/ClaudeCodeMockup";
import { MiroMockup } from "./mockups/MiroMockup";
import { ScribbleMockup } from "./mockups/ScribbleMockup";
import { WindowChrome } from "./mockups/WindowChrome";
import styles from "./DemoStage.module.css";

function renderMockup(active: string) {
  switch (active) {
    case "chat":
      return <ChatGptMockup />;
    case "mcp":
      return <ClaudeCodeMockup />;
    case "creative":
      return <MiroMockup />;
    case "web":
      return <ScribbleMockup />;
    default:
      return null;
  }
}

export function DemoStage({ active, cycle }: { active: string; cycle: number }) {
  return (
    <div className={styles.stage}>
      {/* Persistent empty window frame so the border/chrome never
          disappears during the exit → enter gap between slides. */}
      <div className={styles.base} aria-hidden="true">
        <WindowChrome app="base" title="">{null}</WindowChrome>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${cycle}`}
          className={styles.slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {renderMockup(active)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
