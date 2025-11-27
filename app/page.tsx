"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Loader from "@/components/Loader";
import UxUiGallery from "@/components/UxUiGallery";
import GraphicGallery from "@/components/GraphicGallery";
import AnimationGallery from "@/components/AnimationGallery";
import HeaderNav from "@/components/HeaderNav";
import HeroLogo from "@/components/HeroLogo";
import SecondaryLogo from "@/components/SecondaryLogo";
import AboutCard from "@/components/AboutCard";
import ContactCard from "@/components/ContactCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticCursor from "@/components/MagneticCursor";
import InteractiveMeshGradient from "@/components/InteractiveMeshGradient";
import NoiseTexture from "@/components/NoiseTexture";
import Image from "next/image";

type LeftTab = "animation" | "graphic" | "savunma";
type RightTab = "about" | "contact" | "home";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("home");
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 400], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 400], [0, -350]);
  const logoOpacity = useTransform(scrollY, [350, 400], [1, 0]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowBackground(true), 100);
      setTimeout(() => setShowLogo(true), 800);
      setTimeout(() => setShowNav(true), 1400);
    }
  }, [isLoading]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const leftTabs: LeftTab[] = ["animation", "graphic", "savunma"];
  const rightTabs: RightTab[] = ["about", "contact", "home"];

  const handleLeftTabClick = (tab: LeftTab) => {
    setActiveLeftTab(tab);
    setActiveRightTab("home");
    // Scroll to section
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRightTabClick = (tab: RightTab) => {
    setActiveRightTab(tab);
    if (tab === "home") {
      setActiveLeftTab(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    setActiveRightTab("home");
    setActiveLeftTab(null);
  };

  const renderContent = () => {
    const variants = {
      initial: { opacity: 0, y: 20, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -20, filter: "blur(10px)" },
    };

    const transition = {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    };

    if (activeRightTab === "about") {
      return (
        <motion.div
          key="about"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <AboutCard />
        </motion.div>
      );
    }

    if (activeRightTab === "contact") {
      return (
        <motion.div
          key="contact"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <ContactCard />
        </motion.div>
      );
    }

    if (activeLeftTab === "savunma") {
      return (
        <motion.div
          key="savunma"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <UxUiGallery />
        </motion.div>
      );
    }

    if (activeLeftTab === "graphic") {
      return (
        <motion.div
          key="graphic"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <GraphicGallery />
        </motion.div>
      );
    }

    if (activeLeftTab === "animation") {
      return (
        <motion.div
          key="animation"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <AnimationGallery />
        </motion.div>
      );
    }

    return null;
  };

  const showHeroLogo = activeRightTab === "home" && !activeLeftTab;
  const showSecondaryLogo =
    (activeRightTab === "home" && !!activeLeftTab) ||
    activeRightTab === "about" ||
    activeRightTab === "contact";

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-baloo relative">
          {/* Base Background Layer - Ultra Premium Interactive Mesh */}
          <div className="fixed inset-0 z-0">
            <InteractiveMeshGradient />
            <NoiseTexture />
          </div>

          {/* Minimalist Effects Layer */}
          {effectsEnabled && <MagneticCursor />}

          {/* Subtle Background Accent */}
          <BackgroundEffects showBackground={showBackground} />

          {/* Effects Toggle Button */}
          <motion.button
            onClick={() => setEffectsEnabled(!effectsEnabled)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="relative bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-lg transition-all duration-300 group-hover:border-white/30">
              <div className="flex items-center gap-2">
                <span className="text-xl">{effectsEnabled ? "🎨" : "✨"}</span>
                <span className="text-sm font-medium text-white/90 group-hover:text-white">
                  {effectsEnabled ? "Efektleri Kapat" : "Efektleri Aç"}
                </span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.button>

          <HeaderNav
            showNav={showNav}
            leftTabs={leftTabs}
            rightTabs={rightTabs}
            activeLeftTab={activeLeftTab}
            activeRightTab={activeRightTab}
            onLeftTabClick={handleLeftTabClick}
            onRightTabClick={handleRightTabClick}
          />

          <SecondaryLogo show={showSecondaryLogo} onHomeClick={handleHomeClick} />

          {/* Scrollable Content */}
          <div className="relative z-10">
            {/* Hero Section with Logo */}
            {showHeroLogo && (
              <section className="h-screen flex items-center justify-center">
                <motion.div
                  style={{
                    scale: logoScale,
                    y: logoY,
                    opacity: logoOpacity,
                  }}
                  className="flex flex-col items-center pointer-events-none"
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  >
                    <Image
                      src="/assets/logo_vek.png"
                      alt="ToBe Logo"
                      width={250}
                      height={250}
                      priority
                      className="mb-8"
                    />
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-white text-center">
                      we help brands
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white text-center">
                      to be creative
                    </div>
                  </motion.div>
                </motion.div>
              </section>
            )}

            {/* About Section */}
            {activeRightTab === "about" && (
              <section className="h-[calc(100vh-250px)] min-h-[500px] px-4 flex items-center justify-center overflow-hidden">
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AboutCard />
                </motion.div>
              </section>
            )}

            {/* Contact Section */}
            {activeRightTab === "contact" && (
              <section className="h-[calc(100vh-250px)] min-h-[500px] px-4 flex items-center justify-center overflow-hidden">
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ContactCard />
                </motion.div>
              </section>
            )}

            {/* Gallery Sections - Only show when on home */}
            {activeRightTab === "home" && (
              <>
                {/* Animation Section */}
                <section id="animation" className="min-h-screen py-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
                      Animation
                    </h2>
                    <AnimationGallery />
                  </motion.div>
                </section>

                {/* Savunma Section */}
                <section id="savunma" className="min-h-screen py-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
                      Savunma
                    </h2>
                    <UxUiGallery />
                  </motion.div>
                </section>

                {/* Graphic Section */}
                <section id="graphic" className="min-h-screen py-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
                      Graphic Design
                    </h2>
                    <GraphicGallery />
                  </motion.div>
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
