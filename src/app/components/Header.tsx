// src/components/Header.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiSun, FiMoon, FiCode, FiZap, FiUser, FiChevronDown } from "react-icons/fi";
import { useThemeContext } from "../contexts/ThemeContext";

const colorVariants = {
  blue:    "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
  purple:  "from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400",
  emerald: "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400"
} as const;

type Color = keyof typeof colorVariants;

interface NavLinkItem {
  name: string;
  href: string;
  icon: React.JSX.Element;
  description: string;
  color: Color;
}

const links: NavLinkItem[] = [
  {
    name: "Skills",
    href: "#skills",
    icon: <FiCode className="text-sm" />,
    description: "Minhas habilidades técnicas",
    color: "blue"
  },
  {
    name: "Projetos",
    href: "#projects",
    icon: <FiZap className="text-sm" />,
    description: "Trabalhos realizados",
    color: "purple"
  },
  {
    name: "Contato",
    href: "#contact",
    icon: <FiUser className="text-sm" />,
    description: "Entre em contato comigo",
    color: "emerald"
  }
];

export default function Header() {
  const { isDark, toggle, mounted } = useThemeContext();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.95)"]
  );
  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0.05)", "rgba(15, 23, 42, 0.95)"]
  );

  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <motion.nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl shadow-2xl shadow-black/5 dark:shadow-black/20 border-b border-gray-200/60 dark:border-gray-700/60"
            : "backdrop-blur-lg border-b border-white/20 dark:border-gray-800/30"
        }`}
        style={{ backgroundColor: isDark ? headerBackgroundDark : headerBackground }}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25, duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#"
            className="flex items-center gap-4 group"
            initial={{ opacity: 0, x: -40, scale: 0.7 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.8 }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-blue-500/25 dark:shadow-blue-400/25">
                JS
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 blur-md opacity-40 -z-10 group-hover:opacity-70 transition-opacity duration-500"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                className={`
                  text-xl font-black
                  text-gray-900
                  bg-clip-text
                  dark:bg-gradient-to-r 
                  dark:from-blue-400 
                  dark:via-purple-400 
                  dark:to-pink-400 
                  dark:bg-clip-text 
                  dark:text-transparent
                  dark:font-bold
                `}
                whileHover={{ backgroundPosition: ["0%", "100%"], transition: { duration: 0.8 } }}
              >
                Jean Silva
              </motion.span>
              <span
                className={`
                  text-sm 
                  text-gray-700
                  dark:text-gray-400 
                  font-bold 
                  dark:font-medium 
                  -mt-0.5 
                  tracking-wide
                `}
              >
                Full Stack Developer
              </span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`
                  group relative px-5 py-3 rounded-2xl 
                  text-gray-900 font-bold
                  dark:text-gray-300 dark:font-medium
                  hover:text-gray-800 
                  dark:hover:text-white 
                  transition-all duration-300
                `}
                custom={i}
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: 0.2 + i * 0.15, type: "spring", stiffness: 120, damping: 15 }
                }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2.5">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    {link.icon}
                  </motion.div>
                  {link.name}
                </div>
                <motion.div
                  className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-900/90 dark:bg-gray-800/90 text-white text-xs rounded-xl opacity-0 pointer-events-none whitespace-nowrap backdrop-blur-sm border border-gray-700/50 font-medium"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.6 } }}
                >
                  {link.description}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900/90 dark:bg-gray-800/90 rotate-45 border-l border-t border-gray-700/50" />
                </motion.div>
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorVariants[link.color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                />
                <motion.span
                  className={`absolute bottom-1 left-1/2 w-0 h-1 bg-gradient-to-r ${colorVariants[link.color]} transform -translate-x-1/2 group-hover:w-8 transition-all duration-300 rounded-full`}
                  layoutId="activeIndicator"
                />
              </motion.a>
            ))}

            <motion.button
              onClick={toggle}
              className="ml-3 p-3.5 rounded-2xl bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 border border-white/40 dark:border-gray-700/40 backdrop-blur-md transition-all duration-300 group shadow-lg shadow-black/5 dark:shadow-black/20"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { delay: 0.8, type: "spring", stiffness: 120 }
              }}
              aria-label="Alternar tema"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <FiSun className="text-yellow-400 text-xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <FiMoon className="text-blue-500 text-xl" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-700/40 shadow-lg"
            onClick={() => setMenu(!menu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <motion.div
              className="w-6 h-6 flex flex-col justify-center items-center"
              animate={menu ? "open" : "closed"}
            >
              <motion.span
                className="w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 2 }
                }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full mt-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full mt-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -2 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menu && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60 shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
            >
              <div className="px-6 py-6 space-y-4">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`
                      block px-4 py-3 rounded-xl 
                      text-gray-900 font-bold
                      dark:text-gray-300 dark:font-medium
                      hover:bg-gray-100 
                      dark:hover:bg-gray-800/50 
                      transition-all duration-300
                    `}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: i * 0.1 }
                    }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${colorVariants[link.color]} text-white`}>
                        {link.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
                
                <motion.button
                  onClick={() => {
                    toggle();
                    setMenu(false);
                  }}
                  className="w-full mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isDark ? <FiSun /> : <FiMoon />}
                    {isDark ? 'Modo Claro' : 'Modo Escuro'}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenu(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}