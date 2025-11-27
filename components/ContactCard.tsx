"use client";

import { motion } from "framer-motion";
import HolographicText from "./HolographicText";
import GlassmorphicCard from "./GlassmorphicCard";

export default function ContactCard() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-2 md:p-4 w-full h-full max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full items-stretch">
        {/* Contact Info Card */}
        <GlassmorphicCard className="h-full flex flex-col">
          <div className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <HolographicText>İletişime Geçin</HolographicText>
          </div>
          <div className="space-y-5">
            {/* Email */}
            <motion.a
              href="mailto:info@tobecreativ.com"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}

              className="flex items-center gap-5 p-4 min-h-[80px] md:min-h-[90px] rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group cursor-pointer"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base text-gray-400">E-posta</p>
                <p className="text-lg text-white font-medium group-hover:text-blue-400 transition-colors">
                  info@tobecreativ.com
                </p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+905333060473"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}

              className="flex items-center gap-5 p-4 min-h-[80px] md:min-h-[90px] rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-green-400/50 transition-all duration-300 group cursor-pointer"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base text-gray-400">Telefon</p>
                <p className="text-lg text-white font-medium group-hover:text-green-400 transition-colors">
                  0 533 30 60 473
                </p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.a
              href="https://maps.app.goo.gl/jPgm5yMJ54Z4oRP39"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}

              className="flex items-start gap-5 p-4 min-h-[80px] md:min-h-[90px] rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-base text-gray-400">Adres</p>
                <p className="text-lg text-white leading-relaxed group-hover:text-purple-400 transition-colors">
                  Dumlupınar Blv. ODTÜ Teknokent
                  <br />
                  Bilişim İnovasyon Merkezi 280/G No:1260
                  <br />
                  Çankaya, Ankara
                </p>
              </div>
            </motion.a>
          </div>
        </GlassmorphicCard>

        {/* Map Card */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-3 overflow-hidden h-full"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.8175724935887!2d32.78579407643204!3d39.90076697152794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d6d8b9e5d5%3A0x39c58c4944a1ab5e!2sODT%C3%9C%20Teknokent!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

