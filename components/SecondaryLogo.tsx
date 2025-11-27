"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HolographicText from "./HolographicText";

interface SecondaryLogoProps {
  show: boolean;
  onHomeClick: () => void;
}

export default function SecondaryLogo({ show, onHomeClick }: SecondaryLogoProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full flex justify-center mt-8 mb-4"
        >
          <motion.button
            onClick={onHomeClick}
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.95 }}
            className="text-center cursor-pointer relative lg:z-10 z-50"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/assets/logo_vek.png"
                alt="ToBe Logo"
                width={100}
                height={100}
                className="mx-auto mb-1"
                priority
              />
            </motion.div>
            <div className="text-base tracking-wide">
              <HolographicText>we help brands to be</HolographicText>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

