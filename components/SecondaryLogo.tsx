"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
          className="fixed top-3 lg:top-4 left-1/2 -translate-x-1/2 z-40 flex justify-center"
        >
          <motion.button
            onClick={onHomeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Image
              src="/assets/logo_vek.png"
              alt="ToBe Logo"
              width={50}
              height={50}
              priority
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

