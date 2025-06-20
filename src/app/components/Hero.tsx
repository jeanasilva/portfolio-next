"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { FiExternalLink, FiCode, FiZap, FiChevronDown } from "react-icons/fi";
import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiTensorflow,
} from "react-icons/si";

import { useThemeContext } from "../contexts/ThemeContext";

const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { mounted } = useThemeContext();

  useEffect(() => {
    if (!mounted) return;

    function update() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mounted]);

  const particles = useMemo(() => {
    if (!mounted || dimensions.width === 0 || dimensions.height === 0) {
      return [];
    }
    return Array.from({ length: 12 }, (_, i) => {
      const size = Math.random() * 20 + 10;
      return {
        id: i,
        size,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        delay: Math.random() * 5,
      };
    });
  }, [dimensions, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0.15,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const BackgroundGrid = () => (
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-500"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const TypingEffect = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <motion.span
      className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
    <motion.span
      className="w-0.5 h-6 bg-blue-500"
      animate={{ opacity: [1, 0] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
  </div>
);

const TechCard = ({
  icon,
  name,
  index,
}: {
  icon: React.ReactNode;
  name: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="tilt-card group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{ y: -5, scale: 1.03 }}
    >
      <div className="relative p-4 sm:p-5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="text-3xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / 30;
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-4 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {count}+
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{label}</div>
    </motion.div>
  );
};

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { mounted, isDark } = useThemeContext();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Specialist",
    "DevOps Expert",
    "AI/ML Enthusiast",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(
        () => setDisplayedText(currentRole.substring(0, displayedText.length + 1)),
        100
      );
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(
        () => setDisplayedText(currentRole.substring(0, displayedText.length - 1)),
        50
      );
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentRoleIndex, isDeleting]);

  useEffect(() => {
    if (!mounted) return;

    document.querySelectorAll<HTMLElement>(".tilt-card").forEach((el) => {
      VanillaTilt.init(el, {
        max: 8,
        speed: 300,
        glare: true,
        "max-glare": 0.1,
        scale: 1.01,
      });
    });
  }, [mounted]);

  const techStack = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiGraphql />, name: "GraphQL" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiKubernetes />, name: "Kubernetes" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <SiRedis />, name: "Redis" },
    { icon: <SiTensorflow />, name: "TensorFlow" },
  ];

  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  const backgroundClasses = isDark
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100";

  const stackBackground = isDark
    ? "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-700/90"
    : "bg-gradient-to-br from-slate-50/90 via-blue-50/90 to-indigo-100/90";

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${backgroundClasses}`}
    >
      <BackgroundGrid />
      <FloatingParticles />

      <motion.div className="relative z-10" style={{ y, opacity }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <motion.div
              className="space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  isDark
                    ? "bg-gray-800/30 border-gray-700/50 text-gray-300"
                    : "bg-white/30 border-gray-200/50 text-gray-700"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xl">👋</span>
                <span className="text-sm font-medium">Olá, eu sou</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span
                  className={`bg-gradient-to-r ${
                    isDark
                      ? "from-blue-400 via-purple-400 to-indigo-400"
                      : "from-blue-600 via-purple-600 to-indigo-600"
                  } bg-clip-text text-transparent`}
                >
                  Jean A.
                </span>
                <br />
                <span
                  className={`bg-gradient-to-r ${
                    isDark ? "from-indigo-400 to-blue-400" : "from-indigo-600 to-blue-600"
                  } bg-clip-text text-transparent`}
                >
                  Silva
                </span>
              </motion.h1>

              <motion.div
                className="flex items-center justify-center lg:justify-start min-h-[60px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm border ${
                    isDark ? "bg-gray-800/40 border-gray-700/50" : "bg-white/40 border-gray-200/50"
                  }`}
                >
                  <FiCode
                    className={`text-lg flex-shrink-0 ${
                      isDark ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <TypingEffect text={displayedText} />
                </div>
              </motion.div>

              <motion.p
                className={`text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Desenvolvedor Full-Stack especializado em criar{" "}
                <span
                  className={`font-medium bg-gradient-to-r ${
                    isDark ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
                  } bg-clip-text text-transparent`}
                >
                  soluções digitais inovadoras
                </span>{" "}
                com tecnologias modernas e integração de IA.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-7 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FiZap className="text-lg" /> Ver Projetos
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <motion.a
                  href="#contact"
                  className={`px-7 py-3.5 border rounded-lg font-medium flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                    isDark
                      ? "border-blue-400/50 text-blue-400 bg-gray-800/20 hover:bg-gray-700/30"
                      : "border-blue-500/50 text-blue-600 bg-white/20 hover:bg-white/30"
                  }`}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contato
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />

                <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-blue-400 to-purple-600 shadow-2xl">
                  <div
                    className={`w-full h-full rounded-full overflow-hidden p-2 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/foto_logo.jpg"
                        alt="Jean A. Silva"
                        fill
                        className="rounded-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FiCode className="text-lg" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <FiZap className="text-xl" />
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                <StatCard end={50} label="Projetos" />
                <StatCard end={5} label="Anos" />
                <StatCard end={100} label="Clientes" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <section
        className={`relative py-16 px-4 ${stackBackground} backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r ${
              isDark ? "from-gray-200 to-gray-400" : "from-gray-800 to-gray-600"
            } bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Stack de Tecnologias
          </motion.h2>
          <motion.p
            className={`text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Ferramentas e tecnologias que domino para criar soluções robustas e
            escaláveis.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 relative z-10">
          {techStack.map((tech, index) => (
            <TechCard key={tech.name} icon={tech.icon} name={tech.name} index={index} />
          ))}
        </div>
      </section>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className={`flex flex-col items-center gap-1 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="text-xs">Scroll</span>
          <FiChevronDown className="text-xl animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}