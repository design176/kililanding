"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./InteractiveFooterLogo.module.css";

type Point = { x: number; y: number };
type Shape = { id: string; points: Point[]; filled?: boolean };
type OffsetMap = Record<string, Point>;

const square = (id: string, x: number, y: number, filled = false): Shape => ({
  id,
  filled,
  points: [
    { x, y },
    { x: x + 20, y },
    { x: x + 20, y: y + 20 },
    { x, y: y + 20 },
  ],
});

const SHAPES: Shape[] = [
  ...[9, 34, 59].flatMap((y, row) =>
    [4, 29, 54].map((x, column) =>
      square(`tile-${row}-${column}`, x, y, row === 0 && column === 2)
    )
  ),
  {
    id: "k-stem",
    points: [{ x: 94, y: 9 }, { x: 108, y: 9 }, { x: 108, y: 84 }, { x: 94, y: 84 }],
  },
  {
    id: "k-upper",
    points: [{ x: 108, y: 42 }, { x: 140, y: 9 }, { x: 158, y: 9 }, { x: 122, y: 47 }],
  },
  {
    id: "k-lower",
    points: [{ x: 122, y: 45 }, { x: 160, y: 84 }, { x: 141, y: 84 }, { x: 108, y: 50 }],
  },
  square("i-one-dot", 166, 9, true),
  {
    id: "i-one-stem",
    points: [{ x: 169, y: 34 }, { x: 183, y: 34 }, { x: 183, y: 84 }, { x: 169, y: 84 }],
  },
  {
    id: "l",
    points: [
      { x: 198, y: 9 }, { x: 212, y: 9 }, { x: 212, y: 70 },
      { x: 241, y: 70 }, { x: 241, y: 84 }, { x: 198, y: 84 },
    ],
  },
  square("i-two-dot", 256, 9, true),
  {
    id: "i-two-stem",
    points: [{ x: 259, y: 34 }, { x: 273, y: 34 }, { x: 273, y: 84 }, { x: 259, y: 84 }],
  },
];

const clamp = (value: number) => Math.max(-14, Math.min(14, value));
const pointKey = (shapeId: string, pointIndex: number) => `${shapeId}:${pointIndex}`;

export function InteractiveFooterLogo() {
  const [offsets, setOffsets] = useState<OffsetMap>({});
  const [isDragging, setIsDragging] = useState(false);
  const offsetsRef = useRef<OffsetMap>({});
  const dragRef = useRef<{
    key: string;
    base: Point;
    pointerId: number;
    target: SVGCircleElement;
  } | null>(null);
  const didDragRef = useRef(false);
  const returnFrameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (returnFrameRef.current !== null) cancelAnimationFrame(returnFrameRef.current);
  }, []);

  const toSvgPoint = (event: PointerEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(matrix.inverse());
  };

  const beginDrag = (
    event: PointerEvent<SVGCircleElement>,
    shape: Shape,
    pointIndex: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      key: pointKey(shape.id, pointIndex),
      base: shape.points[pointIndex],
      pointerId: event.pointerId,
      target: event.currentTarget,
    };
    const finishFromWindow = () => {
      window.removeEventListener("pointerup", finishFromWindow);
      window.removeEventListener("pointercancel", finishFromWindow);
      endDrag();
    };
    window.addEventListener("pointerup", finishFromWindow, { once: true });
    window.addEventListener("pointercancel", finishFromWindow, { once: true });
    setIsDragging(true);
  };

  const movePoint = (event: PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const pointer = toSvgPoint(event);
    if (!pointer) return;
    const next = {
      x: clamp(pointer.x - drag.base.x),
      y: clamp(pointer.y - drag.base.y),
    };
    if (Math.abs(next.x) + Math.abs(next.y) > 0.8) didDragRef.current = true;
    offsetsRef.current = { ...offsetsRef.current, [drag.key]: next };
    setOffsets(offsetsRef.current);
  };

  const animateBack = (key: string, start: Point) => {
    if (returnFrameRef.current !== null) cancelAnimationFrame(returnFrameRef.current);
    let startedAt: number | null = null;
    const duration = 520;

    const settle = (now: number) => {
      startedAt ??= now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const decay = (1 - progress) ** 2;
      const oscillation = Math.cos(progress * Math.PI * 2.5);
      const next = {
        x: start.x * decay * oscillation,
        y: start.y * decay * oscillation,
      };

      offsetsRef.current = { ...offsetsRef.current, [key]: next };
      setOffsets(offsetsRef.current);
      if (progress < 1) {
        returnFrameRef.current = requestAnimationFrame(settle);
      } else {
        const updated = { ...offsetsRef.current };
        delete updated[key];
        offsetsRef.current = updated;
        setOffsets(updated);
        returnFrameRef.current = null;
      }
    };

    returnFrameRef.current = requestAnimationFrame(settle);
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.target.hasPointerCapture(drag.pointerId)) {
      drag.target.releasePointerCapture(drag.pointerId);
    }
    const start = offsetsRef.current[drag.key] ?? { x: 0, y: 0 };
    dragRef.current = null;
    setIsDragging(false);
    animateBack(drag.key, start);
  };

  const getPoints = (shape: Shape) =>
    shape.points
      .map((point, index) => {
        const offset = offsets[pointKey(shape.id, index)] ?? { x: 0, y: 0 };
        return `${point.x + offset.x},${point.y + offset.y}`;
      })
      .join(" ");

  return (
    <div
      className={styles.root}
      data-dragging={isDragging}
      onClickCapture={(event) => {
        if (!didDragRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        didDragRef.current = false;
      }}
      aria-hidden="true"
    >
      <svg
        className={styles.logo}
        viewBox="0 0 280 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onPointerMove={movePoint}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {SHAPES.map((shape) => (
          <g key={shape.id} data-logo-element={shape.id}>
            <polygon
              className={shape.filled ? styles.filledShape : styles.outlineShape}
              points={getPoints(shape)}
            />
            {shape.points.map((point, pointIndex) => {
              const offset = offsets[pointKey(shape.id, pointIndex)] ?? { x: 0, y: 0 };
              return (
                <circle
                  key={`${shape.id}-${pointIndex}`}
                  className={styles.controlPoint}
                  data-control-point={pointKey(shape.id, pointIndex)}
                  cx={point.x + offset.x}
                  cy={point.y + offset.y}
                  r="2.7"
                  onPointerDown={(event) => beginDrag(event, shape, pointIndex)}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                />
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
