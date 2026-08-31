import type { ComponentPropsWithoutRef } from "react";

const GET_STARTED_URL = "https://app.trykili.ai";

/**
 * Generic clickable trigger that links out to the app, for spots that
 * aren't a `Button` (e.g. the hero's "NEW" pill).
 */
export function GetStartedTrigger({
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a href={GET_STARTED_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
