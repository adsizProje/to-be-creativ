"use client";

import { motion } from "framer-motion";

type LeftTab = "animation" | "graphic" | "savunma";
type RightTab = "about" | "contact" | "home";

interface HeaderNavProps {
  showNav: boolean;
  leftTabs: LeftTab[];
  rightTabs: RightTab[];
  activeLeftTab: LeftTab | null;
  activeRightTab: RightTab;
  onLeftTabClick: (tab: LeftTab) => void;
  onRightTabClick: (tab: RightTab) => void;
}

export default function HeaderNav({
  showNav,
  leftTabs,
  rightTabs,
  activeLeftTab,
  activeRightTab,
  onLeftTabClick,
  onRightTabClick,
}: HeaderNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={showNav ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-16 pt-4 lg:pt-8 pb-4 bg-gradient-to-b from-black/50 to-transparent"
    >
      {/* Left Navigation */}
      <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 text-xl md:text-2xl font-semibold">
        {leftTabs.map((tab, index) => (
          <div key={tab} className="flex items-center">
            <motion.button
              onClick={() => onLeftTabClick(tab)}
              className={`relative cursor-pointer transition-colors duration-300 px-4 py-1.5 ${
                tab === "savunma" ? "text-yellow-400" : "text-white"
              }`}
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {tab}
              </span>
              {activeLeftTab === tab && (
                <motion.div
                  layoutId="leftActiveTab"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            {index < leftTabs.length - 1 && (
              <span className="hidden md:inline text-gray-600 mx-2">|</span>
            )}
          </div>
        ))}
      </nav>

      {/* Right Navigation */}
      <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 text-xl md:text-2xl font-semibold">
        {rightTabs.map((tab, index) => (
          <div key={tab} className="flex items-center">
            <motion.button
              onClick={() => onRightTabClick(tab)}
              className="relative cursor-pointer transition-colors duration-300 text-white px-4 py-1.5"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {tab}
              </span>
              {activeRightTab === tab && (tab !== "home" || !activeLeftTab) && (
                <motion.div
                  layoutId="rightActiveTab"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            {index < rightTabs.length - 1 && (
              <span className="hidden md:inline text-gray-600 mx-2">|</span>
            )}
          </div>
        ))}
      </nav>
    </motion.header>
  );
}

