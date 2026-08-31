import type { CSSProperties } from "react";

interface PlaceholderProps {
  label: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stand-in for a graphic not built yet. Blank box, 10px centered label
 * describing what belongs here — swap for the real asset later. Uses
 * the site's theme tokens so it doesn't break in dark mode.
 */
export function Placeholder({ label, width, height, className, style }: PlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "var(--color-surface-2)",
        border: "1px dashed var(--color-border-strong)",
        color: "var(--color-text-muted)",
        fontSize: "10px",
        lineHeight: 1.4,
        padding: "8px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {label}
    </div>
  );
}
