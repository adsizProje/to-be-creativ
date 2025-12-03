"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function BentoCard({ children, className = "", size = "medium" }: BentoCardProps) {
  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-2 md:row-span-1",
    large: "md:col-span-2 md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 overflow-hidden ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.08) 0%, transparent 70%)",
        }}
      />
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
