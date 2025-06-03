// src/app/components/Skills.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaCloud } from "react-icons/fa";
import VanillaTilt from "vanilla-tilt";
import { useIsMounted } from "../hooks/useIsMounted";

const skills = [
  {
    title: "Frontend",
    desc: "Interfaces interativas com foco em UX, acessibilidade e performance otimizada.",
    icon: <FaCode className="text-3xl" />,
    color: "from-blue-300 to-cyan-300",
    badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "WebGL"],
  },
  {
    title: "Backend",
    desc: "APIs escaláveis com arquitetura limpa, segurança avançada e caching eficiente.",
    icon: <FaServer className="text-3xl" />,
    color: "from-purple-300 to-pink-300",
    badgeColor: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    tech: ["Node.js", "Express", "NestJS", "PostgreSQL", "Redis", "GraphQL", "Prisma"],
  },
  {
    title: "DevOps & AI",
    desc: "Infraestrutura automatizada e soluções de IA para pipelines inteligentes e escaláveis.",
    icon: <FaCloud className="text-3xl" />,
    color: "from-yellow-300 to-orange-300",
    badgeColor: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    tech: ["AWS", "Docker", "Kubernetes", "TensorFlow", "Terraform", "GitHub Actions", "Prometheus"],
  },
];

const FloatingElements = () => {
  const isMounted = useIsMounted();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function update() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const shapes = useMemo(() => {
    if (!isMounted || dimensions.width === 0 || dimensions.height === 0) {
      return [];
    }
    return Array.from({ length: 4 }, () => {
      const size = Math.random() * 80 + 50;
      const startX = Math.random() * dimensions.width;
      const startY = Math.random() * dimensions.height;
      const endX = Math.random() * dimensions.width;
      const endY = Math.random() * dimensions.height;
      const colorSet = [
        "from-blue-300 to-blue-200",
        "from-purple-200 to-indigo-200",
        "from-cyan-200 to-teal-200",
        "from-pink-200 to-purple-200",
      ];
      const color = colorSet[Math.floor(Math.random() * colorSet.length)];
      return { size, color, startX, startY, endX, endY };
    });
  }, [dimensions, isMounted]);

  if (!isMounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

export default function Skills() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".tilt-card").forEach((el) => {
      VanillaTilt.init(el, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.04,
      });
    });
  }, []);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden"
    >
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
          <motion.div
            key={s.title}
            className="tilt-card relative overflow-hidden p-8 bg-white/90 dark:bg-gray-800/80 rounded-3xl shadow-lg border border-gray-100/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 backdrop-blur-md"
            initial={{ scale: 0.95, opacity: 0, y: 26 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.03 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ minHeight: 340 }}
          >
            <div
              className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${s.color} opacity-15`}
            />
            <div
              className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-md`}
            >
              {s.icon}
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {s.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
              {s.desc}
            </p>

            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                Tecnologias principais
              </h4>
              <div className="flex flex-wrap gap-3">
                {s.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 ${s.badgeColor} rounded-full text-xs font-medium transition-colors duration-200`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
