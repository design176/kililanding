'use client';

import { useEffect, useRef } from 'react';

/** 5x7 dot-matrix glyphs - the classic LED-sign resolution, enough detail
 * to read cleanly at a much finer dot pitch than a 3x5 font allows. */
const FONT: Record<string, string[]> = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  ',': ['00000', '00000', '00000', '00000', '00000', '00110', '00100'],
  '$': ['00100', '01111', '10100', '01110', '00101', '11110', '00100'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

const COLS = 5;
const ROWS = 7;
const CHAR_GAP = 1;

type Cell = {
  gridX: number;
  gridY: number;
  offsetX: number;
  offsetY: number;
};

/**
 * Renders `textRef.current` as a live dot-matrix on a canvas - each dot is
 * its own point (no font/mask involved, so nothing gets clipped) that
 * scrambles away from the pointer on hover and eases back into place.
 */
export function DotMatrixCounter({
  textRef,
  maxChars,
  className,
  ariaLabel,
  onCanvasReady,
}: {
  textRef: { current: string };
  maxChars: number;
  className?: string;
  ariaLabel: string;
  /** Hands the parent the raw canvas node - used to fade it in on reveal. */
  onCanvasReady?: (element: HTMLCanvasElement | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DOT_FILL_RATIO = 0.65;
    const REPEL_RADIUS_RATIO = 3.4;
    const REPEL_STRENGTH_RATIO = 1.8;
    const EASE = 0.18;

    let width = 0;
    let height = 0;
    let dot = 12;
    let pointer: { x: number; y: number } | null = null;
    let cells: Cell[] = [];
    let lastText = '';
    let animationFrame = 0;

    function resize() {
      if (!canvas) return;
      dot = parseFloat(getComputedStyle(canvas).fontSize) || 12;
      width = maxChars * (COLS + CHAR_GAP) * dot - CHAR_GAP * dot;
      height = ROWS * dot;

      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastText = '';
    }

    function buildCells(text: string) {
      const charWidth = COLS + CHAR_GAP;
      const totalCols = text.length * charWidth - CHAR_GAP;
      const gridWidth = totalCols * dot;
      const originX = (width - gridWidth) / 2;

      const next: Cell[] = [];
      text.split('').forEach((char, charIndex) => {
        const glyph = FONT[char] ?? FONT[' '];
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            if (glyph[row][col] !== '1') continue;
            const gridX = originX + (charIndex * charWidth + col) * dot;
            const gridY = row * dot;
            const existing = cells.find(
              (c) => Math.abs(c.gridX - gridX) < 0.5 && Math.abs(c.gridY - gridY) < 0.5,
            );
            next.push({
              gridX,
              gridY,
              offsetX: existing ? existing.offsetX : 0,
              offsetY: existing ? existing.offsetY : 0,
            });
          }
        }
      });
      cells = next;
    }

    function draw() {
      if (!ctx || !canvas) return;

      const text = textRef.current;
      if (text !== lastText) {
        lastText = text;
        buildCells(text);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getComputedStyle(canvas).color;

      const repelRadius = dot * REPEL_RADIUS_RATIO;
      const repelStrength = dot * REPEL_STRENGTH_RATIO;
      const size = dot * DOT_FILL_RATIO;

      for (const cell of cells) {
        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (pointer) {
          const dx = cell.gridX - pointer.x;
          const dy = cell.gridY - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < repelRadius && dist > 0.01) {
            const falloff = 1 - dist / repelRadius;
            targetOffsetX = (dx / dist) * repelStrength * falloff;
            targetOffsetY = (dy / dist) * repelStrength * falloff;
          }
        }

        cell.offsetX += (targetOffsetX - cell.offsetX) * EASE;
        cell.offsetY += (targetOffsetY - cell.offsetY) * EASE;

        ctx.fillRect(cell.gridX + cell.offsetX, cell.gridY + cell.offsetY, size, size);
      }

      animationFrame = window.requestAnimationFrame(draw);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer = { x: event.offsetX, y: event.offsetY };
    }

    function handlePointerLeave() {
      pointer = null;
    }

    resize();
    animationFrame = window.requestAnimationFrame(draw);

    // The canvas's own box is derived from its font-size (a responsive
    // clamp()), so we resize on viewport changes rather than observing the
    // canvas itself - that would just be re-triggered by our own resize().
    window.addEventListener('resize', resize);

    // No real pointer to repel dots away from on touch devices - skip
    // wiring hover entirely there rather than reacting to phantom taps.
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (supportsHover) {
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      if (supportsHover) {
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [textRef, maxChars]);

  return (
    <canvas
      ref={(element) => {
        canvasRef.current = element;
        onCanvasReady?.(element);
      }}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
