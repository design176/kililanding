/** Selectable hero terminal animation types, offered in the settings modal. */
export type HeroAnimationOption = {
  id: string;
  label: string;
};

/** First entry is the site's current default and stays selected until changed. */
export const HERO_ANIMATIONS: HeroAnimationOption[] = [
  { id: "v1", label: "Animation 1" },
  { id: "v2", label: "Animation 2" },
];
