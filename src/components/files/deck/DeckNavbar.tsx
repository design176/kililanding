"use client";

import Link from "next/link";
import { ArrowsIn, ArrowsOut, CaretLeft, CaretRight, DownloadSimple } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import styles from "./DeckNavbar.module.css";

export function DeckNavbar({
  index,
  total,
  onPrev,
  onNext,
  onDownload,
  isFullscreen,
  onToggleFullscreen,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDownload: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  return (
    <header className={styles.navbar}>
      <Link href="/" aria-label="Kili home" className={styles.logoLink}>
        <Logo width={52} />
      </Link>

      <div className={styles.pageNav}>
        <button type="button" className={styles.arrow} onClick={onPrev} aria-label="Previous slide">
          <CaretLeft size={13} weight="bold" />
        </button>
        <span className={styles.pageCount}>
          {index + 1} / {total}
        </span>
        <button type="button" className={styles.arrow} onClick={onNext} aria-label="Next slide">
          <CaretRight size={13} weight="bold" />
        </button>
      </div>

      <div className={styles.actions}>
        <ThemeToggle />
        <button
          type="button"
          className={styles.arrow}
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullscreen ? <ArrowsIn size={13} weight="bold" /> : <ArrowsOut size={13} weight="bold" />}
        </button>
        <Button variant="secondary" size="sm" pill onClick={onDownload}>
          <DownloadSimple size={13} weight="bold" />
          Download PDF
        </Button>
      </div>
    </header>
  );
}
