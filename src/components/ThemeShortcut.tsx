"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeShortcut() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!event.altKey || event.code !== "KeyD") return;

      event.preventDefault();
      setTheme(theme === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme]);

  return null;
}
