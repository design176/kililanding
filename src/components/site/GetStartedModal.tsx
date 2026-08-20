"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { SignupForm } from "@/components/SignupForm";
import { useGetStartedModal } from "./GetStartedModalContext";
import styles from "./GetStartedModal.module.css";

export function GetStartedModal() {
  const { isOpen, close } = useGetStartedModal();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Get started with Kili"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.headerRow}>
              <h2 className={styles.heading}>Join the waitlist</h2>
              <button type="button" className={styles.close} onClick={close} aria-label="Close">
                <X size={16} weight="bold" />
              </button>
            </div>

            <SignupForm flush />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
