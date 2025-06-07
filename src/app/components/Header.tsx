"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiSun, FiMoon, FiCode, FiZap, FiUser } from "react-icons/fi";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Header() {
  const { isDark, toggle, mounted } = useThemeContext();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(255, 255, 255, 0.1)",
      "rgba(255, 255, 255, 0.9)"
    ]
  );

  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(17, 24, 39, 0.1)",
      "rgba(17, 24, 39, 0.9)"
    ]
  );

  const links = [
    { 
      name: "Skills", 
      href: "#skills",
      icon: <FiCode className="text-sm" />,
      description: "Minhas habilidades"
    },
    { 
      name: "Projetos", 
      href: "#projects",
      icon: <FiZap className="text-sm" />,
      description: "Trabalhos realizados"
    },
    { 
      name: "Contato", 
      href: "#contact",
      icon: <FiUser className="text-sm" />,
      description: "Entre em contato"
    },
  ];

  const logoVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.6
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  };

  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b border-white/10 dark:border-gray-800/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="hidden md:flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <motion.nav 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl shadow-md border-b border-gray-200 dark:border-gray-700'
            : 'backdrop-blur-md border-b border-white/10 dark:border-gray-800/20'
        }`}
        style={{
          backgroundColor: isDark ? headerBackgroundDark : headerBackground,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                JS
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 blur opacity-30 -z-10 group-hover:opacity-60 transition-opacity duration-300" />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Jean Silva
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1">
                Developer
              </span>
            </div>
          </motion.a>

          
          <div className="hidden md:flex items-center gap-2">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  {link.name}
                </div>
                
                
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 pointer-events-none whitespace-nowrap"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {link.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                </motion.div>

                
                <motion.span 
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"
                  layoutId="activeTab"
                />
              </motion.a>
            ))}

            
            <motion.button
              onClick={toggle}
              className="ml-4 p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30 backdrop-blur-sm transition-all duration-300 group"
              whileHover={{ 
                scale: 1.1, 
                rotate: 180,
                backgroundColor: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              aria-label="Alternar tema"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiSun className="text-yellow-400 text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMoon className="text-blue-500 text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>

              
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
            </motion.button>
          </div>

          
          <motion.button
            className="md:hidden p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
            onClick={() => setMenu(!menu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <motion.div
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full"
                animate={{
                  rotate: menu ? 45 : 0,
                  y: menu ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full"
                animate={{
                  opacity: menu ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full"
                animate={{
                  rotate: menu ? -45 : 0,
                  y: menu ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>

        
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30"
            >
              <div className="px-6 py-6 space-y-4">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenu(false)}
                    className="group flex items-center gap-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{link.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {link.description}
                      </span>
                    </div>
                  </motion.a>
                ))}

                <motion.button
                  onClick={() => {
                    toggle();
                    setMenu(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 transition-colors duration-300">
                    {isDark ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {isDark ? "Modo Claro" : "Modo Escuro"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Alterar aparência
                    </span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenu(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}