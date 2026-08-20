"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useGetStartedModal } from "./GetStartedModalContext";

/**
 * Drop-in replacement for `<Link href="/get-started"><Button>...</Button></Link>` —
 * opens the get-started modal instead of navigating to a new page.
 */
export function GetStartedButton(props: ButtonProps) {
  const { open } = useGetStartedModal();
  return <Button type="button" {...props} onClick={open} />;
}
