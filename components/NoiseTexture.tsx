"use client";

import { useEffect, useRef } from "react";

export default function NoiseTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Generate noise
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 25;    // A (low opacity)
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        backgroundImage: `url(${canvasRef.current?.toDataURL()})`,
        backgroundRepeat: "repeat",
        opacity: 0.03,
        mixBlendMode: "overlay",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
