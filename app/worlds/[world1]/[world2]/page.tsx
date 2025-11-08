"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMealsByArea, getIngredients } from "@/lib/api/meals";
import {
  Meal,
  FusionRecipe,
  FusionRecipeRequest,
  FusionRecipeResponse,
} from "@/lib/types";
import {
  Sparkles,
  Heart,
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BlendedWorldPage() {
  const [blendedMeals, setBlendedMeals] = useState<Meal[]>([]);
  const [fusionRecipes, setFusionRecipes] = useState<FusionRecipe[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fusionLoading, setFusionLoading] = useState(false);
  const [fusionError, setFusionError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<FusionRecipe | null>(
    null
  );
  const params = useParams();
  const router = useRouter();
  const world1 = decodeURIComponent(params.world1 as string);
  const world2 = decodeURIComponent(params.world2 as string);

  useEffect(() => {
    loadFromLocalStorage();
    loadBlendedMealsAndFusion();
  }, []);

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("bridgeProfile");
    if (stored) {
      const profile = JSON.parse(stored);
      setFavoriteFoods(profile.favoriteFoods || []);
      setExploredWorlds(profile.exploredWorlds || []);
    }
  };

  const saveToLocalStorage = (foods: string[], worlds: string[]) => {
    localStorage.setItem(
      "bridgeProfile",
      JSON.stringify({ favoriteFoods: foods, exploredWorlds: worlds })
    );
  };

  const loadBlendedMealsAndFusion = async () => {
    setLoading(true);
    setFusionLoading(true);

    try {
      // Fetch meals from both worlds
      const meals1 = await getMealsByArea(world1);
      const meals2 = await getMealsByArea(world2);

      // Blend the results
      const blended = [...meals1.slice(0, 3), ...meals2.slice(0, 3)];
      setBlendedMeals(blended);

      // Update explored worlds with combination format
      const stored = localStorage.getItem("bridgeProfile");
      const profile = stored
        ? JSON.parse(stored)
        : { favoriteFoods: [], exploredWorlds: [] };
      const worldCombination = `${world1} / ${world2}`;
      const newExploredWorlds = Array.from(
        new Set([...(profile.exploredWorlds || []), worldCombination])
      );
      setExploredWorlds(newExploredWorlds);
      saveToLocalStorage(profile.favoriteFoods || [], newExploredWorlds);

      setLoading(false);

      // Generate fusion recipes automatically
      await generateFusionRecipes(meals1, meals2);
    } catch (error) {
      console.error("Error loading blended meals:", error);
      setLoading(false);
      setFusionLoading(false);
    }
  };

  const generateFusionRecipes = async (meals1?: Meal[], meals2?: Meal[]) => {
    setFusionLoading(true);
    setFusionError(null);

    try {
      // If meals not provided, fetch them
      let world1Meals = meals1;
      let world2Meals = meals2;

      if (!world1Meals || !world2Meals) {
        world1Meals = await getMealsByArea(world1);
        world2Meals = await getMealsByArea(world2);
      }

      const requestBody: FusionRecipeRequest = {
        world1,
        world2,
        meals1: world1Meals.slice(0, 3),
        meals2: world2Meals.slice(0, 3),
      };

      const response = await fetch("/api/fuse-flavors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Try to parse JSON error, but handle HTML responses too
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to generate fusion recipes"
          );
        } else {
          // Got HTML or other non-JSON response (likely a Next.js error page)
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error(
            "Server error occurred. Please check your API key configuration and server logs."
          );
        }
      }

      const data: FusionRecipeResponse = await response.json();
      setFusionRecipes(data.fusionRecipes);
    } catch (error) {
      console.error("Error generating fusion recipes:", error);
      setFusionError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setFusionLoading(false);
    }
  };

  const toggleFavorite = (mealName: string) => {
    const newFavorites = favoriteFoods.includes(mealName)
      ? favoriteFoods.filter((f) => f !== mealName)
      : [...favoriteFoods, mealName];
    setFavoriteFoods(newFavorites);
    saveToLocalStorage(newFavorites, exploredWorlds);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="mb-6 flex justify-between items-center">
          <Link href={`/worlds/${encodeURIComponent(world1)}`}>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-all duration-300 font-bold border-2 border-purple-400/50 text-purple-300 hover:bg-linear-to-r hover:from-purple-600 hover:to-purple-400 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Choose Different Worlds
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-all duration-300 font-bold border-2 border-purple-400/50 text-purple-300 hover:bg-linear-to-r hover:from-purple-600 hover:to-purple-400 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              {world1}
            </span>
            <Sparkles className="inline-block w-8 h-8 mx-4 text-purple-500 animate-pulse" />
            <span className="bg-linear-to-r from-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent animate-gradient-x">
              {world2}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Your Blended Cultural Experience
          </p>
        </div>

        {loading || fusionLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-lg">
              {loading
                ? "Creating your unique blend..."
                : "Our AI chef is creating fusion masterpieces..."}
            </p>
          </div>
        ) : fusionError ? (
          <Card className="p-8 bg-red-500/10 border-2 border-red-500/50">
            <div className="text-center">
              <p className="text-red-400 text-lg font-semibold mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-gray-300 mb-4">{fusionError}</p>
              <Button
                onClick={() => generateFusionRecipes()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Try Again
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Fusion Recipes Section */}
            <div className="mb-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    AI-Generated Fusion Recipes ✨
                  </span>
                </h3>
                <p className="text-gray-300">
                  Unique dishes that blend the best of both worlds
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fusionRecipes.map((recipe, index) => (
                  <Card
                    key={index}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 hover:border-purple-400/60"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 w-full">
                      {recipe.imageUrl ? (
                        <Image
                          src={recipe.imageUrl}
                          alt={recipe.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-orange-600/30 flex items-center justify-center">
                          <div className="text-center p-4">
                            <Sparkles className="w-12 h-12 mx-auto mb-2 text-yellow-400 animate-pulse" />
                            <p className="text-white font-bold text-lg">
                              Fusion Recipe
                            </p>
                          </div>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.name);
                        }}
                        className="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform bg-black/50 hover:bg-black/70 border-0"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favoriteFoods.includes(recipe.name)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </Button>
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <Badge className="bg-green-500/80 text-white border-0 text-xs">
                          {world1}
                        </Badge>
                        <Badge className="bg-blue-500/80 text-white border-0 text-xs">
                          {world2}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{recipe.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {recipe.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>
                            {recipe.prepTime} prep + {recipe.cookTime} cook
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span>{recipe.servings} servings</span>
                        </div>
                        <div className="pt-2">
                          <Badge
                            variant="outline"
                            className="bg-purple-500/20 border-purple-400/50 text-purple-200"
                          >
                            Click for full recipe
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recipe Modal */}
            {selectedRecipe && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setSelectedRecipe(null)}
              >
                <div
                  className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Hero Image */}
                  {selectedRecipe.imageUrl && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={selectedRecipe.imageUrl}
                        alt={selectedRecipe.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    </div>
                  )}

                  <div className="sticky top-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm border-b border-purple-400/30 p-6 flex justify-between items-start z-10">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedRecipe.name}
                      </h2>
                      <p className="text-gray-200">
                        {selectedRecipe.description}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge className="bg-green-500/30 text-green-200 border-green-500/50">
                          {world1}: {selectedRecipe.world1Dish}
                        </Badge>
                        <Badge className="bg-blue-500/30 text-blue-200 border-blue-500/50">
                          {world2}: {selectedRecipe.world2Dish}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRecipe(null)}
                      className="text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="p-6">
                    {/* Recipe Info */}
                    <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-purple-400/20">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span>
                          <strong>{selectedRecipe.servings}</strong> servings
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span>
                          Prep: <strong>{selectedRecipe.prepTime}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span>
                          Cook: <strong>{selectedRecipe.cookTime}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Ingredients
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedRecipe.ingredients.map((ingredient, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-3 rounded-lg ${
                              ingredient.origin === "world1"
                                ? "bg-green-500/10 border border-green-500/30"
                                : ingredient.origin === "world2"
                                ? "bg-blue-500/10 border border-blue-500/30"
                                : "bg-purple-500/10 border border-purple-500/30"
                            }`}
                          >
                            <span className="text-gray-300">
                              <strong className="text-white">
                                {ingredient.amount}
                              </strong>{" "}
                              {ingredient.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                        <ChefHat className="w-5 h-5 text-pink-400" />
                        Instructions
                      </h4>
                      <ol className="space-y-3">
                        {selectedRecipe.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex gap-3 text-gray-300">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white">
                              {idx + 1}
                            </span>
                            <span className="flex-1 pt-1">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Cultural Notes */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                      <h4 className="text-lg font-bold mb-2 text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        Cultural Fusion Notes
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedRecipe.culturalNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
