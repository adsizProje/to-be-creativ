"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutContent } from "@/lib/content";

export default function AboutCard() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full max-w-6xl mx-auto p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#310f4d] via-[#2a2961] to-[#0f3a5d] rounded-[24px] blur-3xl opacity-60 pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 h-full items-center rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-5 md:px-8 md:py-6 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-6 w-44 h-44 bg-fuchsia-500/20 blur-[90px]" />
          <div className="absolute top-20 -right-10 w-64 h-64 bg-cyan-500/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-purple-500/30 blur-[120px]" />
        </div>

        {/* Left: Text content */}
        <div className="relative h-full flex flex-col justify-center text-center md:text-left space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wide"
          >
            Hakkımızda
          </motion.h2>
          <div className="space-y-1.5 max-w-3xl mx-auto md:mx-0 leading-relaxed text-white/90">
            {aboutContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="text-sm md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xs text-white/70 italic md:text-left text-center"
          >
            &ldquo;Yaratıcılık, cesaret ve teknoloji ile geleceği şekillendiriyoruz.&rdquo;
          </motion.div>
        </div>

        {/* Right: Visual panel with Gemini render */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[220px] md:h-[320px] lg:h-[380px] rounded-[20px] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.85)]"
        >
          <Image
            src="/assets/gemini.jpg"
            alt="VOLINOR savunma projelerinde kullanılan Gemini tasarımı"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 90vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#030712]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-full px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
            Gemini
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

