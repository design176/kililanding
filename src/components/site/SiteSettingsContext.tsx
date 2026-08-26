"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { HEADING_FONTS, BODY_FONTS, type FontOption } from "@/lib/fonts";

const HEADING_FONT_STORAGE_KEY = "kili-heading-font";
const BODY_FONT_STORAGE_KEY = "kili-body-font";

function readStoredFontId(key: string, options: FontOption[]) {
  if (typeof window === "undefined") return options[0].id;
  const stored = localStorage.getItem(key);
  return stored && options.some((font) => font.id === stored) ? stored : options[0].id;
}

type SiteSettingsContextValue = {
  headingFontId: string;
  bodyFontId: string;
  setHeadingFontId: (id: string) => void;
  setBodyFontId: (id: string) => void;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [headingFontId, setHeadingFontIdState] = useState(() =>
    readStoredFontId(HEADING_FONT_STORAGE_KEY, HEADING_FONTS)
  );
  const [bodyFontId, setBodyFontIdState] = useState(() =>
    readStoredFontId(BODY_FONT_STORAGE_KEY, BODY_FONTS)
  );

  useEffect(() => {
    const font = HEADING_FONTS.find((entry) => entry.id === headingFontId) ?? HEADING_FONTS[0];
    document.documentElement.style.setProperty("--font-heading", font.value);
  }, [headingFontId]);

  useEffect(() => {
    const font = BODY_FONTS.find((entry) => entry.id === bodyFontId) ?? BODY_FONTS[0];
    document.documentElement.style.setProperty("--font-body", font.value);
  }, [bodyFontId]);

  const setHeadingFontId = (id: string) => {
    setHeadingFontIdState(id);
    localStorage.setItem(HEADING_FONT_STORAGE_KEY, id);
  };

  const setBodyFontId = (id: string) => {
    setBodyFontIdState(id);
    localStorage.setItem(BODY_FONT_STORAGE_KEY, id);
  };

  return (
    <SiteSettingsContext.Provider
      value={{ headingFontId, bodyFontId, setHeadingFontId, setBodyFontId }}
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
