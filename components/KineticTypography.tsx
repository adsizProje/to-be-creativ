"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function KineticTypography({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
      {displayText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-purple-300"
          style={{
            textShadow: "0 0 20px rgba(100, 200, 255, 0.3)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
