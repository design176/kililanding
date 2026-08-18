"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  XLogo,
  InstagramLogo,
  TiktokLogo,
  LinkedinLogo,
  GithubLogo,
  YoutubeLogo,
  CaretDown,
} from "@phosphor-icons/react";
import styles from "./PlatformPicker.module.css";

export const PLATFORMS = [
  { id: "x",         label: "X (Twitter)", Icon: XLogo },
  { id: "instagram", label: "Instagram",   Icon: InstagramLogo },
  { id: "tiktok",    label: "TikTok",      Icon: TiktokLogo },
  { id: "linkedin",  label: "LinkedIn",    Icon: LinkedinLogo },
  { id: "github",    label: "GitHub",      Icon: GithubLogo },
  { id: "youtube",   label: "YouTube",     Icon: YoutubeLogo },
] as const;

export type PlatformId = typeof PLATFORMS[number]["id"];

interface Props {
  value: PlatformId;
  onChange: (id: PlatformId) => void;
  disabled?: boolean;
}

export function PlatformPicker({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const active = PLATFORMS.find(p => p.id === value) ?? PLATFORMS[0];
  const ActiveIcon = active.Icon;

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Platform: ${active.label}`}
        onClick={() => setOpen(o => !o)}
        className={styles.trigger}
      >
        <ActiveIcon size={15} weight="bold" />
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          style={{ display: "flex" }}
        >
          <CaretDown size={9} weight="bold" className={styles.caret} />
        </motion.span>
      </button>

      {/* Dropdown panel — opens upward */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Choose platform"
            className={styles.panel}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 6,  scale: 0.97 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            {PLATFORMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="option"
                aria-selected={value === id}
                aria-label={label}
                title={label}
                onClick={() => { onChange(id); setOpen(false); }}
                className={[
                  styles.option,
                  value === id ? styles.optionActive : "",
                ].join(" ")}
              >
                <Icon size={16} weight={value === id ? "fill" : "regular"} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
