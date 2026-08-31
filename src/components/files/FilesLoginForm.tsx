"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./FilesLoginForm.module.css";

const STORAGE_KEY = "files_password";

export function FilesLoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const triedStored = useRef(false);

  const submit = useCallback(
    async (candidate: string) => {
      setSubmitting(true);
      setError(null);

      try {
        const res = await fetch("/api/files-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: candidate }),
        });

        if (!res.ok) {
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
          const { error } = await res.json();
          setError(error ?? "something went wrong.");
          return;
        }

        try {
          localStorage.setItem(STORAGE_KEY, candidate);
        } catch {}
        router.replace(next);
        router.refresh();
      } finally {
        setSubmitting(false);
      }
    },
    [next, router]
  );

  // Remembers the password on this device so a returning visit skips the form.
  useEffect(() => {
    if (triedStored.current) return;
    triedStored.current = true;

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}

    if (stored) {
      setPassword(stored);
      submit(stored);
    }
  }, [submit]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit(password);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoFocus
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="submit" size="lg" pill disabled={submitting}>
        {submitting ? "checking…" : "enter"}
      </Button>
    </form>
  );
}
