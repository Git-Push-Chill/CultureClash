export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strTags?: string;
  strInstructions?: string;
  // Dynamic ingredient/measure fields (up to 20)
  [key: string]: string | undefined;
}

export interface UserProfile {
  favoriteWorld: string;
  favoriteFoods: string[];
  exploredWorlds: string[];
}

export interface CulturalBlend {
  world1: string;
  world2: string;
  meals: Meal[];
  blendedElements: string[];
}

export interface FusionRecipe {
  name: string;
  description: string;
  world1Dish: string;
  world2Dish: string;
  ingredients: {
    name: string;
    amount: string;
    origin: string; // world1, world2, or both
  }[];
  instructions: string[];
  culturalNotes: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  imageUrl?: string; // Diagonal-split flag fusion image
}

export interface FusionRecipeRequest {
  world1: string;
  world2: string;
  meals1: Meal[];
  meals2: Meal[];
}

export interface FusionRecipeResponse {
  fusionRecipes: FusionRecipe[];
  error?: string;
}

export interface SearchHistoryItem {
  world1: string;
  world2: string;
  timestamp: number;
  meals: Meal[];
  fusionRecipes?: FusionRecipe[];
}

export interface BridgeProfile {
  favoriteFoods: string[];
  exploredWorlds: string[];
  searchHistory: SearchHistoryItem[];
}
