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
    
    try {
      const saved = localStorage.getItem("theme");
      
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const shouldBeDark = saved === "dark" || (!saved && systemPrefersDark);
      
      setIsDark(shouldBeDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.warn("Erro ao acessar localStorage:", error);
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Erro ao salvar tema no localStorage:", error);
    }
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

export const useThemeSwitcher = (): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] => {
  const { isDark, toggle } = useThemeContext();
  
  const setIsDark = (value: boolean | ((prev: boolean) => boolean)) => {
    if (typeof value === 'function') {
      toggle();
    } else {
      if (value !== isDark) {
        toggle();
      }
    }
  };
  
  return [isDark, setIsDark];
};