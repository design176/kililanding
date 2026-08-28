"use client";

import { useEffect, useState } from "react";
import { ChatGptMockup } from "./ChatGptMockup";
import { ClaudeCodeMockup } from "./ClaudeCodeMockup";
import { MiroMockup } from "./MiroMockup";

type MockupKind = "claude" | "miro" | "chatgpt";

const LOOP_DURATION: Record<MockupKind, number> = {
  claude: 11000,
  miro: 9500,
  chatgpt: 9500,
};

/** Remounts a completed product demo after a short hold on its sponsored result. */
export function LoopingPlacementMockup({ kind }: { kind: MockupKind }) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setCycle((value) => value + 1), LOOP_DURATION[kind]);
    return () => window.clearTimeout(timer);
  }, [cycle, kind]);

  if (kind === "claude") return <ClaudeCodeMockup key={cycle} />;
  if (kind === "miro") return <MiroMockup key={cycle} />;
  return <ChatGptMockup key={cycle} />;
}
