/**
 * Selectable fonts for the settings modal. All non-default families are
 * loaded live from Google Fonts via the @import in globals.css (same CDN
 * pattern as Satoshi from Fontshare) — nothing here is self-hosted.
 */
export type FontOption = {
  id: string;
  label: string;
  value: string;
};

/** First entry is the site's current default and stays selected until changed. */
export const HEADING_FONTS: FontOption[] = [
  { id: "satoshi", label: "Satoshi", value: '"Satoshi", sans-serif' },
  { id: "fraunces", label: "Fraunces", value: '"Fraunces", serif' },
  { id: "instrument-serif", label: "Instrument Serif", value: '"Instrument Serif", serif' },
  { id: "newsreader", label: "Newsreader", value: '"Newsreader", serif' },
  { id: "playfair-display", label: "Playfair Display", value: '"Playfair Display", serif' },
  { id: "source-serif-4", label: "Source Serif 4", value: '"Source Serif 4", serif' },
];

/** First entry is the site's current default and stays selected until changed. */
export const BODY_FONTS: FontOption[] = [
  { id: "work-sans", label: "Work Sans", value: 'var(--font-work-sans), "Work Sans", sans-serif' },
  { id: "inter", label: "Inter", value: '"Inter", sans-serif' },
  { id: "manrope", label: "Manrope", value: '"Manrope", sans-serif' },
  { id: "plus-jakarta-sans", label: "Plus Jakarta Sans", value: '"Plus Jakarta Sans", sans-serif' },
  { id: "dm-sans", label: "DM Sans", value: '"DM Sans", sans-serif' },
  { id: "sora", label: "Sora", value: '"Sora", sans-serif' },
];
