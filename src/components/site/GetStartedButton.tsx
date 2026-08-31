import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/Button";

const GET_STARTED_URL = "https://app.trykili.ai";

/**
 * Drop-in replacement for `<Link href="/get-started"><Button>...</Button></Link>` -
 * links out to the app instead of navigating to a page on this site.
 */
export function GetStartedButton(props: ButtonProps) {
  return (
    <Link href={GET_STARTED_URL} target="_blank" rel="noopener noreferrer">
      <Button type="button" {...props} />
    </Link>
  );
}
