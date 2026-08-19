"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useSpring } from "motion/react";
import { Logo } from "@/components/Logo";
import { PlatformPicker, PlatformId } from "@/components/PlatformPicker";
import styles from "./ComingSoonPage8527xyz.module.css";

// Simple but solid email check
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Chart constants ──────────────────────────────────────────
const W = 640;
const BASE = 200;   // zero-axis y in SVG coords
const SCALE = 172;
const N = 90;
const PEAK_USERS = 50_000;
const PEAK_REVENUE = 27_000;

const withoutKili = () => 0;                            // flatline — your user's cost stays at $0
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

export function ComingSoonPage8527xyz() {
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
          <span className={styles.countPill}>0 / 10</span>
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
                  <em className={styles.tipLabel}>Your cost</em>
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
                  <em className={styles.tipLabel}>Your user&apos;s cost</em>
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
                aria-label="your cost climbs to $27,000 as conversations grow, while your user's cost stays flat at $0"
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

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <a href="https://x.com/scribble_dao" target="_blank" rel="noopener noreferrer" aria-label="X.com" className={styles.social}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
        </a>
        <a href="https://www.instagram.com/0xscribble" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>
        </a>
        <a href="https://www.linkedin.com/company/0xscribble" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.social}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
        </a>
        <a href="https://www.youtube.com/@0xScribble" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.social}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path></svg>
        </a>
        <a href="https://medium.com/@scribbledao" target="_blank" rel="noopener noreferrer" aria-label="Medium" className={styles.social}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M72,64a64,64,0,1,0,64,64A64.07,64.07,0,0,0,72,64Zm0,112a48,48,0,1,1,48-48A48.05,48.05,0,0,1,72,176ZM184,64c-5.68,0-16.4,2.76-24.32,21.25C154.73,96.8,152,112,152,128s2.73,31.2,7.68,42.75C167.6,189.24,178.32,192,184,192s16.4-2.76,24.32-21.25C213.27,159.2,216,144,216,128s-2.73-31.2-7.68-42.75C200.4,66.76,189.68,64,184,64Zm0,112c-5.64,0-16-18.22-16-48s10.36-48,16-48,16,18.22,16,48S189.64,176,184,176ZM248,72V184a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0Z"></path></svg>
        </a>
      </footer>
    </div>
  );
}
