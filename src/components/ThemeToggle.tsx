"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        pill
        aria-label="Toggle theme"
        style={{ visibility: "hidden" }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      pill
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={13} weight="bold" /> : <Moon size={13} weight="bold" />}
    </Button>
  );
}
