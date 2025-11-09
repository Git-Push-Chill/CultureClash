import { FusionRecipe, Meal, SearchHistoryItem } from "./types";

/**
 * Validates if a string is not empty and within reasonable length
 */
export function isValidString(
  str: string,
  minLength = 1,
  maxLength = 500
): boolean {
  return (
    typeof str === "string" &&
    str.trim().length >= minLength &&
    str.length <= maxLength
  );
}

/**
 * Validates a fusion recipe has all required fields
 */
export function isValidFusionRecipe(recipe: any): recipe is FusionRecipe {
  if (!recipe || typeof recipe !== "object") return false;

  return (
    isValidString(recipe.name, 3, 100) &&
    isValidString(recipe.description, 10, 500) &&
    isValidString(recipe.world1Dish, 2, 100) &&
    isValidString(recipe.world2Dish, 2, 100) &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.length > 0 &&
    recipe.ingredients.every(
      (ing: any) =>
        isValidString(ing.name, 1, 100) &&
        isValidString(ing.amount, 1, 50) &&
        ["world1", "world2", "both"].includes(ing.origin)
    ) &&
    Array.isArray(recipe.instructions) &&
    recipe.instructions.length > 0 &&
    recipe.instructions.every((inst: any) => isValidString(inst, 10, 500)) &&
    isValidString(recipe.culturalNotes, 20, 1000) &&
    typeof recipe.servings === "number" &&
    recipe.servings > 0 &&
    recipe.servings <= 20 &&
    isValidString(recipe.prepTime, 3, 50) &&
    isValidString(recipe.cookTime, 3, 50)
  );
}

/**
 * Validates a meal object has required fields
 */
export function isValidMeal(meal: any): meal is Meal {
  if (!meal || typeof meal !== "object") return false;

  return (
    isValidString(meal.idMeal) &&
    isValidString(meal.strMeal, 2, 100) &&
    isValidString(meal.strMealThumb, 10, 500) &&
    isValidString(meal.strArea, 2, 50) &&
    isValidString(meal.strCategory, 2, 50)
  );
}

/**
 * Validates search history item
 */
export function isValidSearchHistoryItem(item: any): item is SearchHistoryItem {
  if (!item || typeof item !== "object") return false;

  return (
    isValidString(item.world1, 2, 50) &&
    isValidString(item.world2, 2, 50) &&
    typeof item.timestamp === "number" &&
    item.timestamp > 0 &&
    Array.isArray(item.meals) &&
    item.meals.every(isValidMeal) &&
    (!item.fusionRecipes ||
      (Array.isArray(item.fusionRecipes) &&
        item.fusionRecipes.every(isValidFusionRecipe)))
  );
}

/**
 * Sanitizes a string by removing potentially dangerous characters
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .trim();
}

/**
 * Validates and sanitizes cuisine area name
 */
export function validateCuisineName(name: string): string | null {
  const sanitized = sanitizeString(name);
  if (!isValidString(sanitized, 2, 50)) {
    return null;
  }
  // Only allow letters, spaces, and hyphens
  if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
    return null;
  }
  return sanitized;
}

/**
 * Rate limiting helper - checks if too many requests in time window
 */
export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests = 10, timeWindowMs = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove old requests outside the time window
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getResetTime(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return oldestRequest + this.timeWindow;
  }
}

/**
 * Validates localStorage data and returns safe parsed data
 */
export function safeLocalStorageGet<T>(
  key: string,
  validator: (data: any) => boolean
): T | null {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (validator(parsed)) {
      return parsed as T;
    }
    console.warn(`Invalid data structure for key: ${key}`);
    return null;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Safely sets localStorage with error handling
 */
export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
}
