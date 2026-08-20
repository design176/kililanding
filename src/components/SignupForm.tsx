"use client";

import { useState } from "react";
import { PlatformPicker, PlatformId } from "@/components/PlatformPicker";
import { AnimatePresence, motion } from "motion/react";
import styles from "./SignupForm.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "loading" | "success" | "error";

function validateUrl(val: string): string | null {
  if (!val) return null; // optional field
  try {
    const withScheme = val.includes("://") ? val : `https://${val}`;
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) throw new Error();
    return null;
  } catch {
    return "enter a valid url like yourproduct.com";
  }
}

function validateContact(val: string): string | null {
  if (!val) return "leave an email or a @handle so we can reach you.";
  if (val.startsWith("@")) {
    return val.length < 4 ? "please check if the username is correct." : null;
  }
  return EMAIL_RE.test(val) ? null : "that doesn't look like a valid email.";
}

export function SignupForm() {
  const [site, setSite] = useState("");
  const [contact, setContact] = useState("");
  const [platform, setPlatform] = useState<PlatformId>("x");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [note, setNote] = useState("");
  const [siteError, setSiteError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const isHandle = contact.startsWith("@");

  const handleSubmit = async () => {
    const urlErr = validateUrl(site);
    const contactErr = validateContact(contact);

    if (urlErr || contactErr) {
      setSiteError(!!urlErr);
      setContactError(!!contactErr);
      setStatus("error");
      setNote(urlErr ?? contactErr ?? "");
      return;
    }

    setSiteError(false);
    setContactError(false);
    setStatus("loading");
    setNote("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: site.trim(),
          contact: contact.trim(),
          platform: isHandle ? platform : "email",
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

  return (
    <div className={styles.capture}>
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
          spellCheck={false}
          value={site}
          disabled={status === "loading" || status === "success"}
          onChange={(e) => {
            setSite(e.target.value);
            if (siteError) setSiteError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className={[styles.input, siteError ? styles.inputError : ""].join(" ")}
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
            spellCheck={false}
            value={contact}
            disabled={status === "loading" || status === "success"}
            onChange={(e) => {
              setContact(e.target.value);
              if (contactError) setContactError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={[styles.input, contactError ? styles.inputError : ""].join(" ")}
          />

          <AnimatePresence>
            {isHandle && status !== "success" && (
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
            disabled={status === "loading" || status === "success"}
            className={[styles.button, status === "success" ? styles.buttonSuccess : ""].join(" ")}
          >
            {status === "loading" ? "Sending…" : status === "success" ? "Sent" : "Send"}
          </button>
        </div>
      </div>
      {note && (
        <p
          className={[
            styles.note,
            status === "success" ? styles.noteSuccess : "",
            status === "error" ? styles.noteError : "",
          ].join(" ")}
        >
          {note}
        </p>
      )}
    </div>
  );
}
