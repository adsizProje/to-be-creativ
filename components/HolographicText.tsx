"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HolographicTextProps {
  children: ReactNode;
  className?: string;
}

export default function HolographicText({ children, className = "" }: HolographicTextProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <motion.div
        className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        {children}
      </motion.div>

      {/* Glowing layers */}
      <motion.div
        className="absolute inset-0 blur-sm opacity-50"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          {children}
        </div>
      </motion.div>

      {/* RGB split effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          x: [0, 2, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="text-white/70 mix-blend-screen">{children}</div>
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          x: [0, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="text-gray-400 mix-blend-screen">{children}</div>
      </motion.div>

      {/* Scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
