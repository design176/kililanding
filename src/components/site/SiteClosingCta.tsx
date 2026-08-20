import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./SiteClosingCta.module.css";

type CtaLink = { label: string; href: string };

export function SiteClosingCta({
  heading,
  body,
  primary = { label: "Get Started", href: "/get-started" },
  secondary,
}: {
  heading: ReactNode;
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className={styles.closing}>
      <div className={styles.closingInner}>
        <h2 className={styles.closingHeading}>{heading}</h2>
        {body && <p className={styles.closingBody}>{body}</p>}
        <div className={styles.closingButtons}>
          {secondary && (
            <Link href={secondary.href}>
              <Button variant="ghost" size="lg" pill className={styles.closingGhostButton}>
                {secondary.label}
              </Button>
            </Link>
          )}
          <Link href={primary.href}>
            <Button variant="secondary" size="lg" pill>{primary.label}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
