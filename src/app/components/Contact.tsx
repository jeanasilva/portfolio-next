
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FloatingShapes } from "./FloatingShapes"; // ajuste o caminho conforme sua estrutura
import { useThemeContext } from "../contexts/ThemeContext";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; email: string; message: string }>();

  const onSubmit = (data: { name: string; email: string; message: string }) => {
    console.log(data);
    alert("🎉 Mensagem enviada!");
    reset();
  };

  const { isDark, mounted } = useThemeContext();
  const background = isDark
    ? "from-gray-900 via-gray-800 to-gray-700"
    : "from-blue-50 via-indigo-50 to-purple-50";

  if (!mounted) return null;

  return (
    <section
      id="contact"
      className={`relative py-24 px-4 bg-gradient-to-b ${background} overflow-hidden`}
    >
      
      <FloatingShapes palette="mixed" z={0} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Vamos{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Trabalhar Juntos
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Quer discutir um projeto ou colaboração? Entre em contato!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          <motion.div
            className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100/30 dark:border-gray-700/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Informações de Contato
            </h3>
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-500 dark:text-blue-300 flex-shrink-0">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h4>
                  <a
                    href="mailto:jean.silva.doe@example.com"
                    className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    jean.silva.doe@example.com
                  </a>
                </div>
              </div>

              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <FaLinkedin className="text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    LinkedIn
                  </h4>
                  <a
                    href="https://linkedin.com/in/jean.silva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    linkedin.com/in/jean.silva
                  </a>
                </div>
              </div>

              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-200 dark:bg-gray-700/20 rounded-full text-gray-800 dark:text-gray-200 flex-shrink-0">
                  <FaGithub className="text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    GitHub
                  </h4>
                  <a
                    href="https://github.com/jean.silva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    github.com/jean.silva
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white/90 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100/30 dark:border-gray-700/30"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div>
              <input
                {...register("name", { required: "Nome obrigatório" })}
                type="text"
                placeholder="Seu nome completo"
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm"
              />
              {errors.name?.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "E-mail obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "E-mail inválido",
                  },
                })}
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm"
              />
              {errors.email?.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div>
              <textarea
                {...register("message", {
                  required: "Mensagem obrigatória",
                  minLength: {
                    value: 10,
                    message: "Mensagem muito curta",
                  },
                })}
                placeholder="Sua mensagem..."
                rows={5}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm"
              />
              {errors.message?.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {String(errors.message.message)}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform"
            >
              Enviar Mensagem <FiSend />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
