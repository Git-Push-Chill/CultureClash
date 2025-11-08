import { GoogleGenerativeAI } from "@google/generative-ai";
import { Meal, FusionRecipe } from "../types";

// Initialize Gemini AI - will be initialized in the function to ensure env var is available
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;

    // Debug logging
    console.log("Environment check:", {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!apiKey) {
      throw new Error(
        "Gemini API key not configured. Please set GEMINI_API_KEY in your .env.local file and restart the dev server."
      );
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Extract ingredients from a meal object
 */
function extractIngredients(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    if (ingredient && ingredient.trim()) {
      ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
    }
  }
  return ingredients;
}

/**
 * Create a detailed prompt for Gemini to generate fusion recipes
 */
function createFusionPrompt(
  world1: string,
  world2: string,
  meals1: Meal[],
  meals2: Meal[]
): string {
  // Get 2-3 representative dishes from each cuisine
  const dishes1 = meals1.slice(0, 3).map((meal) => ({
    name: meal.strMeal,
    ingredients: extractIngredients(meal),
    category: meal.strCategory,
  }));

  const dishes2 = meals2.slice(0, 3).map((meal) => ({
    name: meal.strMeal,
    ingredients: extractIngredients(meal),
    category: meal.strCategory,
  }));

  return `You are a creative fusion chef specializing in blending cuisines from different cultures. Create 3 unique fusion recipes that authentically combine ${world1} and ${world2} cuisines.

Here are some representative dishes from each cuisine:

${world1} Cuisine:
${dishes1
  .map(
    (d, i) =>
      `${i + 1}. ${d.name} (${d.category})\n   Key ingredients: ${d.ingredients
        .slice(0, 5)
        .join(", ")}`
  )
  .join("\n")}

${world2} Cuisine:
${dishes2
  .map(
    (d, i) =>
      `${i + 1}. ${d.name} (${d.category})\n   Key ingredients: ${d.ingredients
        .slice(0, 5)
        .join(", ")}`
  )
  .join("\n")}

For each fusion recipe, you must:
1. Create a creative name that reflects both cultures
2. Select one dish from ${world1} and one from ${world2} as the base inspiration
3. Blend cooking techniques, flavors, and ingredients from both cuisines
4. Provide detailed ingredients with measurements and origin (world1, world2, or both)
5. Include step-by-step cooking instructions
6. Add cultural notes explaining how the fusion honors both traditions

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or extra text. The response must start with { and end with }.

Return the recipes in this exact JSON format:
{
  "fusionRecipes": [
    {
      "name": "Creative fusion dish name",
      "description": "A brief, enticing description of the fusion dish (1-2 sentences)",
      "world1Dish": "Name of the ${world1} dish that inspired this",
      "world2Dish": "Name of the ${world2} dish that inspired this",
      "ingredients": [
        {
          "name": "ingredient name",
          "amount": "measurement (e.g., 2 cups, 500g, 1 tsp)",
          "origin": "world1 or world2 or both"
        }
      ],
      "instructions": [
        "Step 1 instruction",
        "Step 2 instruction"
      ],
      "culturalNotes": "Explanation of how this fusion respects and blends both cultures",
      "servings": 4,
      "prepTime": "time in minutes",
      "cookTime": "time in minutes"
    }
  ]
}`;
}

/**
 * Generate fusion recipes by blending two cuisines using Gemini AI
 * @param world1 - First cuisine name
 * @param world2 - Second cuisine name
 * @param meals1 - Array of meals from first cuisine
 * @param meals2 - Array of meals from second cuisine
 * @returns Array of fusion recipes
 */
export async function generateFusionRecipes(
  world1: string,
  world2: string,
  meals1: Meal[],
  meals2: Meal[]
): Promise<FusionRecipe[]> {
  // Validate input
  if (!world1 || !world2) {
    throw new Error("Both cuisine names are required");
  }

  if (!meals1 || meals1.length === 0 || !meals2 || meals2.length === 0) {
    throw new Error("Both cuisines must have at least one meal");
  }

  try {
    // Get initialized Gemini AI instance (this checks for API key)
    const aiInstance = getGenAI();

    // Generate fusion recipes using Gemini
    const model = aiInstance.getGenerativeModel({ model: "gemini-2.5-pro" });
    const prompt = createFusionPrompt(world1, world2, meals1, meals2);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let fusionData;
    try {
      // Clean up the response text (remove markdown code blocks if present)
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      fusionData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error(
        `Failed to parse AI response: ${
          parseError instanceof Error ? parseError.message : "Unknown error"
        }`
      );
    }

    // Validate the response structure
    if (!fusionData.fusionRecipes || !Array.isArray(fusionData.fusionRecipes)) {
      throw new Error("Invalid response format from AI");
    }

    return fusionData.fusionRecipes;
  } catch (error) {
    console.error("Error generating fusion recipes:", error);
    throw error;
  }
}

/**
 * Mock fusion recipes for fallback when API is unavailable or for testing
 */
export const mockFusionRecipes: Record<string, FusionRecipe[]> = {
  "Italian-Japanese": [
    {
      name: "Miso Carbonara Ramen",
      description:
        "A creamy Japanese-Italian fusion combining the umami of miso with the richness of carbonara sauce over ramen noodles.",
      world1Dish: "Spaghetti Carbonara",
      world2Dish: "Miso Ramen",
      ingredients: [
        { name: "ramen noodles", amount: "400g", origin: "world2" },
        { name: "pancetta", amount: "200g", origin: "world1" },
        { name: "egg yolks", amount: "4", origin: "both" },
        { name: "white miso paste", amount: "2 tbsp", origin: "world2" },
        { name: "Parmesan cheese", amount: "1 cup", origin: "world1" },
        { name: "dashi stock", amount: "4 cups", origin: "world2" },
        { name: "black pepper", amount: "to taste", origin: "both" },
        { name: "nori sheets", amount: "2", origin: "world2" },
      ],
      instructions: [
        "Cook ramen noodles according to package instructions and drain.",
        "In a pan, crisp the pancetta until golden brown.",
        "Mix egg yolks with grated Parmesan and miso paste.",
        "Heat dashi stock and add cooked noodles.",
        "Remove from heat and quickly stir in egg mixture.",
        "Top with crispy pancetta, extra Parmesan, and nori strips.",
        "Finish with freshly ground black pepper.",
      ],
      culturalNotes:
        "This dish honors Italian carbonara's creamy egg-based sauce while incorporating Japanese miso's umami depth and ramen's comforting texture. The dashi stock provides a lighter base than traditional carbonara, making it uniquely balanced.",
      servings: 4,
      prepTime: "15 minutes",
      cookTime: "20 minutes",
    },
  ],
};
