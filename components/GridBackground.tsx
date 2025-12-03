"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let rotation = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Perspective effect
      const gridSize = 40;
      const gridCount = 20;

      // Draw grid - more subtle
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let i = -gridCount; i <= gridCount; i += 2) {
        const y = i * gridSize;
        const perspective = 1 - Math.abs(i) / gridCount;
        const alpha = perspective * 0.08;

        ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(-gridCount * gridSize, y);
        ctx.lineTo(gridCount * gridSize, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = -gridCount; i <= gridCount; i += 2) {
        const x = i * gridSize;
        const perspective = 1 - Math.abs(i) / gridCount;
        const alpha = perspective * 0.08;

        ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, -gridCount * gridSize);
        ctx.lineTo(x, gridCount * gridSize);
        ctx.stroke();
      }

      // Fewer glow points at intersections
      for (let i = -gridCount; i <= gridCount; i += 6) {
        for (let j = -gridCount; j <= gridCount; j += 6) {
          const x = i * gridSize;
          const y = j * gridSize;
          const distance = Math.sqrt(x * x + y * y);
          const maxDistance = gridCount * gridSize;
          const alpha = 1 - distance / maxDistance;

          if (alpha > 0.3) {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
            gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.3})`);
            gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();

      rotation += 0.0005;
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
      className="fixed inset-0 pointer-events-none z-[2] opacity-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
