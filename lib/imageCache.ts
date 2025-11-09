/**
 * Image caching and optimization utilities
 */

interface CachedImage {
  url: string;
  timestamp: number;
  blob?: Blob;
}

const IMAGE_CACHE_KEY = "culture-clash-image-cache";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_CACHE_SIZE = 50; // Maximum number of images to cache

/**
 * In-memory cache for faster access during session
 */
const memoryCache = new Map<string, string>();

/**
 * Get cached image URL or return original
 */
export function getCachedImageUrl(url: string): string {
  // Check memory cache first
  if (memoryCache.has(url)) {
    return memoryCache.get(url)!;
  }

  // Check localStorage cache
  try {
    const cache = getImageCache();
    const cached = cache[url];

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      // Valid cache entry
      return cached.url;
    }
  } catch (error) {
    console.warn("Error reading image cache:", error);
  }

  return url;
}

/**
 * Cache an image URL
 */
export function cacheImageUrl(originalUrl: string, cachedUrl?: string): void {
  try {
    const cache = getImageCache();
    const url = cachedUrl || originalUrl;

    // Add to memory cache
    memoryCache.set(originalUrl, url);

    // Add to localStorage cache
    cache[originalUrl] = {
      url,
      timestamp: Date.now(),
    };

    // Limit cache size
    const entries = Object.entries(cache);
    if (entries.length > MAX_CACHE_SIZE) {
      // Sort by timestamp and remove oldest
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toKeep = entries.slice(-MAX_CACHE_SIZE);
      const newCache = Object.fromEntries(toKeep);
      setImageCache(newCache);
    } else {
      setImageCache(cache);
    }
  } catch (error) {
    console.warn("Error caching image:", error);
  }
}

/**
 * Clear expired cache entries
 */
export function clearExpiredCache(): void {
  try {
    const cache = getImageCache();
    const now = Date.now();
    const filtered = Object.fromEntries(
      Object.entries(cache).filter(
        ([_, value]) => now - value.timestamp < CACHE_DURATION
      )
    );
    setImageCache(filtered);
  } catch (error) {
    console.warn("Error clearing expired cache:", error);
  }
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  try {
    memoryCache.clear();
    localStorage.removeItem(IMAGE_CACHE_KEY);
  } catch (error) {
    console.warn("Error clearing cache:", error);
  }
}

/**
 * Preload images for better UX
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            cacheImageUrl(url);
            resolve();
          };
          img.onerror = () => resolve(); // Resolve anyway to not block
          img.src = getCachedImageUrl(url);
        })
    )
  );
}

/**
 * Get optimized image URL with size parameters
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  quality?: number
): string {
  // For external APIs that support query parameters
  if (url.includes("themealdb.com")) {
    // TheMealDB doesn't support resizing, return as-is
    return url;
  }

  // For Next.js Image Optimization
  if (url.startsWith("/")) {
    const params = new URLSearchParams();
    if (width) params.set("w", width.toString());
    if (quality) params.set("q", quality.toString());
    return `${url}?${params.toString()}`;
  }

  return url;
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(
  url: string,
  sizes: number[] = [320, 640, 1024, 1920]
): string {
  return sizes
    .map((size) => `${getOptimizedImageUrl(url, size)} ${size}w`)
    .join(", ");
}

// Helper functions
function getImageCache(): Record<string, CachedImage> {
  try {
    const stored = localStorage.getItem(IMAGE_CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function setImageCache(cache: Record<string, CachedImage>): void {
  try {
    localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn("Error saving image cache:", error);
  }
}

// Clear expired cache on module load
if (typeof window !== "undefined") {
  clearExpiredCache();
}
