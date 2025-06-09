"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "../hooks/useIsMounted";
import { useThemeContext } from "../contexts/ThemeContext";

type Palette =
  | "blue"
  | "purple"
  | "teal"
  | "pink"
  | "mixed";

interface Props {
  amount?: number;
  size?: [number, number];
  blur?: number;
  palette?: Palette;
  z?: number;
}

const lightPalettes: Record<Palette, string[]> = {
  blue:   ["from-blue-300 to-blue-200"],
  purple: ["from-purple-200 to-indigo-200"],
  teal:   ["from-cyan-200 to-teal-200"],
  pink:   ["from-pink-200 to-purple-200"],
  mixed: [
    "from-blue-300 to-blue-200",
    "from-purple-200 to-indigo-200",
    "from-cyan-200 to-teal-200",
    "from-pink-200 to-purple-200",
  ],
};

const darkPalettes: Record<Palette, string[]> = {
  blue: ["from-blue-700 to-indigo-500"],
  purple: ["from-purple-700 to-pink-500"],
  teal: ["from-cyan-600 to-teal-600"],
  pink: ["from-pink-700 to-purple-600"],
  mixed: [
    "from-indigo-600 to-purple-600",
    "from-blue-700 to-indigo-500",
    "from-purple-700 to-pink-500",
    "from-cyan-600 to-teal-600",
  ],
};

export function FloatingShapes({
  amount = 4,
  size = [50, 130],
  blur = 24,
  palette = "mixed",
  z = 0,
}: Props) {
  const isMounted = useIsMounted();
  const { isDark } = useThemeContext();
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!isMounted) return;
    const handler = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [isMounted]);

  const shapes = useMemo(() => {
    if (!isMounted || viewport.w === 0) return [];
    const colors = (isDark ? darkPalettes : lightPalettes)[palette];
    return Array.from({ length: amount }, (_, i) => {
      const rnd = () => Math.random();
      const s = rnd() * (size[1] - size[0]) + size[0];
      return {
        key: i,
        color: colors[i % colors.length],
        width: s,
        height: s,
        startX: rnd() * viewport.w,
        startY: rnd() * viewport.h,
        mid1X: rnd() * viewport.w,
        mid1Y: rnd() * viewport.h,
        mid2X: rnd() * viewport.w,
        mid2Y: rnd() * viewport.h,
        endX: rnd() * viewport.w,
        endY: rnd() * viewport.h,
        dur: rnd() * 16 + 12,
        scale1: rnd() * 0.6 + 0.3,
        scale2: rnd() * 0.3 + 0.2,
      };
    });
  }, [isMounted, viewport, amount, size, palette, isDark]);

  if (!isMounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: z }}
    >
      {shapes.map((s) => (
        <motion.div
          key={s.key}
          className={`absolute bg-gradient-to-br ${s.color} rounded-full`}
          initial={{ x: s.startX, y: s.startY, scale: 0, opacity: 0, width: s.width, height: s.height }}
          animate={{
            x: [s.startX, s.mid1X, s.mid2X, s.endX],
            y: [s.startY, s.mid1Y, s.mid2Y, s.endY],
            scale: [0, s.scale1, s.scale2, 0],
            opacity: [0, 0.15, 0.05, 0],
            rotate: [0, 360, 180, 0],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ filter: `blur(${blur}px)` }}
        />
      ))}
    </div>
  );
}
