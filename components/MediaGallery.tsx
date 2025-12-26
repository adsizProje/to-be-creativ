"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { GalleryItem } from "./galleryData";
import { Info, Play, Pause } from "lucide-react";

interface MediaGalleryProps {
  items: GalleryItem[];
}

export default function MediaGallery({ items }: MediaGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-2 lg:gap-3 px-4 md:px-8 lg:px-12 w-full max-w-[1920px] mx-auto"
    >
      {items.map((item, index) => (
        <MediaCard key={index} item={item} index={index} />
      ))}
    </motion.div>
  );
}

interface MediaCardProps {
  item: GalleryItem;
  index: number;
}

function MediaCard({ item, index }: MediaCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasContent = item.title || item.description;

  const handleVideoHover = (isHovering: boolean) => {
    if (!videoRef.current) return;

    if (isHovering) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleMobilePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleMobilePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const toggleMobileOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative aspect-[16/9] overflow-hidden rounded-2xl cursor-none group w-full"
      style={{ 
        transformStyle: "preserve-3d",
        boxShadow: isHovered 
          ? "0 25px 70px -15px rgba(100, 200, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (item.isVideo) {
          handleVideoHover(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (item.isVideo) {
          handleVideoHover(false);
        }
      }}
    >
      {item.isVideo ? (
        <>
          <video
            ref={videoRef}
            src={item.source}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onEnded={handleVideoEnd}
          />

          {/* Desktop: No controls needed, hover plays */}
          
          {/* Mobile: Play button (centered) */}
          <AnimatePresence>
            {!isPlaying && !showOverlay && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobilePlay();
                }}
                className="md:hidden absolute inset-0 m-auto w-16 h-16 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-10"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Pause button (bottom right) - visible only on mobile when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobilePause();
                }}
                className="md:hidden absolute bottom-3 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-20"
                aria-label="Pause video"
              >
                <Pause className="w-5 h-5 text-white" fill="white" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Video: Info button (top right on mobile, bottom right on desktop) */}
          {hasContent && !showOverlay && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileOverlay();
              }}
              className="absolute top-4 right-4 md:bottom-4 md:top-auto w-8 h-8 bg-purple-900/50 backdrop-blur-sm rounded-lg border border-purple-500/40 flex items-center justify-center hover:bg-purple-800/60 transition-colors z-[100]"
              aria-label="Show info"
            >
              <Info className="w-4 h-4 text-purple-300" />
            </button>
          )}
        </>
      ) : (
        <motion.div
          className="w-full h-full"
          animate={{ 
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={item.source}
            alt={item.title || `Gallery image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      )}

      {/* Glassmorphic overlay on hover - only for images */}
      {!item.isVideo && (
        <motion.div
          className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-tr from-purple-500/20 via-cyan-500/10 to-pink-500/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered 
            ? "linear-gradient(135deg, rgba(100, 200, 255, 0.3) 0%, transparent 50%, rgba(200, 100, 255, 0.3) 100%)"
            : "none",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Corner accents */}
      {isHovered && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-purple-400 rounded-br-lg"
          />
        </>
      )}

      {/* Desktop: Hover overlay for images */}
      {!item.isVideo && hasContent && (
        <div className="hidden md:block absolute inset-0 bg-black/0 hover:bg-black/50 transition-all duration-300 group">
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent p-4">
            <p className="text-white text-sm mb-2">{item.description}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      )}

      {/* Image: Info button (bottom right) - only for images */}
      <AnimatePresence>
        {!item.isVideo && hasContent && !showOverlay && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileOverlay();
            }}
            className="md:hidden absolute bottom-4 right-4 w-8 h-8 bg-purple-900/30 backdrop-blur-sm rounded-lg border border-purple-700/20 flex items-center justify-center hover:bg-purple-800/60 transition-colors z-20"
            aria-label="Show info"
          >
            <Info className="w-4 h-4 text-purple-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay when info is clicked (for both images and videos) */}
      <AnimatePresence>
        {hasContent && showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 z-30 p-4 flex flex-col justify-between"
            onClick={toggleMobileOverlay}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h3 className="text-white font-semibold text-xl mb-3">
                {item.title}
              </h3>
              <p className="text-white text-base mb-4">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                </a>
              )}
            </motion.div>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="self-start text-white text-sm underline"
              onClick={toggleMobileOverlay}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

