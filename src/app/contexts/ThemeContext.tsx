// src/app/contexts/ThemeContext.tsx
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  isDark: false,
  toggle: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar se já existe uma preferência salva
    const saved = localStorage.getItem("theme");
    
    // Se não há preferência salva, usar preferência do sistema
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = saved === "dark" || (!saved && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    
    // Aplicar classe no documentElement (html) em vez do body
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Aplicar mudanças no DOM
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Salvar preferência
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  const toggle = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

// Hook personalizado para usar no lugar do useThemeSwitcher
export const useThemeSwitcher = (): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] => {
  const { isDark, toggle } = useThemeContext();
  
  const setIsDark = (value: boolean | ((prev: boolean) => boolean)) => {
    if (typeof value === 'function') {
      // Se for uma função, executar o toggle
      toggle();
    } else {
      // Se for um valor booleano direto
      if (value !== isDark) {
        toggle();
      }
    }
  };
  
  return [isDark, setIsDark];
};