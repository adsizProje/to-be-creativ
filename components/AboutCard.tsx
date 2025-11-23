"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/lib/content";

export default function AboutCard() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 max-w-6xl mx-auto"
    >
      <div className="relative p-[1px] rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-1"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 320deg, rgba(255,255,255,0.3) 340deg, rgba(255,255,255,0.8) 350deg, rgba(255,255,255,0.3) 360deg)",
          }}
        />
        <div className="relative bg-[#1a1a1a] rounded-2xl p-8 md:p-12 shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white"
          >
            Hakkımızda
          </motion.h2>
          <div className="space-y-4">
            {aboutContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-gray-200 leading-relaxed text-sm md:text-base text-center"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 pt-4 border-t border-gray-700 text-center"
          >
            <p className="text-xs md:text-sm text-gray-400 italic">
              &ldquo;Yaratıcılık, cesaret ve teknoloji ile geleceği şekillendiriyoruz.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

