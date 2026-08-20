import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "accent";
type Size = "sm" | "md" | "lg" | "xl";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "active";
  /** Marketing-site override: fully rounded pill shape instead of the app's default radius. */
  pill?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", forceState, pill, className, ...props },
  ref
) {
  const classes = [
    styles.btn,
    styles[size],
    styles[variant],
    variant !== "ghost" ? styles.glossy : "",
    pill ? styles.pill : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button ref={ref} className={classes} data-force={forceState} {...props} />;
});
