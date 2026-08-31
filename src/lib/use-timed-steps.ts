"use client";

import { useEffect, useState } from "react";

/**
 * Advances a step counter on a fixed schedule once `enabled` turns true -
 * the staggered "line, then line, then sponsored card" reveal the mockups use.
 *
 * Returns `initial` until the first delay elapses, then `initial + 1`,
 * `initial + 2`, and so on. `delays` are measured from the moment the sequence
 * became enabled (not from each other) and must be a stable module-level
 * constant, since a new array restarts the schedule.
 */
export function useTimedSteps(
  delays: readonly number[],
  { enabled, initial = 0 }: { enabled: boolean; initial?: number }
) {
  const [step, setStep] = useState(initial);

  useEffect(() => {
    if (!enabled) return;
    const timers = delays.map((delay, index) =>
      window.setTimeout(() => setStep(initial + index + 1), delay)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [enabled, delays, initial]);

  return step;
}
