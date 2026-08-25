"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlatformPicker, type PlatformId } from "@/components/PlatformPicker";
import { cx } from "@/lib/cx";
import { isHandle, validateContact, validateProductUrl } from "@/lib/signup";
import styles from "./SignupForm.module.css";

type FormStatus = "idle" | "loading" | "success" | "error";
type FieldErrors = { site?: boolean; contact?: boolean };

export function SignupForm({ flush }: { flush?: boolean }) {
  const [site, setSite] = useState("");
  const [contact, setContact] = useState("");
  const [platform, setPlatform] = useState<PlatformId>("x");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const locked = status === "loading" || status === "success";

  const handleSubmit = async () => {
    const siteError = validateProductUrl(site);
    const contactError = validateContact(contact);

    if (siteError || contactError) {
      setErrors({ site: !!siteError, contact: !!contactError });
      setStatus("error");
      setNote(siteError ?? contactError ?? "");
      return;
    }

    setErrors({});
    setStatus("loading");
    setNote("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: site.trim(),
          contact: contact.trim(),
          platform,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setNote(data.error ?? "something went wrong — try again.");
        return;
      }

      setStatus("success");
      setNote("noted. we'll find you.");
      setSite("");
      setContact("");
    } catch {
      setStatus("error");
      setNote("could not connect — try again.");
    }
  };

  /** Props every field shares: same styling, same disabled rule, Enter submits. */
  const fieldProps = (field: keyof FieldErrors, setValue: (value: string) => void) => ({
    spellCheck: false,
    disabled: locked,
    className: cx(styles.input, errors[field] && styles.inputError),
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Enter") handleSubmit();
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (errors[field]) setErrors((current) => ({ ...current, [field]: false }));
    },
  });

  return (
    <div className={flush ? styles.captureFlush : styles.capture}>
      <p className={styles.lede}>
        Building an AI product?<br />
        <span className={styles.ledeSpan}>Tell us where to find you.</span>
      </p>

      <div className={styles.fields}>
        <label htmlFor="site" className={styles.srOnly}>product url</label>
        <input
          id="site"
          type="url"
          placeholder="yourproduct.com"
          autoComplete="url"
          value={site}
          {...fieldProps("site", setSite)}
        />

        <div className={styles.field}>
          <label htmlFor="contact" className={styles.srOnly}>email or @handle</label>
          <input
            id="contact"
            type="text"
            inputMode="email"
            placeholder="email or @handle"
            autoComplete="email"
            autoCapitalize="off"
            value={contact}
            {...fieldProps("contact", setContact)}
          />

          {/* The platform picker only means anything for an @handle. */}
          <AnimatePresence>
            {isHandle(contact) && status !== "success" && (
              <motion.div
                key="platform"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ flexShrink: 0 }}
              >
                <PlatformPicker value={platform} onChange={setPlatform} disabled={status === "loading"} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={locked}
            className={cx(styles.button, status === "success" && styles.buttonSuccess)}
          >
            {status === "loading" ? "Sending…" : status === "success" ? "Sent" : "Send"}
          </button>
        </div>
      </div>

      {note && (
        <p
          className={cx(
            styles.note,
            status === "success" && styles.noteSuccess,
            status === "error" && styles.noteError
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}
