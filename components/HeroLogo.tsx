"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import KineticTypography from "./KineticTypography";

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
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            >
              <Image
                src="/assets/logo_vek.png"
                alt="ToBe Logo"
                width={250}
                height={250}
                className="mx-auto mb-4"
                priority
              />
            </motion.div>
            <motion.div 
              className="flex flex-col items-center justify-center mt-6 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="text-3xl md:text-5xl lg:text-6xl">
                <KineticTypography text="we help brands" />
              </div>
              <div className="text-3xl md:text-5xl lg:text-6xl">
                <KineticTypography text="to be creative" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

