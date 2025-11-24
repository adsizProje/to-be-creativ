"use client";

import { useEffect, useState, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  id: number;
}

export default function NeonTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailCounter = useRef(0);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 30) {
        // Throttle to every 30ms
        lastTime = now;
        
        setTrails((prev) => {
          const newTrails = [
            ...prev,
            { x: e.clientX, y: e.clientY, id: trailCounter.current++ },
          ].slice(-20); // Keep only last 20 trails
          return newTrails;
        });
      }
    };

    const animate = () => {
      setTrails((prev) => {
        if (prev.length > 0) {
          return prev.slice(1); // Remove oldest trail
        }
        return prev;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <svg
      className="fixed inset-0 pointer-events-none z-[9997]"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffff00" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {trails.length > 1 && (
        <path
          d={trails.reduce((path, point, index) => {
            if (index === 0) return `M ${point.x} ${point.y}`;
            return `${path} L ${point.x} ${point.y}`;
          }, "")}
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          opacity={0.7}
        />
      )}
    </svg>
  );
}
