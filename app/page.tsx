"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Loader from "@/components/Loader";
import Gallery from "@/components/Gallery";
import TypingText from "@/components/TypingText";
import { aboutContent, contactContent } from "@/lib/content";

type LeftTab = "animation" | "graphic" | "ux/ui";
type RightTab = "about" | "contact" | "home";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("home");

  useEffect(() => {
    if (!isLoading) {
      // Background animation
      setTimeout(() => setShowBackground(true), 100);
      // Logo fade in
      setTimeout(() => setShowLogo(true), 800);
      // Nav fade in
      setTimeout(() => setShowNav(true), 1400);
    }
  }, [isLoading]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const leftTabs: LeftTab[] = ["animation", "graphic", "ux/ui"];
  const rightTabs: RightTab[] = ["about", "contact", "home"];

  const renderContent = () => {
    if (activeRightTab === "about") {
      return (
        <motion.div
          key="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-8 max-w-4xl mx-auto text-center space-y-6"
        >
          {aboutContent.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="text-gray-200 leading-relaxed text-base md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      );
    }

    if (activeRightTab === "contact") {
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Adres</p>
                  <p className="text-white leading-relaxed group-hover:text-purple-400 transition-colors">
                    Dumlupınar Blv. ODTÜ Teknokent<br />
                    Bilişim İnovasyon Merkezi 280/G No:1260<br />
                    Çankaya, Ankara
                  </p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      );
    }

    // Home - show gallery only if a left tab is selected
    if (activeLeftTab) {
      return <Gallery key={activeLeftTab} />;
    }

    // Default home view - just logo and text (no content)
    return null;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen lg:h-[100dvh] bg-[#2a2a2a] text-white font-baloo relative flex flex-col">
          {/* Background gradient animation */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={showBackground ? { x: "0%" } : { x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#3a3a3a] z-0"
          />

          {/* Logo - Large centered version (home page only) */}
          <AnimatePresence>
            {activeRightTab === "home" && !activeLeftTab && (
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
                    width={200}
                    height={200}
                    className="mx-auto mb-4"
                    priority
                  />
                  <p className="text-xl md:text-2xl text-gray-300 tracking-wide">
                    we help brands
                    <br />
                    to be
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header with Navigation */}
          <motion.header
            initial={{ opacity: 0 }}
            animate={showNav ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 flex items-center justify-between px-4 md:px-8 pt-4 flex-shrink-0"
          >
            {/* Left Navigation */}
            <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-semibold">
            {leftTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveLeftTab(tab);
                  setActiveRightTab("home");
                }}
                className={`transition-colors duration-300 hover:text-white ${
                  activeLeftTab === tab ? "text-white" : "text-gray-400"
                }`}
              >
                {tab}
                {index < leftTabs.length - 1 && (
                  <span className="hidden md:inline ml-6 text-gray-600">|</span>
                )}
              </button>
            ))}
            </nav>

            {/* Right Navigation */}
            <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-semibold">
            {rightTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveRightTab(tab);
                  if (tab === "home") {
                    setActiveLeftTab(null);
                  }
                }}
                className={`transition-colors duration-300 hover:text-white ${
                  activeRightTab === tab && (tab !== "home" || !activeLeftTab)
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                {tab}
                {index < rightTabs.length - 1 && (
                  <span className="hidden md:inline ml-6 text-gray-600">|</span>
                )}
              </button>
            ))}
            </nav>
          </motion.header>

          {/* Logo - Small top version (when content is shown) */}
          <AnimatePresence>
            {((activeRightTab === "home" && activeLeftTab) || activeRightTab === "about" || activeRightTab === "contact") && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full flex justify-center mb-2 flex-shrink-0 bottom-5"

              >
                <button                 
                onClick={() => {
                  setActiveRightTab("home");
                  setActiveLeftTab(null);
                }} 
                className="text-center hover:opacity-80 transition-opacity">
                  <Image
                    src="/assets/logo_vek.png"
                    alt="ToBe Logo"
                    width={60}
                    height={60}
                    className="mx-auto mb-0.5"
                    priority
                  />
                  <p className="text-xs text-gray-200 tracking-wide">
                    we help brands to be
                  </p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="relative z-10 flex-1 overflow-y-auto pb-8 lg:mt-8">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}

