"use client";

import { useEffect, useRef } from "react";

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const characters = "01";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize / 3); // Much fewer columns

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -200;
    }

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(26, 26, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Create gradient for each character
        const gradient = ctx.createLinearGradient(
          i * fontSize * 3,
          drops[i] * fontSize,
          i * fontSize * 3,
          (drops[i] + 1) * fontSize
        );
        gradient.addColorStop(0, "rgba(100, 200, 255, 0.4)");
        gradient.addColorStop(1, "rgba(100, 200, 255, 0.05)");
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, i * fontSize * 3, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-30"
    />
  );
}
