/**
 * Selectable font-weight overrides for the settings modal. "Default" means
 * "don't override" — every heading/body element keeps whatever weight its
 * own component CSS already sets. Any other option forces that weight
 * everywhere (see the `[data-heading-weight-override]` /
 * `[data-body-weight-override]` rules in globals.css), since component-level
 * weight declarations otherwise always win on specificity.
 */
export type FontWeightOption = {
  id: string;
  label: string;
  /** Absent only for the "default" (no-override) option. */
  value?: string;
};

export const FONT_WEIGHTS: FontWeightOption[] = [
  { id: "default", label: "Default" },
  { id: "300", label: "Light", value: "300" },
  { id: "400", label: "Regular", value: "400" },
  { id: "500", label: "Medium", value: "500" },
  { id: "600", label: "Semibold", value: "600" },
  { id: "700", label: "Bold", value: "700" },
  { id: "800", label: "Extrabold", value: "800" },
  { id: "900", label: "Black", value: "900" },
];
