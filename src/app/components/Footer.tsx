"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Footer() {
  const { isDark, mounted } = useThemeContext();
  if (!mounted) return null;

  const background = isDark
    ? "from-gray-900 via-gray-800 to-gray-700 border-gray-800"
    : "from-blue-50 via-indigo-50 to-purple-50 border-gray-100";

  return (
    <footer className={`py-12 px-4 bg-gradient-to-b ${background} text-center border-t`}>
      <div className="max-w-7xl mx-auto">
        <motion.a
          href="#"
          className="text-xl font-bold bg-gradient-to-r from-accent dark:from-accent-dark to-purple-600 bg-clip-text text-transparent inline-block mb-6 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-8 h-8 rounded-full bg-accent dark:bg-accent-dark flex items-center justify-center text-white font-mono">JS</span>
          Jean Silva
        </motion.a>
        <div className="flex justify-center gap-6 mb-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent-dark transition-colors text-xl"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent-dark transition-colors text-xl"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:jean.silva.doe@example.com"
            className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent-dark transition-colors text-xl"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Email"
          >
            <FaEnvelope />
          </motion.a>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Transformando ideias em soluções tecnológicas.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          © {new Date().getFullYear()} Jean A. Silva. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
