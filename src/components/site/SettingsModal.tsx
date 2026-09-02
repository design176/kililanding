"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "./ThemeProvider";
import { HEADING_FONTS, BODY_FONTS } from "@/lib/fonts";
import { FONT_WEIGHTS } from "@/lib/fontWeights";
import { useSiteSettings } from "./SiteSettingsContext";
import { useMounted } from "@/lib/use-mounted";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { cx } from "@/lib/cx";
import styles from "./SettingsModal.module.css";

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const {
    headingFontId,
    bodyFontId,
    headingWeightId,
    bodyWeightId,
    setHeadingFontId,
    setBodyFontId,
    setHeadingWeightId,
    setBodyWeightId,
  } = useSiteSettings();
  const mounted = useMounted();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
        return;
      }
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useBodyScrollLock(isOpen);

  const isDark = mounted && theme === "dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site settings"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.headerRow}>
              <h2 className={styles.heading}>Settings</h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Appearance</h3>
              <div className={styles.pillGroup}>
                <button
                  type="button"
                  className={cx(styles.pillOption, !isDark && styles.pillOptionActive)}
                  onClick={() => setTheme("light")}
                >
                  <Sun size={14} weight="bold" />
                  Light
                </button>
                <button
                  type="button"
                  className={cx(styles.pillOption, isDark && styles.pillOptionActive)}
                  onClick={() => setTheme("dark")}
                >
                  <Moon size={14} weight="bold" />
                  Dark
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Heading font</h3>
              <div className={styles.selectRow}>
                <select
                  className={styles.select}
                  value={headingFontId}
                  onChange={(event) => setHeadingFontId(event.target.value)}
                >
                  {HEADING_FONTS.map((font) => (
                    <option key={font.id} value={font.id}>
                      {font.label}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  value={headingWeightId}
                  onChange={(event) => setHeadingWeightId(event.target.value)}
                  aria-label="Heading font weight"
                >
                  {FONT_WEIGHTS.map((weight) => (
                    <option key={weight.id} value={weight.id}>
                      {weight.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Body font</h3>
              <div className={styles.selectRow}>
                <select
                  className={styles.select}
                  value={bodyFontId}
                  onChange={(event) => setBodyFontId(event.target.value)}
                >
                  {BODY_FONTS.map((font) => (
                    <option key={font.id} value={font.id}>
                      {font.label}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  value={bodyWeightId}
                  onChange={(event) => setBodyWeightId(event.target.value)}
                  aria-label="Body font weight"
                >
                  {FONT_WEIGHTS.map((weight) => (
                    <option key={weight.id} value={weight.id}>
                      {weight.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
