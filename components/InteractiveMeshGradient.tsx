"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseClicked, setMouseClicked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Gradient points that will move
    const gradientPoints = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, color: "rgba(147, 51, 234, 0.5)", baseOpacity: 0.5 }, // Purple
      { x: 0.8, y: 0.2, vx: -0.0002, vy: 0.0003, color: "rgba(59, 130, 246, 0.5)", baseOpacity: 0.5 }, // Blue
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0003, color: "rgba(6, 182, 212, 0.5)", baseOpacity: 0.5 }, // Cyan
      { x: 0.1, y: 0.8, vx: 0.0003, vy: -0.0002, color: "rgba(236, 72, 153, 0.4)", baseOpacity: 0.4 }, // Pink
      { x: 0.9, y: 0.9, vx: -0.0003, vy: 0.0002, color: "rgba(168, 85, 247, 0.4)", baseOpacity: 0.4 }, // Purple-2
      { x: 0.6, y: 0.4, vx: 0.0002, vy: 0.0003, color: "rgba(245, 158, 11, 0.3)", baseOpacity: 0.3 }, // Amber
    ];

    // Floating orbs for aurora effect
    const floatingOrbs = [
      { x: 0.3, y: 0.5, vx: 0.0001, vy: 0.00015, radius: 150, color: "rgba(139, 92, 246, 0.15)" },
      { x: 0.7, y: 0.6, vx: -0.00012, vy: 0.0001, radius: 180, color: "rgba(6, 182, 212, 0.12)" },
      { x: 0.5, y: 0.3, vx: 0.00015, vy: -0.0001, radius: 120, color: "rgba(236, 72, 153, 0.18)" },
    ];

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let time = 0;
    let clickWaveIntensity = 0;
    let clickX = 0.5;
    let clickY = 0.5;

    // Mouse move handler with lighting effect
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;
    };

    // Click handler for wave effect
    const handleClick = (e: MouseEvent) => {
      clickX = e.clientX / window.innerWidth;
      clickY = e.clientY / window.innerHeight;
      clickWaveIntensity = 1;
      setMouseClicked(true);
      setTimeout(() => setMouseClicked(false), 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      time += 0.01;

      // Clear with base color
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      // Decay click wave intensity
      if (clickWaveIntensity > 0) {
        clickWaveIntensity -= 0.02;
      }

      // Update floating orbs (aurora effect)
      floatingOrbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(time + orb.x * 10) * 0.0001;
        orb.y += orb.vy + Math.cos(time + orb.y * 10) * 0.0001;

        if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
        if (orb.y < 0 || orb.y > 1) orb.vy *= -1;

        orb.x = Math.max(0, Math.min(1, orb.x));
        orb.y = Math.max(0, Math.min(1, orb.y));

        // Draw floating orb with pulsing
        const pulse = Math.sin(time * 2 + orb.x * 20) * 0.3 + 1;
        const orbGradient = ctx.createRadialGradient(
          orb.x * width,
          orb.y * height,
          0,
          orb.x * width,
          orb.y * height,
          orb.radius * pulse
        );

        orbGradient.addColorStop(0, orb.color);
        orbGradient.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/g, "0.05)"));
        orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = orbGradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Update gradient points positions
      gradientPoints.forEach((point, index) => {
        // Autonomous movement with wave pattern
        const wave = Math.sin(time * 2 + index) * 0.0002;
        point.x += point.vx + wave;
        point.y += point.vy + Math.cos(time * 2 + index) * 0.0002;

        // Bounce off edges
        if (point.x < 0 || point.x > 1) point.vx *= -1;
        if (point.y < 0 || point.y > 1) point.vy *= -1;

        // Keep within bounds
        point.x = Math.max(0, Math.min(1, point.x));
        point.y = Math.max(0, Math.min(1, point.y));

        // Mouse attraction
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 0.4) {
          const force = (0.4 - distance) * 0.002;
          point.x += dx * force;
          point.y += dy * force;
        }
      });

      // Draw main gradient points with enhanced colors
      gradientPoints.forEach((point, index) => {
        const pulse = Math.sin(time + index * 0.5) * 0.1 + 1;
        const gradient = ctx.createRadialGradient(
          point.x * width,
          point.y * height,
          0,
          point.x * width,
          point.y * height,
          width * 0.5 * pulse
        );

        gradient.addColorStop(0, point.color);
        gradient.addColorStop(0.3, point.color.replace(/[\d.]+\)$/g, `${point.baseOpacity * 0.5})`));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Enhanced mouse spotlight effect
      const spotlightSize = 0.3 + Math.sin(time * 3) * 0.05;
      const mouseGradient = ctx.createRadialGradient(
        mouseX * width,
        mouseY * height,
        0,
        mouseX * width,
        mouseY * height,
        width * spotlightSize
      );

      mouseGradient.addColorStop(0, "rgba(200, 150, 255, 0.25)");
      mouseGradient.addColorStop(0.3, "rgba(100, 200, 255, 0.15)");
      mouseGradient.addColorStop(0.6, "rgba(59, 130, 246, 0.08)");
      mouseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);

      // Click wave effect (expanding light ring)
      if (clickWaveIntensity > 0) {
        const waveProgress = 1 - clickWaveIntensity;
        const waveRadius = width * waveProgress * 0.8;
        const waveGradient = ctx.createRadialGradient(
          clickX * width,
          clickY * height,
          waveRadius - 50,
          clickX * width,
          clickY * height,
          waveRadius
        );

        const alpha = clickWaveIntensity * 0.5;
        waveGradient.addColorStop(0, `rgba(168, 85, 247, 0)`);
        waveGradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha})`);
        waveGradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Scanline effect (subtle horizontal moving light)
      const scanY = ((time * 0.1) % 1) * height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      scanGradient.addColorStop(0, "rgba(100, 200, 255, 0)");
      scanGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.03)");
      scanGradient.addColorStop(1, "rgba(100, 200, 255, 0)");

      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, 0, width, height);

      // Apply blur effect
      ctx.filter = "blur(90px)";
      
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d", { alpha: false });
      
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#0a0a0f";
        ctx.fillRect(0, 0, width, height);
        ctx.filter = "blur(100px) saturate(1.2) brightness(1.1)";
        ctx.globalAlpha = 0.95;
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.globalAlpha = 1;
        ctx.filter = "none";
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a0f2e 50%, #0f1419 100%)",
      }}
    />
  );
}
