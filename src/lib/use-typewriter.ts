"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterOptions {
  /** While false the text stops growing and whatever was typed stays put. */
  enabled?: boolean;
  /** Milliseconds between characters. */
  speed?: number;
  /** How long to wait after the last character before calling `onSettle`. */
  settleMs?: number;
  /** Fired once `settleMs` has elapsed — the mockups use it to auto-submit. */
  onSettle?: () => void;
}

/**
 * Types `text` out one character at a time, then (optionally) fires a callback
 * a beat later. Every app mockup opens on the same beat — a prompt types
 * itself, pauses, and sends without a press-Enter cue — so they all share this.
 */
export function useTypewriter(
  text: string,
  { enabled = true, speed = 40, settleMs, onSettle }: TypewriterOptions = {}
) {
  const [typed, setTyped] = useState("");
  const done = typed === text;

  // Kept in a ref so a caller passing an inline arrow doesn't restart the timer.
  const onSettleRef = useRef(onSettle);
  useEffect(() => {
    onSettleRef.current = onSettle;
  });

  useEffect(() => {
    if (!enabled || done) return;
    const timer = window.setTimeout(() => setTyped(text.slice(0, typed.length + 1)), speed);
    return () => window.clearTimeout(timer);
  }, [enabled, done, text, typed, speed]);

  useEffect(() => {
    if (!enabled || !done || settleMs === undefined) return;
    const timer = window.setTimeout(() => onSettleRef.current?.(), settleMs);
    return () => window.clearTimeout(timer);
  }, [enabled, done, settleMs]);

  return typed;
}
