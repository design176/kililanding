"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { HEADING_FONTS, BODY_FONTS, type FontOption } from "@/lib/fonts";
import { FONT_WEIGHTS, type FontWeightOption } from "@/lib/fontWeights";

const HEADING_FONT_STORAGE_KEY = "kili-heading-font";
const BODY_FONT_STORAGE_KEY = "kili-body-font";
const HEADING_WEIGHT_STORAGE_KEY = "kili-heading-weight";
const BODY_WEIGHT_STORAGE_KEY = "kili-body-weight";

function readStoredFontId(key: string, options: FontOption[]) {
  if (typeof window === "undefined") return options[0].id;
  const stored = localStorage.getItem(key);
  return stored && options.some((font) => font.id === stored) ? stored : options[0].id;
}

function readStoredWeightId(key: string) {
  if (typeof window === "undefined") return FONT_WEIGHTS[0].id;
  const stored = localStorage.getItem(key);
  return stored && FONT_WEIGHTS.some((weight) => weight.id === stored) ? stored : FONT_WEIGHTS[0].id;
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

/** Applies (or clears) one of the opt-in global weight overrides — see the
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
    readStoredFontId(HEADING_FONT_STORAGE_KEY, HEADING_FONTS)
  );
  const [bodyFontId, setBodyFontIdState] = useState(() =>
    readStoredFontId(BODY_FONT_STORAGE_KEY, BODY_FONTS)
  );
  const [headingWeightId, setHeadingWeightIdState] = useState(() =>
    readStoredWeightId(HEADING_WEIGHT_STORAGE_KEY)
  );
  const [bodyWeightId, setBodyWeightIdState] = useState(() =>
    readStoredWeightId(BODY_WEIGHT_STORAGE_KEY)
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

  const setHeadingFontId = (id: string) => {
    setHeadingFontIdState(id);
    localStorage.setItem(HEADING_FONT_STORAGE_KEY, id);
  };

  const setBodyFontId = (id: string) => {
    setBodyFontIdState(id);
    localStorage.setItem(BODY_FONT_STORAGE_KEY, id);
  };

  const setHeadingWeightId = (id: string) => {
    setHeadingWeightIdState(id);
    localStorage.setItem(HEADING_WEIGHT_STORAGE_KEY, id);
  };

  const setBodyWeightId = (id: string) => {
    setBodyWeightIdState(id);
    localStorage.setItem(BODY_WEIGHT_STORAGE_KEY, id);
  };

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
