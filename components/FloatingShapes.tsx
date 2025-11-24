"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "square" | "triangle";
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      for (let i = 0; i < 4; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 150 + 100,
          duration: Math.random() * 25 + 20,
          delay: Math.random() * 5,
          type: ["circle"][0] as Shape["type"], // Only circles for cleaner look
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-[0.05]"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full bg-white" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full bg-white rotate-45" />
          )}
          {shape.type === "triangle" && (
            <div
              className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[86px] border-b-white"
              style={{
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size * 0.86,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
