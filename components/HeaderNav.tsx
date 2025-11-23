"use client";

import { motion } from "framer-motion";

type LeftTab = "animation" | "graphic" | "ux/ui";
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
      className="relative z-20 flex items-center justify-between px-4 lg:px-16 lg:pt-14 pt-4 flex-shrink-0"
    >
      {/* Left Navigation */}
      <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-semibold">
        {leftTabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => onLeftTabClick(tab)}
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
            onClick={() => onRightTabClick(tab)}
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
  );
}

