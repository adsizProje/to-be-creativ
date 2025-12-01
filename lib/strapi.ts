import { GalleryItem } from "@/components/galleryData";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiMedia {
  url: string;
  mime: string;
  formats?: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
}

interface StrapiGalleryItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  link: string | null;
  category: "animation" | "graphic" | "savunma";
  order: number;
  source: StrapiMedia;
}

interface StrapiResponse {
  data: StrapiGalleryItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Transform Strapi response to GalleryItem format
 */
function transformStrapiItem(item: StrapiGalleryItem): GalleryItem {
  const isVideo = item.source?.mime?.startsWith("video/") || false;
  
  // Get the best available image URL
  let sourceUrl = item.source?.url || "";
  
  // If it's an image and has formats, prefer large format
  if (!isVideo && item.source?.formats) {
    sourceUrl = item.source.formats.large?.url || 
                item.source.formats.medium?.url || 
                item.source.url;
  }
  
  // Handle relative URLs from Strapi
  if (sourceUrl && !sourceUrl.startsWith("http")) {
    sourceUrl = `${STRAPI_URL}${sourceUrl}`;
  }
  
  return {
    source: sourceUrl,
    title: item.title,
    description: item.description || "",
    link: item.link,
    isVideo,
  };
}

/**
 * Fetch gallery items by category from Strapi
 */
export async function getGalleryItems(
  category: "animation" | "graphic" | "savunma"
): Promise<GalleryItem[]> {
  try {
    const url = new URL(`${STRAPI_URL}/api/gallery-items`);
    url.searchParams.set("filters[category][$eq]", category);
    url.searchParams.set("populate", "source");
    url.searchParams.set("sort", "order:asc");
    url.searchParams.set("pagination[pageSize]", "100");
    
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Strapi API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: StrapiResponse = await res.json();
    
    return data.data.map(transformStrapiItem);
  } catch (error) {
    console.error("Error fetching gallery items from Strapi:", error);
    return [];
  }
}

/**
 * Fetch all gallery items from Strapi
 */
export async function getAllGalleryItems(): Promise<{
  animation: GalleryItem[];
  graphic: GalleryItem[];
  savunma: GalleryItem[];
}> {
  const [animation, graphic, savunma] = await Promise.all([
    getGalleryItems("animation"),
    getGalleryItems("graphic"),
    getGalleryItems("savunma"),
  ]);

  return { animation, graphic, savunma };
}

