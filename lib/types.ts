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
  savedItineraries: TravelItinerary[];
}

export interface CulturalBlend {
  world1: string;
  world2: string;
  meals: Meal[];
  blendedElements: string[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  country: string;
  city: string;
  rating?: number;
  price?: number;
  currency?: string;
  image?: string;
  bookingUrl: string;
  description?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  location: string;
  city: string;
  country: string;
  rating?: number;
  priceRange?: string;
  bookingUrl?: string;
  image?: string;
}

export interface TravelItinerary {
  id: string;
  name: string;
  world1: string;
  world2: string;
  meals: string[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  createdAt: Date;
  notes?: string;
}
