"use client";

import { useEffect, useState } from "react";
import { TabTimerRing } from "./TabTimerRing";
import { DemoStage } from "./DemoStage";
import styles from "./HomeDemoBand.module.css";

const TAB_DURATION = 12000;

const TABS = [
  { id: "chat", label: "Chat tools" },
  { id: "mcp", label: "MCP Servers" },
  { id: "creative", label: "Creative Tools" },
  { id: "web", label: "Web Apps" },
];

export function HomeDemoBand() {
  const [active, setActive] = useState(0);
  // Bumped on every change (auto-advance or click) so the timer ring's
  // animation restarts even when re-selecting the same index.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % TABS.length);
      setCycle((c) => c + 1);
    }, TAB_DURATION);
    return () => clearTimeout(timer);
  }, [active, cycle]);

  const handleSelect = (index: number) => {
    setActive(index);
    setCycle((c) => c + 1);
  };

  return (
    <>
      <div className={styles.notchRow}>
        <NotchEar />
        <div className={styles.tabList}>
          {TABS.map((tab, index) => {
            const isActive = index === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(index)}
                className={isActive ? styles.tabActive : styles.tab}
                aria-pressed={isActive}
              >
                {tab.label}
                {isActive && (
                  <TabTimerRing duration={TAB_DURATION} animationKey={`${tab.id}-${cycle}`} />
                )}
              </button>
            );
          })}
        </div>
        <NotchEar flip />
      </div>

      <div className={styles.demoFrame}>
        <DemoStage active={TABS[active].id} cycle={cycle} />
      </div>
    </>
  );
}

/**
 * The concave "ear" that flares the tab list's flat top edge out into the
 * grid background — the MacBook-notch curve on either side of the pills.
 */
function NotchEar({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={styles.notchEar}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M32 0H0C18 0 32 16 32 32V0Z" fill="var(--color-bg)" />
    </svg>
  );
}
