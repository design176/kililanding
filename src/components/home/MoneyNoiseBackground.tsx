"use client";

import { useEffect, useRef } from "react";
import styles from "./MoneyNoiseBackground.module.css";

const CHARS = [" ", ".", "/", "$", "₹"];
const FONT_SIZE = 12;
const CELL_W = 10;
const CELL_H = 15;
const NOISE_FREQ = 0.04;
const DRIFT_X = 0.012;
const DRIFT_Y = 0.02;
const FRAME_MS = 90;
const CURSOR_RADIUS = 90;
const CURSOR_MAX_OPACITY = 0.85;
const TRAIL_LIFETIME_MS = 900;
const TRAIL_MIN_INTERVAL_MS = 30;

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise2D(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const tl = hash(xi, yi);
  const tr = hash(xi + 1, yi);
  const bl = hash(xi, yi + 1);
  const br = hash(xi + 1, yi + 1);

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const top = tl + u * (tr - tl);
  const bottom = bl + u * (br - bl);
  return top + v * (bottom - top);
}

type TrailPoint = { x: number; y: number; addedAt: number };

export function MoneyNoiseBackground({
  interactive = true,
  maxOpacity = 1,
}: {
  interactive?: boolean;
  maxOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let trail: TrailPoint[] = [];
    let lastTrailPush = 0;
    let visible = true;
    // Read once per theme change rather than every tick - the glyph color
    // only ever changes alongside `data-theme`, not on its own.
    let color = "";

    function readColor() {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-primary")
        .trim();
    }

    // The guards inside these two are what keeps TypeScript happy: narrowing
    // from the checks above doesn't reach into a nested function declaration.
    function resize() {
      if (!canvas || !parent || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handlePointerMove(event: PointerEvent) {
      const now = performance.now();
      if (now - lastTrailPush < TRAIL_MIN_INTERVAL_MS) return;
      lastTrailPush = now;
      trail.push({ x: event.offsetX, y: event.offsetY, addedAt: now });
    }

    function draw() {
      if (!ctx) return;

      const now = performance.now();
      trail = trail.filter((point) => now - point.addedAt < TRAIL_LIFETIME_MS);

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "middle";

      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellX = col * CELL_W;
          const cellY = row * CELL_H;

          const n = noise2D(
            col * NOISE_FREQ + time * DRIFT_X,
            row * NOISE_FREQ + time * DRIFT_Y
          );

          let cursorInfluence = 0;
          for (const point of trail) {
            const strength = 1 - (now - point.addedAt) / TRAIL_LIFETIME_MS;
            const dist = Math.hypot(cellX - point.x, cellY - point.y);
            const falloff = Math.max(0, 1 - dist / CURSOR_RADIUS);
            const influence = falloff * strength;
            if (influence > cursorInfluence) cursorInfluence = influence;
          }

          const ambientLevel = Math.floor(n * CHARS.length);
          const ambientChar = CHARS[Math.min(ambientLevel, CHARS.length - 1)];

          const shadeCoarse = noise2D(
            col * NOISE_FREQ * 0.8 + 100 - time * DRIFT_X,
            row * NOISE_FREQ * 0.8 + 100 - time * DRIFT_Y
          );
          const shadeFine = noise2D(
            col * NOISE_FREQ * 3.1 - 50 + time * DRIFT_X * 1.6,
            row * NOISE_FREQ * 3.1 - 50 + time * DRIFT_Y * 1.6
          );
          const shade = shadeCoarse * 0.65 + shadeFine * 0.35;
          const ambientOpacity = ambientChar === " " ? 0 : 0.02 + Math.pow(shade, 1.6) * 0.65;

          const cursorLevel = 1 + Math.floor(n * (CHARS.length - 1));
          const cursorChar = CHARS[Math.min(cursorLevel, CHARS.length - 1)];
          const cursorOpacity = cursorInfluence * CURSOR_MAX_OPACITY;

          const char = cursorOpacity > ambientOpacity ? cursorChar : ambientChar;
          const opacity = Math.max(ambientOpacity, cursorOpacity) * maxOpacity;
          if (opacity <= 0.005) continue;

          ctx.fillStyle = color;
          ctx.globalAlpha = opacity;
          ctx.fillText(char, cellX, cellY + CELL_H / 2);
        }
      }
    }

    readColor();
    resize();
    draw();

    const intervalId = window.setInterval(() => {
      if (!visible) return;
      time += 1;
      draw();
    }, FRAME_MS);

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(parent);

    // Skip ticking (and its per-cell work) while scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(parent);

    const themeObserver = new MutationObserver(() => {
      readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const supportsHover = interactive && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (supportsHover) {
      canvas.addEventListener("pointermove", handlePointerMove);
    }

    return () => {
      window.clearInterval(intervalId);
      observer.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      if (supportsHover) {
        canvas.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [interactive, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
      aria-hidden="true"
    />
  );
}
