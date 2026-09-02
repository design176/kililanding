"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { HEADING_FONTS, BODY_FONTS } from "@/lib/fonts";
import { FONT_WEIGHTS, type FontWeightOption } from "@/lib/fontWeights";

const HEADING_FONT_STORAGE_KEY = "kili-heading-font";
const BODY_FONT_STORAGE_KEY = "kili-body-font";
const HEADING_WEIGHT_STORAGE_KEY = "kili-heading-weight";
const BODY_WEIGHT_STORAGE_KEY = "kili-body-weight";

// Site default: headings render Medium, body text renders Light, until
// someone picks a different weight from the settings modal (Cmd/Ctrl+K).
const DEFAULT_HEADING_WEIGHT_ID = "500";
const DEFAULT_BODY_WEIGHT_ID = "300";

function makeStoredSetter(setState: (id: string) => void, key: string) {
  return (id: string) => {
    setState(id);
    localStorage.setItem(key, id);
  };
}

function readStored<T extends { id: string }>(
  key: string,
  options: readonly T[],
  fallbackId: string
) {
  if (typeof window === "undefined") return fallbackId;
  const stored = localStorage.getItem(key);
  return stored && options.some((option) => option.id === stored) ? stored : fallbackId;
}

type SiteSettingsContextValue = {
  headingFontId: string;
  bodyFontId: string;
  headingWeightId: string;
  bodyWeightId: string;
  setHeadingFontId: (id: string) => void;
  setBodyFontId: (id: string) => void;
  setHeadingWeightId: (id: string) => void;
  setBodyWeightId: (id: string) => void;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

/** Applies (or clears) one of the opt-in global weight overrides - see the
 * `[data-heading-weight-override]` / `[data-body-weight-override]` rules in
 * globals.css, which only exist so this can stay inert until a non-default
 * weight is actually chosen. */
function applyWeightOverride(cssVar: string, datasetKey: string, weight: FontWeightOption) {
  const root = document.documentElement;
  if (weight.value) {
    root.style.setProperty(cssVar, weight.value);
    root.dataset[datasetKey] = "true";
  } else {
    root.style.removeProperty(cssVar);
    delete root.dataset[datasetKey];
  }
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [headingFontId, setHeadingFontIdState] = useState(() =>
    readStored(HEADING_FONT_STORAGE_KEY, HEADING_FONTS, HEADING_FONTS[0].id)
  );
  const [bodyFontId, setBodyFontIdState] = useState(() =>
    readStored(BODY_FONT_STORAGE_KEY, BODY_FONTS, BODY_FONTS[0].id)
  );
  const [headingWeightId, setHeadingWeightIdState] = useState(() =>
    readStored(HEADING_WEIGHT_STORAGE_KEY, FONT_WEIGHTS, DEFAULT_HEADING_WEIGHT_ID)
  );
  const [bodyWeightId, setBodyWeightIdState] = useState(() =>
    readStored(BODY_WEIGHT_STORAGE_KEY, FONT_WEIGHTS, DEFAULT_BODY_WEIGHT_ID)
  );

  useEffect(() => {
    const font = HEADING_FONTS.find((entry) => entry.id === headingFontId) ?? HEADING_FONTS[0];
    document.documentElement.style.setProperty("--font-heading", font.value);
  }, [headingFontId]);

  useEffect(() => {
    const font = BODY_FONTS.find((entry) => entry.id === bodyFontId) ?? BODY_FONTS[0];
    document.documentElement.style.setProperty("--font-body", font.value);
  }, [bodyFontId]);

  useEffect(() => {
    const weight = FONT_WEIGHTS.find((entry) => entry.id === headingWeightId) ?? FONT_WEIGHTS[0];
    applyWeightOverride("--font-heading-weight", "headingWeightOverride", weight);
  }, [headingWeightId]);

  useEffect(() => {
    const weight = FONT_WEIGHTS.find((entry) => entry.id === bodyWeightId) ?? FONT_WEIGHTS[0];
    applyWeightOverride("--font-body-weight", "bodyWeightOverride", weight);
  }, [bodyWeightId]);

  const setHeadingFontId = makeStoredSetter(setHeadingFontIdState, HEADING_FONT_STORAGE_KEY);
  const setBodyFontId = makeStoredSetter(setBodyFontIdState, BODY_FONT_STORAGE_KEY);
  const setHeadingWeightId = makeStoredSetter(setHeadingWeightIdState, HEADING_WEIGHT_STORAGE_KEY);
  const setBodyWeightId = makeStoredSetter(setBodyWeightIdState, BODY_WEIGHT_STORAGE_KEY);

  return (
    <SiteSettingsContext.Provider
      value={{
        headingFontId,
        bodyFontId,
        headingWeightId,
        bodyWeightId,
        setHeadingFontId,
        setBodyFontId,
        setHeadingWeightId,
        setBodyWeightId,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return ctx;
}
