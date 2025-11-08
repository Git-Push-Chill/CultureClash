import { Meal } from "../types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Mock meals for fallback when API is unavailable
const mockMealsByArea: Record<string, Meal[]> = {
  Italian: [
    {
      idMeal: "52771",
      strMeal: "Spicy Arrabiata Penne",
      strCategory: "Vegetarian",
      strArea: "Italian",
      strInstructions: "Bring a large pot of water to a boil. Add kosher salt and pasta...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      strTags: "Pasta,Curry",
      strIngredient1: "penne rigate",
      strIngredient2: "olive oil",
      strIngredient3: "garlic",
      strMeasure1: "1 pound",
      strMeasure2: "1/4 cup",
      strMeasure3: "3 cloves",
    },
    {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken Casserole",
      strCategory: "Chicken",
      strArea: "Italian",
      strInstructions: "Preheat oven to 350° F...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      strTags: "Meat,Casserole",
      strIngredient1: "soy sauce",
      strIngredient2: "water",
      strIngredient3: "brown sugar",
      strMeasure1: "3/4 cup",
      strMeasure2: "1/2 cup",
      strMeasure3: "1/4 cup",
    },
    {
      idMeal: "52773",
      strMeal: "Lasagne",
      strCategory: "Pasta",
      strArea: "Italian",
      strInstructions: "Heat the oil in a large saucepan...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
      strTags: "Pasta,Beef",
      strIngredient1: "olive oil",
      strIngredient2: "bacon",
      strIngredient3: "onion",
      strMeasure1: "1 tblsp",
      strMeasure2: "2 rashers",
      strMeasure3: "1 finely chopped",
    },
  ],
  Japanese: [
    {
      idMeal: "52780",
      strMeal: "Katsu Chicken Curry",
      strCategory: "Chicken",
      strArea: "Japanese",
      strInstructions: "Combine the flour and curry powder...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
      strTags: "Curry,Meat",
      strIngredient1: "chicken breast",
      strIngredient2: "plain flour",
      strIngredient3: "curry powder",
      strMeasure1: "4 skinless",
      strMeasure2: "100g",
      strMeasure3: "2 tsp",
    },
    {
      idMeal: "52781",
      strMeal: "Teriyaki Chicken",
      strCategory: "Chicken",
      strArea: "Japanese",
      strInstructions: "Mix all the ingredients in the teriyaki sauce...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/g5srio1604444674.jpg",
      strTags: "Meat,Chicken",
      strIngredient1: "chicken thighs",
      strIngredient2: "sake",
      strIngredient3: "mirin",
      strMeasure1: "450g",
      strMeasure2: "2 tbs",
      strMeasure3: "2 tbs",
    },
    {
      idMeal: "52782",
      strMeal: "Sushi",
      strCategory: "Seafood",
      strArea: "Japanese",
      strInstructions: "Cook the sushi rice...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
      strTags: "Seafood,Fish",
      strIngredient1: "sushi rice",
      strIngredient2: "rice wine",
      strIngredient3: "nori",
      strMeasure1: "300g",
      strMeasure2: "2 tbs",
      strMeasure3: "5 sheets",
    },
  ],
};

export async function getMealsByArea(area: string): Promise<Meal[]> {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data = await response.json();
    
    if (!data.meals) return mockMealsByArea[area] || [];
    
    // Get full details for each meal
    const detailedMeals = await Promise.all(
      data.meals.slice(0, 6).map(async (meal: { idMeal: string }) => {
        const detailResponse = await fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`);
        const detailData = await detailResponse.json();
        return detailData.meals?.[0] || null;
      })
    );
    
    return detailedMeals.filter(Boolean);
  } catch (error) {
    console.error("Error fetching meals:", error);
    // Return mock data if API fails
    return mockMealsByArea[area] || [];
  }
}

export async function getRandomMeal(): Promise<Meal | null> {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
}

export async function searchMealsByName(name: string): Promise<Meal[]> {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
}

export async function getAreas(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    const data = await response.json();
    return data.meals?.map((m: { strArea: string }) => m.strArea) || [];
  } catch (error) {
    console.error("Error fetching areas:", error);
    // Fallback to hardcoded areas if API fails
    return [
      "American", "British", "Canadian", "Chinese", "Croatian", "Dutch",
      "Egyptian", "Filipino", "French", "Greek", "Indian", "Irish",
      "Italian", "Jamaican", "Japanese", "Kenyan", "Malaysian", "Mexican",
      "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai",
      "Tunisian", "Turkish", "Ukrainian", "Vietnamese"
    ];
  }
}

export function getIngredients(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }
  return ingredients;
}
