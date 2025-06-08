"use client";

import { useState, useEffect } from "react";
export function useThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        setIsDark(true);
      } else if (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
