"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { DeckNavbar } from "./DeckNavbar";
import {
  TitleSlide,
  ResearchSlide,
  AgenticSlide,
  GeoVsAdsSlide,
  ProductSlide,
  GeoProofSlide,
  AdNetworkSlide,
  FintechFocusSlide,
  PositioningSlide,
  TeamSlide,
  RoundSlide,
  CapTableSlide,
} from "./Slides";
import styles from "./ScribbleDeck.module.css";

const SLIDES = [
  TitleSlide,
  ResearchSlide,
  AgenticSlide,
  GeoVsAdsSlide,
  ProductSlide,
  GeoProofSlide,
  AdNetworkSlide,
  FintechFocusSlide,
  PositioningSlide,
  TeamSlide,
  RoundSlide,
  CapTableSlide,
];
/** Breathing room between the viewport edge and the rounded stage card. */
const STAGE_PADDING = 32;

export function ScribbleDeck() {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      pageRef.current?.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === pageRef.current);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const goToDelta = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

    function scale() {
      const { width, height } = viewport!.getBoundingClientRect();
      const availWidth = Math.max(0, width - STAGE_PADDING * 2);
      const availHeight = Math.max(0, height - STAGE_PADDING * 2);
      const factor = Math.min(availWidth / 1920, availHeight / 1080);
      const x = (width - 1920 * factor) / 2;
      const y = (height - 1080 * factor) / 2;
      stage!.style.transform = `translate(${x}px, ${y}px) scale(${factor})`;
    }

    scale();
    const observer = new ResizeObserver(scale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goToDelta(1);
      if (event.key === "ArrowLeft") goToDelta(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToDelta]);

  return (
    <div className={styles.page} ref={pageRef}>
      <DeckNavbar
        index={index}
        total={SLIDES.length}
        onPrev={() => goToDelta(-1)}
        onNext={() => goToDelta(1)}
        onDownload={() => window.print()}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.stage} ref={stageRef}>
          {SLIDES.map((Slide, i) => (
            <section key={i} className={cx(styles.slide, i === index && styles.active)}>
              <Slide />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
