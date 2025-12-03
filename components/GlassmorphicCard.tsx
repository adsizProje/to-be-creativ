"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GlassmorphicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden ${className}`}
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 200, 255, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
