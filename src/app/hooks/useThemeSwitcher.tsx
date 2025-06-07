"use client";

import { useState, useEffect } from "react";

/**
 * Hook único para todo o app:  
 *  - Lê `localStorage.getItem("theme")` no primeiro mount.  
 *  - Se estiver “dark”, aplica a classe `dark` em <html> e retorna isDark = true.  
 *  - Caso contrário, checa `prefers-color-scheme` (e aplica `dark` se for “dark”).  
 *  - Sempre que `isDark` muda, atualiza (add/remove) a classe `dark` em <html> e grava em localStorage.
 */
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
