"use client";

import { useState, useEffect } from "react";
import MediaGallery from "./MediaGallery";
import { animationItems, GalleryItem } from "./galleryData";
import { getGalleryItems } from "@/lib/strapi";

export default function AnimationGallery() {
  const [items, setItems] = useState<GalleryItem[]>(animationItems);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const strapiItems = await getGalleryItems("animation");
        // Only use Strapi items if we got any, otherwise fallback to static
        if (strapiItems.length > 0) {
          setItems(strapiItems);
        }
      } catch (error) {
        console.error("Error fetching animation items:", error);
        // Keep using static fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-12 w-full max-w-[1920px] mx-auto">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[16/9] rounded-2xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return <MediaGallery items={items} />;
}
