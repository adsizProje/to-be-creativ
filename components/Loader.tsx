"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Same background as main page */}
      <Image
        src="/assets/background_new.jpeg"
        alt="Background"
        fill
        priority
        className="object-cover"
        quality={90}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing rings around logo */}
        <div className="relative mb-12">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 -m-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full border-2 border-purple-500/30" />
          </motion.div>

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-0 -m-6"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl" />
          </motion.div>

          {/* Inner counter-rotating ring */}
          <motion.div
            className="absolute inset-0 -m-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full border border-cyan-400/40" />
          </motion.div>

          {/* Logo with multiple effects */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Glow effect behind logo */}
            <motion.div
              className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-purple-600/30 via-cyan-500/30 to-pink-500/30 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main logo */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
                  "drop-shadow(0 0 40px rgba(6, 182, 212, 0.6))",
                  "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))",
                  "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/assets/logo_white.png"
                alt="ToBe Logo"
                width={250}
                height={250}
                priority
                className="relative z-10"
              />
            </motion.div>

            {/* Sparkle particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i * Math.PI * 2) / 6) * 80],
                  y: [0, Math.sin((i * Math.PI * 2) / 6) * 80],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="text-center">
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-4 text-white/60 text-sm tracking-wider"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading... {progress}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

