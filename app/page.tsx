"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

type LeftTab = "animation" | "graphic" | "ux/ui";
type RightTab = "about" | "contact" | "home";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("home");
  const [effectsEnabled, setEffectsEnabled] = useState(true);

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

  const leftTabs: LeftTab[] = ["animation", "graphic", "ux/ui"];
  const rightTabs: RightTab[] = ["about", "contact", "home"];

  const handleLeftTabClick = (tab: LeftTab) => {
    setActiveLeftTab(tab);
    setActiveRightTab("home");
  };

  const handleRightTabClick = (tab: RightTab) => {
    setActiveRightTab(tab);
    if (tab === "home") {
      setActiveLeftTab(null);
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

    if (activeLeftTab === "ux/ui") {
      return (
        <motion.div
          key="ux-ui"
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
        <div className="min-h-screen lg:h-[100dvh] bg-[#0a0a0f] text-white font-baloo relative flex flex-col">
          {/* Base Background Layer - Ultra Premium Interactive Mesh */}
          <InteractiveMeshGradient />
          <NoiseTexture />
          
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

          <HeroLogo show={showHeroLogo} showLogo={showLogo} />

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

          <div className="relative z-10 flex-1 overflow-y-auto pb-8 lg:mt-4">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
