"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/lib/content";
import HolographicText from "./HolographicText";
import GlassmorphicCard from "./GlassmorphicCard";

export default function AboutCard() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 md:p-8 max-w-6xl mx-auto"
    >
      <GlassmorphicCard className="group">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            <HolographicText>Hakkımızda</HolographicText>
          </motion.div>
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
      </GlassmorphicCard>
    </motion.div>
  );
}

