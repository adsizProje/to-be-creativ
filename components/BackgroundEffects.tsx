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
        raysColor="#eae1e1"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays !fixed inset-0"
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={showBackground ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-[#252525] via-[#232323] to-[#373737] z-0"
      />
    </>
  );
}

