"use client";

import { ThemeProvider } from "next-themes";
import { GetStartedModalProvider } from "@/components/site/GetStartedModalContext";
import { GetStartedModal } from "@/components/site/GetStartedModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <GetStartedModalProvider>
        {children}
        <GetStartedModal />
      </GetStartedModalProvider>
    </ThemeProvider>
  );
}
