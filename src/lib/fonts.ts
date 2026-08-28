/**
 * Selectable fonts for the settings modal. Every family except Satoshi
 * (Fontshare-exclusive, loaded via the @import in globals.css) is loaded
 * through next/font/google in layout.tsx — each configured there with a
 * `variable` that's referenced here.
 */
export type FontOption = {
  id: string;
  label: string;
  value: string;
};

/** First entry is the site's current default and stays selected until changed. */
export const HEADING_FONTS: FontOption[] = [
  { id: "satoshi", label: "Satoshi", value: '"Satoshi", sans-serif' },
  { id: "fraunces", label: "Fraunces", value: "var(--font-fraunces), serif" },
  { id: "instrument-serif", label: "Instrument Serif", value: "var(--font-instrument-serif), serif" },
  { id: "newsreader", label: "Newsreader", value: "var(--font-newsreader), serif" },
  { id: "playfair-display", label: "Playfair Display", value: "var(--font-playfair-display), serif" },
  { id: "source-serif-4", label: "Source Serif 4", value: "var(--font-source-serif-4), serif" },
];

/** First entry is the site's current default and stays selected until changed. */
export const BODY_FONTS: FontOption[] = [
  { id: "work-sans", label: "Work Sans", value: "var(--font-work-sans), sans-serif" },
  { id: "inter", label: "Inter", value: "var(--font-inter), sans-serif" },
  { id: "manrope", label: "Manrope", value: "var(--font-manrope), sans-serif" },
  { id: "plus-jakarta-sans", label: "Plus Jakarta Sans", value: "var(--font-plus-jakarta-sans), sans-serif" },
  { id: "dm-sans", label: "DM Sans", value: "var(--font-dm-sans), sans-serif" },
  { id: "sora", label: "Sora", value: "var(--font-sora), sans-serif" },
];
