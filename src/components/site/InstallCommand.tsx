"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { cx } from "@/lib/cx";
import styles from "./InstallCommand.module.css";

const COMMAND = "npx -y @kili-ai/ide.install";

export function InstallCommand({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={cx(styles.wrap, className)}>
      <button type="button" className={styles.pill} onClick={handleCopy}>
        <span className={styles.prompt}>$</span>
        <code className={styles.command}>{COMMAND}</code>
        <span className={styles.copyIcon} aria-hidden="true">
          {copied ? <Check size={15} weight="bold" /> : <Copy size={15} weight="bold" />}
        </span>
      </button>
      <span className={styles.caption}>
        {copied ? (
          "Copied!"
        ) : (
          <>
            Just paste and get <span className={styles.captionAccent}>$$$</span>, today
          </>
        )}
      </span>
    </div>
  );
}
