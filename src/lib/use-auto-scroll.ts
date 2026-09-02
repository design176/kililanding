"use client";

import { useEffect, type RefObject } from "react";

/**
 * Keeps a scrollable transcript pinned to its newest content. Pass a `key`
 * that changes whenever something is appended.
 */
export function useAutoScrollToBottom(
  ref: RefObject<HTMLElement | null>,
  key: unknown
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || element.scrollHeight <= element.clientHeight) return;
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  }, [ref, key]);
}
