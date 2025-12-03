"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlitchTransitionProps {
  children: ReactNode;
  trigger?: boolean;
}

export default function GlitchTransition({ children, trigger = true }: GlitchTransitionProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchVariants = {
    initial: { opacity: 1, x: 0, y: 0 },
    glitch1: {
      opacity: [1, 0.8, 1, 0.9, 1],
      x: [0, -5, 5, -3, 0],
      y: [0, 2, -2, 1, 0],
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(90deg)",
        "hue-rotate(180deg)",
        "hue-rotate(270deg)",
        "hue-rotate(360deg)",
      ],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={glitchVariants}
      initial="initial"
      animate={trigger && isGlitching ? "glitch1" : "initial"}
      onAnimationComplete={() => setIsGlitching(false)}
      className="relative"
    >
      {children}

      {/* RGB split layers for glitch effect */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
            style={{ color: "red" }}
            animate={{
              x: [0, -3, 3, -2, 0],
              opacity: [0.7, 0.5, 0.8, 0.6, 0],
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>

          <motion.div
            className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
            style={{ color: "cyan" }}
            animate={{
              x: [0, 3, -3, 2, 0],
              opacity: [0.7, 0.8, 0.5, 0.6, 0],
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
