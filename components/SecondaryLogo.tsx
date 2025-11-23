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
          className="relative z-10 w-full flex justify-center mb-2 flex-shrink-0 bottom-[5.25rem] lg:bottom-10"
        >
          <button
            onClick={onHomeClick}
            className="text-center hover:opacity-80 transition-opacity relative lg:z-10 z-50"
          >
            <Image
              src="/assets/logo_vek.png"
              alt="ToBe Logo"
              width={60}
              height={60}
              className="mx-auto mb-0.5"
              priority
            />
            <motion.p
              className="text-sm tracking-wide bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "200% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              we help brands to be
            </motion.p>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

