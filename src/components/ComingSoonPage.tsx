"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useSpring } from "motion/react";
import { Logo } from "@/components/Logo";
import { PlatformPicker, PlatformId } from "@/components/PlatformPicker";
import styles from "./ComingSoonPage.module.css";

// Simple but solid email check
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Chart constants ──────────────────────────────────────────
const W = 640;
const BASE = 200;   // zero-axis y in SVG coords
const SCALE = 172;
const N = 90;
const PEAK_USERS = 50_000;
const PEAK_REVENUE = 42_000;

const withoutKili = (x: number) => -0.36 * x;          // goes negative — every user costs you
const withKili    = (x: number) => Math.pow(x, 1.55);  // climbs and keeps climbing
const toY = (v: number) => BASE - v * SCALE;

function money(v: number): string {
  const n = Math.round(Math.abs(v));
  return (v < 0 ? "-$" : "$") + n.toLocaleString();
}

function buildPoints(fn: (x: number) => number, steps: number): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = i / N;
    return [x * W, toY(fn(x))] as [number, number];
  });
}

function toPath(pts: [number, number][]): string {
  return pts
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

// ─────────────────────────────────────────────────────────────

export function ComingSoonPage() {
  // ── SVG element refs ───────────────────────────────────────
  const svgRef      = useRef<SVGSVGElement>(null);
  const costPathRef = useRef<SVGPathElement>(null);
  const kiliPathRef = useRef<SVGPathElement>(null);
  const gapFillRef  = useRef<SVGPathElement>(null);
  const lossFillRef = useRef<SVGPathElement>(null);
  const costDotRef  = useRef<SVGCircleElement>(null);
  const kiliDotRef  = useRef<SVGCircleElement>(null);

  // ── Tooltip DOM refs (direct writes, no React re-renders) ──
  const uCountRef  = useRef<HTMLSpanElement>(null);
  const kiliBoxRef = useRef<HTMLSpanElement>(null);
  const kiliRevRef = useRef<HTMLSpanElement>(null);
  const altBoxRef  = useRef<HTMLSpanElement>(null);
  const altRevRef  = useRef<HTMLSpanElement>(null);

  const lastProg   = useRef(0);
  const progressMV = useMotionValue(0);

  // ── Spring tooltip positions (weighted, physical feel) ─────
  const kiliX = useSpring(0, { stiffness: 220, damping: 28 });
  const kiliY = useSpring(0, { stiffness: 220, damping: 28 });
  const altX  = useSpring(0, { stiffness: 220, damping: 28 });
  const altY  = useSpring(0, { stiffness: 220, damping: 28 });

  // ── Place BOTH dots + tooltips at a given progress 0→1 ─────
  // Single function, called both during animation and on hover
  const place = useCallback(
    (fx: number) => {
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const px   = fx * rect.width;

      // Green (kili) dot + tooltip — sits ABOVE the line
      const ky = toY(withKili(fx));
      kiliDotRef.current?.setAttribute("cx", (fx * W).toFixed(1));
      kiliDotRef.current?.setAttribute("cy", ky.toFixed(1));
      kiliX.set(px);
      kiliY.set((ky / 310) * rect.height);
      if (kiliBoxRef.current) {
        const w = kiliBoxRef.current.offsetWidth;
        kiliBoxRef.current.style.left = `${(Math.max(0, px - w) - px).toFixed(1)}px`;
      }
      if (kiliRevRef.current) {
        kiliRevRef.current.textContent = money(PEAK_REVENUE * withKili(fx));
      }

      // Grey (cost) dot + tooltip — sits BELOW the line (which goes negative)
      const cy = toY(withoutKili(fx));
      costDotRef.current?.setAttribute("cx", (fx * W).toFixed(1));
      costDotRef.current?.setAttribute("cy", cy.toFixed(1));
      altX.set(px);
      altY.set((cy / 310) * rect.height);
      if (altBoxRef.current) {
        const w = altBoxRef.current.offsetWidth;
        altBoxRef.current.style.left = `${(Math.max(0, px - w) - px).toFixed(1)}px`;
      }
      if (altRevRef.current) {
        altRevRef.current.textContent = money(PEAK_REVENUE * withoutKili(fx));
      }
    },
    [kiliX, kiliY, altX, altY]
  );

  // ── Rebuild SVG paths from progress 0→1 ───────────────────
  const buildChart = useCallback(
    (prog: number) => {
      lastProg.current = prog;
      const steps   = Math.max(1, Math.round(N * prog));
      const costPts = buildPoints(withoutKili, steps);
      const kiliPts = buildPoints(withKili, steps);

      costPathRef.current?.setAttribute("d", toPath(costPts));
      kiliPathRef.current?.setAttribute("d", toPath(kiliPts));

      // Kili fills down to the zero axis
      gapFillRef.current?.setAttribute(
        "d",
        kiliPts.length > 1
          ? `${toPath(kiliPts)} L${kiliPts[kiliPts.length - 1][0].toFixed(1)} ${BASE} L${kiliPts[0][0].toFixed(1)} ${BASE} Z`
          : ""
      );

      // Cost fills DOWN from the zero axis (the loss area below zero)
      lossFillRef.current?.setAttribute(
        "d",
        costPts.length > 1
          ? `${toPath(costPts)} L${costPts[costPts.length - 1][0].toFixed(1)} ${BASE} L${costPts[0][0].toFixed(1)} ${BASE} Z`
          : ""
      );

      if (uCountRef.current) {
        uCountRef.current.textContent = Math.round(PEAK_USERS * prog).toLocaleString("en-US");
      }

      place(prog);
    },
    [place]
  );

  // ── Mount: subscribe + animate ─────────────────────────────
  useEffect(() => {
    const unsub   = progressMV.on("change", buildChart);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      progressMV.set(1);
    } else {
      animate(progressMV, 1, { duration: 6.2, ease: "linear" });
    }

    buildChart(0);

    const onResize = () => buildChart(lastProg.current);
    window.addEventListener("resize", onResize);

    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, [buildChart, progressMV]);

  // ── Hover: both tooltips track the pointer together ────────
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const fx   = Math.min(
        Math.max((e.clientX - rect.left) / rect.width, 0),
        Math.min(1, lastProg.current)
      );
      place(fx);
      if (uCountRef.current) {
        uCountRef.current.textContent = Math.round(PEAK_USERS * fx).toLocaleString("en-US");
      }
    },
    [place]
  );

  const onPointerLeave = useCallback(() => {
    place(lastProg.current);
    if (uCountRef.current) {
      uCountRef.current.textContent = Math.round(PEAK_USERS * lastProg.current).toLocaleString("en-US");
    }
  }, [place]);

  // ── Form ────────────────────────────────────────────────────
  type FormStatus = "idle" | "loading" | "success" | "error";

  const [site,         setSite]         = useState("");
  const [contact,      setContact]      = useState("");
  const [platform,     setPlatform]     = useState<PlatformId>("x");
  const [status,       setStatus]       = useState<FormStatus>("idle");
  const [note,         setNote]         = useState("");
  const [siteError,    setSiteError]    = useState(false);
  const [contactError, setContactError] = useState(false);

  // Detect whether the user is typing a @handle or an email
  const isHandle = contact.startsWith("@");

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
          product:  site.trim(),
          contact:  contact.trim(),
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

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className={styles.sheet}>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className={styles.bar}>
        <Logo width={82} />
        <div className={styles.counter}>
          <span className={styles.countNote}>we launch at 10/10</span>
        </div>
      </div>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.hero}>

          {/* ── Chart ───────────────────────────────────────── */}
          <div className={styles.chart}>
            <div className={styles.chartHead}>
              <div className={styles.users}>
                <span className={styles.uLabel}>conversations</span>
                <span ref={uCountRef} className={styles.uCount}>0</span>
                <div className={styles.legend}>
                  <span className={styles.key}>
                    <i className={`${styles.swatch} ${styles.swatchKili}`} />
                    with kili
                  </span>
                  <span className={styles.key}>
                    <i className={`${styles.swatch} ${styles.swatchCost}`} />
                    without kili
                  </span>
                </div>
              </div>
            </div>

            <div
              className={styles.plotWrap}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onPointerCancel={onPointerLeave}
            >
              {/* Green (kili) tooltip — box floats ABOVE the dot */}
              <motion.div
                className={styles.tip}
                style={{ x: kiliX, y: kiliY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                aria-hidden="true"
              >
                <span ref={kiliBoxRef} className={styles.tipBox}>
                  <em className={styles.tipLabel}>revenue</em>
                  <span ref={kiliRevRef}>$0</span>
                </span>
                <span className={styles.tipStem} />
              </motion.div>

              {/* Grey (cost) tooltip — box hangs BELOW the dot */}
              <motion.div
                className={styles.tip}
                style={{ x: altX, y: altY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                aria-hidden="true"
              >
                <span ref={altBoxRef} className={`${styles.tipBox} ${styles.tipBoxAlt}`}>
                  <em className={styles.tipLabel}>without kili</em>
                  <span ref={altRevRef}>$0</span>
                </span>
                <span className={`${styles.tipStem} ${styles.tipStemAlt}`} />
              </motion.div>

              <svg
                ref={svgRef}
                viewBox="0 0 640 310"
                preserveAspectRatio="none"
                className={styles.svgPlot}
                role="img"
                aria-label="without kili, revenue slides below zero as conversations grow; with kili it climbs"
              >
                <path ref={lossFillRef} className={styles.lossFill} d="" />
                <path ref={gapFillRef}  className={styles.gapFill}  d="" />
                <line className={styles.axis} x1="0" y1="200" x2="640" y2="200" />
                <path ref={costPathRef} className={`${styles.line} ${styles.lineCost}`} d="" />
                <path ref={kiliPathRef} className={`${styles.line} ${styles.lineKili}`} d="" />
                <circle ref={costDotRef} className={styles.dotCost} r="3.5" cx="0" cy="200" />
                <circle ref={kiliDotRef} className={styles.dotKili} r="4"   cx="0" cy="200" />
              </svg>
            </div>
          </div>

          {/* ── Statement ───────────────────────────────────── */}
          <h1 className={styles.statement}>Who pays for AI?</h1>

          {/* ── Capture form ────────────────────────────────── */}
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
                onChange={e => {
                  setSite(e.target.value);
                  if (siteError) setSiteError(false);
                }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className={[
                  styles.input,
                  siteError ? styles.inputError : "",
                ].join(" ")}
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
                  onChange={e => {
                    setContact(e.target.value);
                    if (contactError) setContactError(false);
                  }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className={[
                    styles.input,
                    contactError ? styles.inputError : "",
                  ].join(" ")}
                />

                {/* Platform picker — slides in when user types a @handle */}
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
                      <PlatformPicker
                        value={platform}
                        onChange={setPlatform}
                        disabled={status === "loading"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "loading" || status === "success"}
                  className={[
                    styles.button,
                    status === "success" ? styles.buttonSuccess : "",
                  ].join(" ")}
                >
                  {status === "loading" ? "Sending…" : status === "success" ? "Sent" : "Send"}
                </button>
              </div>
            </div>
            {note && (
              <p className={[
                styles.note,
                status === "success" ? styles.noteSuccess : "",
                status === "error"   ? styles.noteError   : "",
              ].join(" ")}>
                {note}
              </p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
