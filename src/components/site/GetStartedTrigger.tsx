"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useGetStartedModal } from "./GetStartedModalContext";

/**
 * Generic clickable trigger for the get-started modal, for spots that
 * aren't a `Button` (e.g. the hero's "NEW" pill).
 */
export function GetStartedTrigger({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { open } = useGetStartedModal();
  return (
    <button type="button" {...props} onClick={open}>
      {children}
    </button>
  );
}
