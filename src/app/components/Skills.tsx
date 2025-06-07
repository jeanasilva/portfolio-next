// src/app/components/Skills.tsx

"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { FaCode, FaServer, FaCloud } from "react-icons/fa";
import { useThemeContext } from "../contexts/ThemeContext";

// Gradiente de fundo com grid, semelhante ao Hero
const BackgroundGrid = () => (
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-skills" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-indigo-400"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-skills)" />
    </svg>
  </div>
);

// Elementos flutuantes semelhantes ao Hero (partículas/blobs com blur)
const FloatingElements = () => {
  const { mounted, isDark } = useThemeContext();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!mounted) return;
    function update() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mounted]);

  const shapes = useMemo(() => {
    if (!mounted || dimensions.width === 0 || dimensions.height === 0) {
      return [];
    }
    return Array.from({ length: 4 }, () => {
      const size = Math.random() * 80 + 50;
      const startX = Math.random() * dimensions.width;
      const startY = Math.random() * dimensions.height;
      const endX = Math.random() * dimensions.width;
      const endY = Math.random() * dimensions.height;
      // Cores levemente ajustadas para combinar com a paleta do Hero
      const colorSet = isDark
        ? ["from-indigo-600 to-purple-600", "from-blue-700 to-indigo-500", "from-purple-700 to-pink-500", "from-cyan-600 to-teal-600"]
        : ["from-blue-300 to-cyan-300", "from-purple-300 to-pink-300", "from-cyan-200 to-teal-200", "from-pink-200 to-purple-200"];
      const color = colorSet[Math.floor(Math.random() * colorSet.length)];
      return { size, color, startX, startY, endX, endY };
    });
  }, [dimensions, mounted, isDark]);

  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {shapes.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute bg-gradient-to-br ${item.color} rounded-full`}
          initial={{
            x: item.startX,
            y: item.startY,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [item.startX, item.endX],
            y: [item.startY, item.endY],
            opacity: [0, 0.15, 0.05, 0],
            scale: [0, Math.random() * 0.6 + 0.3, Math.random() * 0.3 + 0.2, 0],
            rotate: [0, 360, 180, 0],
          }}
          transition={{
            duration: Math.random() * 16 + 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            filter: "blur(24px)",
          }}
        />
      ))}
    </div>
  );
};

const skills = [
  {
    title: "Frontend",
    desc: "Interfaces interativas com foco em UX, acessibilidade e performance otimizada.",
    icon: <FaCode className="text-3xl" />,
    color: "from-blue-500 to-cyan-500",
    badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "WebGL"],
  },
  {
    title: "Backend",
    desc: "APIs escaláveis com arquitetura limpa, segurança avançada e caching eficiente.",
    icon: <FaServer className="text-3xl" />,
    color: "from-purple-500 to-pink-500",
    badgeColor: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    tech: ["Node.js", "Express", "NestJS", "PostgreSQL", "Redis", "GraphQL", "Prisma"],
  },
  {
    title: "DevOps & AI",
    desc: "Infraestrutura automatizada e soluções de IA para pipelines inteligentes e escaláveis.",
    icon: <FaCloud className="text-3xl" />,
    color: "from-yellow-400 to-orange-400",
    badgeColor: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    tech: ["AWS", "Docker", "Kubernetes", "TensorFlow", "Terraform", "GitHub Actions", "Prometheus"],
  },
];

const SkillCard = ({
  title,
  desc,
  icon,
  color,
  badgeColor,
  tech,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  tech: string[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="tilt-card relative overflow-hidden p-6 bg-white/90 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-100/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: 300 }}
    >
      {/* Bolha de gradiente de fundo */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-10`}
      />
      {/* Ícone do skill */}
      <div
        className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
        {desc}
      </p>

      <div>
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Tecnologias principais
        </h4>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className={`px-3 py-1 ${badgeColor} rounded-full text-xs font-medium transition-colors duration-200`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const { mounted, isDark } = useThemeContext();

  // Inicializa o efeito tilt apenas depois do componente montar
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

  // Classes de fundo dinâmicas igual ao Hero
  const backgroundClasses = isDark
    ? "bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900"
    : "bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100";

  if (!mounted) {
    return (
      <section
        id="skills"
        className={`relative py-24 px-4 min-h-[50vh] overflow-hidden ${backgroundClasses}`}
      >
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className={`relative py-24 px-4 overflow-hidden transition-all duration-500 ${backgroundClasses}`}
    >
      {/* Background Grid e Elementos Flutuantes */}
      <BackgroundGrid />
      <FloatingElements />

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent tracking-wide"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Minhas Habilidades
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Expertise em tecnologias modernas para soluções completas e escaláveis.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3 relative z-10">
        {skills.map((s, i) => (
          <SkillCard
            key={s.title}
            title={s.title}
            desc={s.desc}
            icon={s.icon}
            color={s.color}
            badgeColor={s.badgeColor}
            tech={s.tech}
          />
        ))}
      </div>
    </section>
  );
}
