
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { FloatingShapes } from "./FloatingShapes";
import { useThemeContext } from "../contexts/ThemeContext";

const projects = [
  {
    name: "AI-Powered E-Commerce",
    desc: "Plataforma de e-commerce com recomendação de produtos via ML, Next.js e integração com Stripe. Lighthouse score 99.",
    img: "https://source.unsplash.com/random/800x450/?ecommerce,ai",
    link: "#",
    tags: ["Next.js", "TensorFlow", "Stripe", "Tailwind CSS"],
    features: [
      "Recomendações via machine learning",
      "SSR/SSG para performance",
      "Checkout seguro com Stripe",
      "PWA para mobile",
    ],
  },
  {
    name: "Serverless CI/CD Pipeline",
    desc: "Pipeline serverless com AWS Lambda, ECS e GitHub Actions. Deploy 80% mais rápido.",
    img: "https://source.unsplash.com/random/800x450/?devops,cloud",
    link: "#",
    tags: ["AWS Lambda", "Docker", "GitHub Actions", "Terraform"],
    features: [
      "Serverless com AWS Lambda",
      "Zero-downtime deployments",
      "Monitoramento com CloudWatch",
      "Auto-scaling dinâmico",
    ],
  },
  {
    name: "Real-Time Task Manager",
    desc: "Aplicativo de produtividade com colaboração em tempo real, Redis para cache e offline-first.",
    img: "https://source.unsplash.com/random/800x450/?task,productivity",
    link: "#",
    tags: ["React", "Redis", "Socket.io", "JWT"],
    features: [
      "Colaboração em tempo real",
      "Cache otimizado com Redis",
      "Modo offline com service workers",
      "Autenticação JWT",
    ],
  },
];

export default function FeaturedProjects() {
  const [current, setCurrent] = useState(0);
  const { isDark, mounted } = useThemeContext();

  const background = isDark
    ? "from-gray-900 via-gray-800 to-gray-700"
    : "from-blue-50 via-indigo-50 to-purple-50";

  const prev = () =>
    setCurrent((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setCurrent((i) => (i + 1) % projects.length);

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
  }, [current]);

  if (!mounted) return null;

  return (
    <section
      id="projects"
      className={`relative py-24 px-4 bg-gradient-to-b ${background} overflow-hidden`}
    >
      
      <FloatingShapes palette="mixed" z={0} />

      
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-accent dark:from-accent-dark to-purple-600 bg-clip-text text-transparent tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Projetos{" "}
          <span className="text-gray-800 dark:text-gray-200">Destaque</span>
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Soluções inovadoras com tecnologias modernas e foco em escalabilidade.
        </motion.p>
      </div>

      
      <div className="relative max-w-5xl mx-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="tilt-card bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-100/30 dark:border-gray-700/30 overflow-hidden"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              
              <div className="md:w-1/2 relative group overflow-hidden">
                <Image
                  src={projects[current].img}
                  alt={projects[current].name}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <a
                    href={projects[current].link}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-center flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  >
                    Ver Detalhes <FiExternalLink />
                  </a>
                </div>
              </div>

              
              <div className="md:w-1/2 p-8 flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {projects[current].name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                  {projects[current].desc}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    Principais Recursos
                  </h4>
                  <ul className="space-y-2">
                    {projects[current].features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                      >
                        <span className="text-blue-400 dark:text-cyan-300 mt-1">
                          ✓
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[current].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-gray-700/70 text-blue-700 dark:text-gray-200 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href={projects[current].link}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-md transition-transform hover:scale-105"
                  >
                    Ver Projeto <FiChevronRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-700/80 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors border border-gray-200 dark:border-gray-600"
          aria-label="Projeto anterior"
        >
          <FiChevronLeft />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-700/80 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors border border-gray-200 dark:border-gray-600"
          aria-label="Próximo projeto"
        >
          <FiChevronRight />
        </motion.button>

        
        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === idx
                  ? "bg-blue-500 w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Ir para projeto ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
