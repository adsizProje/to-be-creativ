"use client";

import { useEffect, useRef } from "react";

export default function LiquidBackground() {
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

    let animationId: number;
    let time = 0;
    const width = canvas.width;
    const height = canvas.height;

    // Metaball class
    class Metaball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 150 + 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }
    }

    const metaballs = Array.from({ length: 5 }, () => new Metaball());

    const draw = () => {
      ctx.fillStyle = "rgba(42, 42, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      metaballs.forEach((ball) => ball.update());

      // Create gradient blobs
      metaballs.forEach((ball, index) => {
        const gradient = ctx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.radius
        );

        const hue = (time + index * 60) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.08)`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.5;
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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
