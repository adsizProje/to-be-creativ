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
      className="relative z-20 flex items-center justify-between px-4 lg:px-16 lg:pt-14 pt-4 flex-shrink-0"
    >
      {/* Left Navigation */}
      <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-xl md:text-2xl font-semibold">
        {leftTabs.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => onLeftTabClick(tab)}
            className={`relative cursor-pointer transition-colors duration-300 ${
              tab === "savunma" ? "text-yellow-400" : "text-white"
            }`}
            style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tab}
            </motion.span>
            {activeLeftTab === tab && (
              <motion.div
                layoutId="leftActiveTab"
                className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {index < leftTabs.length - 1 && (
              <span className="hidden md:inline ml-6 text-gray-600">|</span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Right Navigation */}
      <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-xl md:text-2xl font-semibold">
        {rightTabs.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => onRightTabClick(tab)}
            className="relative cursor-pointer transition-colors duration-300 text-white"
            style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tab}
            </motion.span>
            {activeRightTab === tab && (tab !== "home" || !activeLeftTab) && (
              <motion.div
                layoutId="rightActiveTab"
                className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {index < rightTabs.length - 1 && (
              <span className="hidden md:inline ml-6 text-gray-600">|</span>
            )}
          </motion.button>
        ))}
      </nav>
    </motion.header>
  );
}

