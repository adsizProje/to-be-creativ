"use client";

import MediaGallery from "./MediaGallery";
import { animationItems } from "./galleryData";

export default function AnimationGallery() {
  return <MediaGallery items={animationItems} />;
}

