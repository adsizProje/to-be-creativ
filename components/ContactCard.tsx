"use client";

import { motion } from "framer-motion";

export default function ContactCard() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 max-w-2xl mx-auto"
    >
      <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
          İletişime Geçin
        </h2>
        <div className="space-y-6">
          {/* Email */}
          <motion.a
            href="mailto:info@tobecreativ.com"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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
              <p className="text-sm text-gray-400 mb-1">E-posta</p>
              <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
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
            className="flex items-center gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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
              <p className="text-sm text-gray-400 mb-1">Telefon</p>
              <p className="text-white font-medium group-hover:text-green-400 transition-colors">
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
            className="flex items-start gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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
              <p className="text-sm text-gray-400 mb-1">Adres</p>
              <p className="text-white leading-relaxed group-hover:text-purple-400 transition-colors">
                Dumlupınar Blv. ODTÜ Teknokent
                <br />
                Bilişim İnovasyon Merkezi 280/G No:1260
                <br />
                Çankaya, Ankara
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

