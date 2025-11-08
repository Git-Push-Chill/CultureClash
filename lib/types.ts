export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
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
  imageUrl?: string; // AI-generated image of the fusion dish
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
