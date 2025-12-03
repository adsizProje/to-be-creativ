"use client";

import { useEffect, useRef } from "react";

export default function ModernGradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let time = 0;

    // Gradient orbs
    class GradientOrb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      hue: number;
      speed: number;

      constructor(x: number, y: number, radius: number, hue: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.hue = hue;
        this.speed = 0.0005 + Math.random() * 0.001;
      }

      update(time: number) {
        this.x = this.baseX + Math.sin(time * this.speed) * 100;
        this.y = this.baseY + Math.cos(time * this.speed * 0.8) * 80;
      }
    }

    const orbs = [
      new GradientOrb(canvas.width * 0.2, canvas.height * 0.3, 400, 280), // Purple
      new GradientOrb(canvas.width * 0.8, canvas.height * 0.4, 450, 180), // Cyan
      new GradientOrb(canvas.width * 0.5, canvas.height * 0.7, 380, 320), // Pink
      new GradientOrb(canvas.width * 0.3, canvas.height * 0.8, 350, 200), // Blue
      new GradientOrb(canvas.width * 0.7, canvas.height * 0.2, 420, 340), // Magenta
    ];

    const draw = () => {
      // Dark base
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbs.forEach((orb) => {
        orb.update(time);

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );

        gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 60%, 0.25)`);
        gradient.addColorStop(0.3, `hsla(${orb.hue}, 70%, 50%, 0.15)`);
        gradient.addColorStop(0.6, `hsla(${orb.hue}, 60%, 40%, 0.08)`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 50%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle noise overlay
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.sin(time * 0.001) * 0.01})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      time++;
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
      className="fixed inset-0 z-0"
      style={{ filter: "blur(60px)" }}
    />
  );
}
