"use client";

import React from "react";
import { useThemeContext } from "../contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { isDark, toggle } = useThemeContext();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
      aria-label="Alternar tema"
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
