"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { FiExternalLink, FiMoon, FiSun, FiCode, FiZap } from "react-icons/fi";
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

// Partículas flutuantes melhoradas
const EnhancedFloatingParticles = () => {
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
      const size = Math.random() * 60 + 20;
      const hue = 200 + Math.random() * 80;
      const saturation = Math.random() * 40 + 60;
      const lightness = Math.random() * 30 + 50;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      return {
        id: i,
        size,
        color,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        delay: Math.random() * 5,
      };
    });
  }, [dimensions, mounted]);

  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${p.color}40, transparent)`,
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            opacity: [0.3, 0.7, 0.4, 0.3],
            scale: [1, 1.2, 0.8, 1],
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

// Grid de fundo animado
const AnimatedGrid = () => (
  <div className="absolute inset-0 opacity-20 dark:opacity-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-300 dark:text-blue-700"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Efeito de digitação melhorado
const EnhancedTypingText = ({ text }: { text: string }) => (
  <div className="relative inline-flex items-center">
    <motion.span
      className="font-geist-mono text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
    <motion.span
      className="ml-1 h-7 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
      animate={{ opacity: [1, 0] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
  </div>
);

// Tech bubble melhorado
const EnhancedTechBubble = ({
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

  const techColors: Record<string, string> = {
    React: "from-blue-400 to-cyan-400",
    "Next.js": "from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100",
    TypeScript: "from-blue-600 to-blue-800",
    Tailwind: "from-teal-400 to-cyan-500",
    "Node.js": "from-green-500 to-green-700",
    GraphQL: "from-pink-500 to-rose-600",
    PostgreSQL: "from-indigo-500 to-blue-600",
    Docker: "from-blue-600 to-blue-800",
    Kubernetes: "from-blue-400 to-indigo-600",
    AWS: "from-orange-400 to-orange-600",
    Redis: "from-red-500 to-red-700",
    TensorFlow: "from-orange-500 to-yellow-600",
  };

  const gradient = techColors[name] || "from-gray-400 to-gray-600";

  return (
    <motion.div
      ref={ref}
      className="tilt-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5
      }}
    >
      <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`text-4xl bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {name}
          </span>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
};

// Stats counter component
const StatsCounter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / 50;
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20"
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {count}+
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </motion.div>
  );
};

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { isDark, toggle, mounted } = useThemeContext();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
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
      timeout = setTimeout(() => setIsDeleting(true), 1500);
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
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.02,
        perspective: 1000,
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

  // Não renderizar nada até estar montado (evita hidration mismatch)
  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900"
    >
      {/* Background Elements */}
      <AnimatedGrid />
      <EnhancedFloatingParticles />
      
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{ y, opacity }}
      >
        {/* Main Content Container */}
        <div className="max-w-6xl w-full">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Side - Text Content */}
            <motion.div
              className="space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Greeting */}
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl">👋</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Olá, eu sou
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Jean A.
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Silva
                </span>
              </motion.h1>

              {/* Typing Animation */}
              <motion.div
                className="h-16 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                  <FiCode className="text-blue-500 dark:text-blue-400 text-xl" />
                  <EnhancedTypingText text={displayedText} />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Desenvolvedor Full-Stack especializado em criar{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  soluções digitais inovadoras
                </span>{" "}
                com integração de IA e tecnologias modernas.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold flex items-center gap-3 overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Ver projetos"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FiZap className="text-lg" />
                    Ver Projetos
                    <FiExternalLink className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
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
                  className="px-8 py-4 border-2 border-blue-500/30 dark:border-blue-400/30 text-blue-600 dark:text-blue-400 rounded-2xl font-semibold flex items-center gap-3 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Entrar em contato"
                >
                  Contato
                  <FiExternalLink className="text-sm" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Avatar & Stats */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Avatar */}
              <motion.div
                className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
                
                {/* Main avatar container */}
                <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-blue-400 to-purple-600 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 p-3">
                    <Image
                      src="/foto_logo.jpg"
                      alt="Jean A. Silva"
                      fill
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FiCode className="text-xl" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <FiZap className="text-2xl" />
                </motion.div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <StatsCounter end={50} label="Projetos" />
                <StatsCounter end={5} label="Anos Exp." />
                <StatsCounter end={100} label="Clientes" />
              </div>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4">
                Stack de Tecnologias
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Ferramentas e tecnologias que utilizo para criar soluções robustas e escaláveis
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {techStack.map((tech, index) => (
                <EnhancedTechBubble
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-xs font-medium">Scroll</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-current rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}