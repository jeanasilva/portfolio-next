"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { FiExternalLink, FiCode, FiZap } from "react-icons/fi";
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

// Partículas flutuantes simplificadas
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
    return Array.from({ length: 6 }, (_, i) => {
      const size = Math.random() * 40 + 30;
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400 blur-xl"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0.3,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Grid de fundo
const BackgroundGrid = () => (
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-500"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Efeito de digitação
const TypingEffect = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <motion.span
      className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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

// Card de tecnologia com ícones
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
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Contador de estatísticas
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
      className="text-center p-4 sm:p-6 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {count}+
      </div>
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{label}</div>
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02,
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

  // Loading state
  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  // Determinar classes de fundo baseado no tema atual
  const backgroundClasses = isDark
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100";

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${backgroundClasses}`}
    >
      {/* Background Elements */}
      <BackgroundGrid />
      <FloatingParticles />

      {/* === Aqui fechamos o motion.div logo após os conteúdos que queremos “fadar” === */}
      <motion.div className="relative z-10" style={{ y, opacity }}>
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
            {/* Left Content */}
            <motion.div
              className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Greeting Badge */}
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  isDark
                    ? "bg-gray-800/30 border-gray-700/50 text-gray-300"
                    : "bg-white/30 border-white/50 text-gray-700"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xl">👋</span>
                <span className="text-sm font-medium">Olá, eu sou</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
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

              {/* Typing Role */}
              <motion.div
                className="flex items-center justify-center lg:justify-start min-h-[60px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className={`flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl backdrop-blur-sm border ${
                    isDark ? "bg-gray-800/40 border-gray-700/50" : "bg-white/40 border-white/50"
                  }`}
                >
                  <FiCode
                    className={`text-lg sm:text-xl flex-shrink-0 ${
                      isDark ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <TypingEffect text={displayedText} />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Desenvolvedor Full-Stack especializado em criar{" "}
                <span
                  className={`font-semibold bg-gradient-to-r ${
                    isDark ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
                  } bg-clip-text text-transparent`}
                >
                  soluções digitais inovadoras
                </span>{" "}
                com tecnologias modernas e integração de IA.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FiZap className="text-lg" /> Ver Projetos
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
                  className={`px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-xl font-semibold flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                    isDark
                      ? "border-blue-400/50 text-blue-400 bg-gray-800/20 hover:bg-gray-700/30"
                      : "border-blue-500/50 text-blue-600 bg-white/20 hover:bg-white/30"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contato
                  <FiExternalLink className="text-sm" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content – Avatar e Stats */}
            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Avatar Container */}
              <motion.div
                className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl animate-pulse" />

                {/* Avatar Image */}
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

                {/* Floating Icons */}
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto">
                <StatCard end={50} label="Projetos" />
                <StatCard end={5} label="Anos" />
                <StatCard end={100} label="Clientes" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* === Fim do bloco que usa y/opacity === */}

      {/* === Tech Stack (Skills) fica agora FORA do motion.div acima === */}
      <section
        className={`relative py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r ${
              isDark ? "from-gray-200 to-gray-400" : "from-gray-800 to-gray-600"
            } bg-clip-text text-transparent tracking-wide`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Stack de Tecnologias
          </motion.h2>
          <motion.p
            className={`text-base sm:text-lg ${
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

        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 relative z-10">
          {techStack.map((tech, index) => (
            <TechCard key={tech.name} icon={tech.icon} name={tech.name} index={index} />
          ))}
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className={`flex flex-col items-center gap-2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-current rounded-full mt-1"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
