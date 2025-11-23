"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShinyText from "./ShinyText";

interface HeroLogoProps {
  show: boolean;
  showLogo: boolean;
}

export default function HeroLogo({ show, showLogo }: HeroLogoProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
        >
          <div className="text-center">
            <Image
              src="/assets/logo_vek.png"
              alt="ToBe Logo"
              width={250}
              height={250}
              className="mx-auto mb-4"
              priority
            />
            <div className="flex flex-col items-center justify-center mt-2">
              <ShinyText
                text="we help brands"
                disabled={false as any}
                speed={3}
                className="custom-class text-4xl md:text-5xl tracking-wide"
              />
              <ShinyText
                text="to be"
                disabled={false as any}
                speed={3}
                className="custom-class text-4xl md:text-5xl tracking-wide"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

