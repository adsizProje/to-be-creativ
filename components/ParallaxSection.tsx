"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity, scale }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Creative Excellence
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Where Innovation Meets Design
        </p>
      </motion.div>
    </div>
  );
}
