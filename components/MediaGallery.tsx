"use client";

import { motion } from "framer-motion";
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 lg:gap-8 px-4 md:px-3 max-w-6xl mx-auto"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      onMouseEnter={() => {
        if (item.isVideo) {
          handleVideoHover(true);
        }
      }}
      onMouseLeave={() => {
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
          {!isPlaying && !showOverlay && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMobilePlay();
              }}
              className="md:hidden absolute inset-0 m-auto w-16 h-16 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-10"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          )}

          {/* Pause button (bottom right) - visible only on mobile when playing */}
          {isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMobilePause();
              }}
              className="md:hidden absolute bottom-3 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-20"
              aria-label="Pause video"
            >
              <Pause className="w-5 h-5 text-white" fill="white" />
            </button>
          )}

          {/* Video: Info button (top right on mobile, bottom right on desktop) */}
          {hasContent && !showOverlay && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileOverlay();
              }}
              className="absolute top-3 right-3 md:bottom-3 md:top-auto w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-[100]"
              aria-label="Show info"
            >
              <Info className="w-5 h-5 text-white" />
            </button>
          )}
        </>
      ) : (
        <Image
          src={item.source}
          alt={item.title || `Gallery image ${index + 1}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
      {!item.isVideo && hasContent && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileOverlay();
            }}
            className="md:hidden absolute bottom-3 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-20"
            aria-label="Show info"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* Overlay when info is clicked (for both images and videos) */}
      {hasContent && (
        <>
          {showOverlay && (
            <div
              className="absolute inset-0 bg-black/80 z-30 p-4 flex flex-col justify-between"
              onClick={toggleMobileOverlay}
            >
              <div className="flex-1 flex flex-col justify-center">
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
              </div>
              <button
                className="self-start text-white text-sm underline"
                onClick={toggleMobileOverlay}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

