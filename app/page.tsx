"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Gallery from "@/components/Gallery";
import HeaderNav from "@/components/HeaderNav";
import HeroLogo from "@/components/HeroLogo";
import SecondaryLogo from "@/components/SecondaryLogo";
import AboutCard from "@/components/AboutCard";
import ContactCard from "@/components/ContactCard";
import BackgroundEffects from "@/components/BackgroundEffects";

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
    if (activeRightTab === "about") {
      return <AboutCard />;
    }

    if (activeRightTab === "contact") {
      return <ContactCard />;
    }

    if (activeLeftTab) {
      return <Gallery key={activeLeftTab} />;
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
        <div className="min-h-screen lg:h-[100dvh] bg-[#2a2a2a] text-white font-baloo relative flex flex-col">
          <BackgroundEffects showBackground={showBackground} />

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
