import type { CSSProperties } from "react";

interface PlaceholderProps {
  label: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stand-in for a graphic not built yet. White box, 10px centered label
 * describing what belongs here — swap for the real asset later.
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
        background: "#ffffff",
        border: "1px dashed #d4d4d4",
        color: "#737373",
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
