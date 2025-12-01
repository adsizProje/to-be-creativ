"use client";

import { useState, useEffect, useRef } from "react";
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
import MagneticCursor from "@/components/MagneticCursor";
import ShinyText from "@/components/ShinyText";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrollingToSection, setIsScrollingToSection] = useState(false);

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

  // Desktop check for cursor effects
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Mouse tracking for spotlight effect
  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  // Scroll observer for auto-selecting menu items
  useEffect(() => {
    if (isLoading || activeRightTab !== "home") return;

    let ticking = false;

    const handleScroll = () => {
      // Skip observer while programmatic scrolling is happening
      if (ticking || isScrollingToSection) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // If at top, no section selected
        if (scrollY < 300) {
          setActiveLeftTab((prev) => prev !== null ? null : prev);
          ticking = false;
          return;
        }

        // Check which section is in view (order matches page layout)
        const sections: LeftTab[] = ["animation", "graphic", "savunma"];
        const viewportMiddle = scrollY + window.innerHeight / 3;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionTop = scrollY + rect.top;
            const sectionBottom = sectionTop + rect.height;

            if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
              setActiveLeftTab((prev) => prev !== sectionId ? sectionId : prev);
              break;
            }
          }
        }
        
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, activeRightTab, isScrollingToSection]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const leftTabs: LeftTab[] = ["animation", "graphic", "savunma"];
  const rightTabs: RightTab[] = ["about", "contact", "home"];

  const handleLeftTabClick = (tab: LeftTab) => {
    // Disable observer during programmatic scroll
    setIsScrollingToSection(true);
    
    // First ensure we're on home to show gallery sections
    setActiveRightTab("home");
    setActiveLeftTab(tab);
    
    // Wait for React to render the sections, then scroll
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(tab);
        if (element) {
          // Animation is the first section, needs less offset
          const headerOffset = tab === "animation" ? 20 : 60;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Re-enable observer after scroll completes
          setTimeout(() => {
            setIsScrollingToSection(false);
          }, 800);
        } else {
          setIsScrollingToSection(false);
        }
      }, 50);
    });
  };

  const handleRightTabClick = (tab: RightTab) => {
    setActiveRightTab(tab);
    // About veya Contact seçildiğinde sol menü aktifliğini kaldır
    if (tab === "about" || tab === "contact") {
      setActiveLeftTab(null);
    }
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

  // Hero logo sadece home'da ve scroll en yukarıdayken görünür
  // SecondaryLogo about/contact'ta veya home'da scroll yapıldığında görünür
  const showSecondaryLogo = activeRightTab === "about" || activeRightTab === "contact";
  const showHeroLogo = activeRightTab === "home";

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-baloo relative max-w-[1920px] mx-auto">
          {/* Base Background Layer - Fixed Background Image */}
          <div className="fixed inset-0 z-0">
            <Image
              src="/assets/background_new.jpeg"
              alt="Background"
              fill
              priority
              className="object-cover"
              quality={90}
            />
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Mouse Spotlight Effect - Only on Desktop */}
          {isDesktop && (
            <div
              className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(200, 150, 255, 0.15), transparent 40%)`,
              }}
            />
          )}

          {/* Minimalist Effects Layer - Only on Desktop (1200px+) */}
          {isDesktop && <MagneticCursor />}

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
              <section className="h-screen pt-20 flex items-center justify-center">
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
                    className="flex flex-col items-center justify-center space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <ShinyText 
                      text="we help brands" 
                      speed={3} 
                      className="text-2xl md:text-4xl font-bold text-center"
                    />
                    <ShinyText 
                      text="to be creative" 
                      speed={3} 
                      className="text-2xl md:text-4xl font-bold text-center"
                    />
                  </motion.div>
                </motion.div>
              </section>
            )}

            {/* About Section */}
            {activeRightTab === "about" && (
              <section className="min-h-screen xl:h-dvh px-4 lg:px-8 pt-16 lg:pt-14 pb-4 flex items-center justify-center xl:overflow-hidden">
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-5xl"
                >
                  <AboutCard />
                </motion.div>
              </section>
            )}

            {/* Contact Section */}
            {activeRightTab === "contact" && (
              <section className="min-h-screen xl:h-dvh px-4 lg:px-8 pt-16 lg:pt-14 pb-4 flex items-center justify-center xl:overflow-hidden">
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-5xl"
                >
                  <ContactCard />
                </motion.div>
              </section>
            )}

            {/* Gallery Sections - Only show when on home */}
            {activeRightTab === "home" && (
              <div className="pt-4">
                {/* Animation Section */}
                <section id="animation" className="min-h-screen pt-20 pb-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-white">
                      Animation
                    </h2>
                    <AnimationGallery />
                  </motion.div>
                </section>

                {/* Graphic Section */}
                <section id="graphic" className="min-h-screen pt-16 pb-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-white">
                      Graphic Design
                    </h2>
                    <GraphicGallery />
                  </motion.div>
                </section>

                {/* Savunma Section */}
                <section id="savunma" className="min-h-screen pt-16 pb-20 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-white">
                      Savunma
                    </h2>
                    <UxUiGallery />
                  </motion.div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
