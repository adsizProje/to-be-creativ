"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = Array(6).fill("/assets/example1.jpg");

export default function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 lg:gap-8 px-4 md:px-3 max-w-6xl mx-auto"
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

