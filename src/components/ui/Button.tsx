import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
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
  /** Square, icon-only shape - width tracks the size's own height. */
  iconOnly?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", forceState, pill, iconOnly, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      data-force={forceState}
      className={cx(
        styles.btn,
        styles[size],
        styles[variant],
        // Ghost is the one variant with no fill to put a gloss on.
        variant !== "ghost" && styles.glossy,
        pill && styles.pill,
        iconOnly && styles.iconOnly,
        className
      )}
      {...props}
    />
  );
});
