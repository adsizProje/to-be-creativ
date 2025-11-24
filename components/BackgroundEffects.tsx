"use client";

import { motion } from "framer-motion";
import LightRays from "./LightRays";

interface BackgroundEffectsProps {
  showBackground: boolean;
}

export default function BackgroundEffects({ showBackground }: BackgroundEffectsProps) {
  return (
    <>
      <LightRays
        raysOrigin="top-center"
        raysColor="#64c8ff"
        raysSpeed={1.5}
        lightSpread={0.4}
        rayLength={0.8}
        followMouse={true}
        mouseInfluence={0.05}
        noiseAmount={0.05}
        distortion={0.02}
        className="custom-rays !fixed inset-0 opacity-15"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={showBackground ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.015) 0%, transparent 60%)",
        }}
      />
    </>
  );
}

