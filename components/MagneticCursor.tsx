"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function MagneticCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const colors = [
        "#a855f7", // purple
        "#ec4899", // pink
        "#06b6d4", // cyan
        "#3b82f6", // blue
        "#8b5cf6", // violet
        "#f59e0b", // amber
      ];

      // Create particles
      const newParticles: Particle[] = [];
      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / particleCount,
          velocity: 2 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Create ripple
      setClickRipples((prev) => [
        ...prev,
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);

      // Trigger click animation
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 1000);

      // Remove ripple after animation
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== Date.now()));
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Click Ripples */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-purple-400/50" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Ripples - Second Layer */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={`ripple2-${ripple.id}`}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-radial from-cyan-400/30 to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(particle.angle) * 100 * particle.velocity,
              y: Math.sin(particle.angle) * 100 * particle.velocity,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Outer cursor ring with glow */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 relative"
          style={{
            borderColor: isPointer ? "#a855f7" : "#ffffff",
            boxShadow: isPointer
              ? "0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.3)"
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
          animate={{
            scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
            rotate: isPointer ? 90 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Rotating gradient overlay */}
          {isPointer && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Inner cursor dot with pulse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full relative"
          style={{
            backgroundColor: isPointer ? "#a855f7" : "#ffffff",
            boxShadow: isPointer
              ? "0 0 10px rgba(168, 85, 247, 0.8)"
              : "0 0 5px rgba(255, 255, 255, 0.5)",
          }}
          animate={{
            scale: isPointer ? 0 : isClicking ? 2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Pulse effect on hover */}
          {isPointer && (
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998] rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 300 }}
      />
    </>
  );
}
