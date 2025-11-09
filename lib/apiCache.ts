/**
 * API response caching utilities to reduce API calls and improve performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_PREFIX = "api-cache-";
const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * In-memory cache for faster access during session
 */
const memoryCache = new Map<string, CacheEntry<any>>();

/**
 * Generate cache key from request parameters
 */
export function generateCacheKey(
  endpoint: string,
  params?: Record<string, any>
): string {
  const paramsStr = params ? JSON.stringify(params) : "";
  return `${CACHE_PREFIX}${endpoint}-${paramsStr}`;
}

/**
 * Get data from cache (memory first, then localStorage)
 */
export function getFromCache<T>(key: string): T | null {
  // Check memory cache first
  if (memoryCache.has(key)) {
    const entry = memoryCache.get(key)!;
    if (Date.now() < entry.expiresAt) {
      return entry.data as T;
    }
    memoryCache.delete(key);
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const entry: CacheEntry<T> = JSON.parse(stored);
    if (Date.now() < entry.expiresAt) {
      // Restore to memory cache
      memoryCache.set(key, entry);
      return entry.data;
    }

    // Expired, remove it
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Error reading from cache:", error);
  }

  return null;
}

/**
 * Save data to cache (both memory and localStorage)
 */
export function saveToCache<T>(
  key: string,
  data: T,
  ttl: number = DEFAULT_TTL
): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttl,
  };

  // Save to memory cache
  memoryCache.set(key, entry);

  // Save to localStorage
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.warn("Error saving to cache:", error);
    // If localStorage is full, try to clear old entries
    clearOldCacheEntries();
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // Still failed, just use memory cache
    }
  }
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string): void {
  memoryCache.delete(key);
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Error clearing cache entry:", error);
  }
}

/**
 * Clear all cache entries with prefix
 */
export function clearAllCache(): void {
  // Clear memory cache
  memoryCache.clear();

  // Clear localStorage cache
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn("Error clearing cache:", error);
  }
}

/**
 * Clear expired cache entries
 */
export function clearExpiredCache(): void {
  const now = Date.now();

  // Clear expired from memory
  memoryCache.forEach((entry, key) => {
    if (now >= entry.expiresAt) {
      memoryCache.delete(key);
    }
  });

  // Clear expired from localStorage
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const entry = JSON.parse(stored);
            if (now >= entry.expiresAt) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.warn("Error clearing expired cache:", error);
  }
}

/**
 * Clear old cache entries when storage is full (keep most recent)
 */
function clearOldCacheEntries(): void {
  try {
    const cacheEntries: Array<{ key: string; timestamp: number }> = [];

    // Collect all cache entries with timestamps
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const entry = JSON.parse(stored);
            cacheEntries.push({ key, timestamp: entry.timestamp });
          }
        } catch {
          // Invalid entry, will be cleaned up
        }
      }
    });

    // Sort by timestamp (oldest first) and remove oldest 25%
    cacheEntries.sort((a, b) => a.timestamp - b.timestamp);
    const toRemove = Math.ceil(cacheEntries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(cacheEntries[i].key);
      memoryCache.delete(cacheEntries[i].key);
    }
  } catch (error) {
    console.warn("Error clearing old cache entries:", error);
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  memorySize: number;
  localStorageSize: number;
  totalSize: number;
} {
  const memorySize = memoryCache.size;
  let localStorageSize = 0;

  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorageSize++;
      }
    });
  } catch {
    localStorageSize = 0;
  }

  return {
    memorySize,
    localStorageSize,
    totalSize: memorySize + localStorageSize,
  };
}

/**
 * Cached fetch wrapper
 */
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const cacheKey = generateCacheKey(
    url,
    options?.body ? JSON.parse(options.body as string) : undefined
  );

  // Check cache first (only for GET requests)
  if (!options?.method || options.method === "GET") {
    const cached = getFromCache<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  // Fetch from API
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  // Cache the response (only for GET requests)
  if (!options?.method || options.method === "GET") {
    saveToCache(cacheKey, data, ttl);
  }

  return data;
}

// Clear expired cache on module load
if (typeof window !== "undefined") {
  clearExpiredCache();

  // Set up periodic cleanup (every 5 minutes)
  setInterval(clearExpiredCache, 5 * 60 * 1000);
}
