"use client";

import { ThemeProvider } from "next-themes";
import { GetStartedModalProvider } from "@/components/site/GetStartedModalContext";
import { GetStartedModal } from "@/components/site/GetStartedModal";
import { ThemeShortcut } from "@/components/ThemeShortcut";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <ThemeShortcut />
      <GetStartedModalProvider>
        {children}
        <GetStartedModal />
      </GetStartedModalProvider>
    </ThemeProvider>
  );
}
