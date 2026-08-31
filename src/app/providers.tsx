"use client";

import { ThemeProvider } from "@/components/site/ThemeProvider";
import { GetStartedModalProvider } from "@/components/site/GetStartedModalContext";
import { GetStartedModal } from "@/components/site/GetStartedModal";
import { SiteSettingsProvider } from "@/components/site/SiteSettingsContext";
import { SettingsModal } from "@/components/site/SettingsModal";
import { ThemeShortcut } from "@/components/ThemeShortcut";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeShortcut />
      <SiteSettingsProvider>
        <GetStartedModalProvider>
          {children}
          <GetStartedModal />
        </GetStartedModalProvider>
        <SettingsModal />
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}
