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
import { Meal } from "@/lib/types";
import { Sparkles, Heart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BlendedWorldPage() {
  const [blendedMeals, setBlendedMeals] = useState<Meal[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const world1 = decodeURIComponent(params.world1 as string);
  const world2 = decodeURIComponent(params.world2 as string);

  useEffect(() => {
    loadFromLocalStorage();
    loadBlendedMeals();
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

  const loadBlendedMeals = async () => {
    setLoading(true);

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

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4">Creating your unique blend...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blendedMeals.map((meal, index) => (
                <Card
                  key={meal.idMeal}
                  className="overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in bg-linear-to-br from-purple-500/5 to-pink-500/5 border-2 border-purple-400/20 hover:border-purple-400/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className="absolute top-2 left-2 bg-black/70 text-white border-white/50"
                      variant="outline"
                    >
                      {meal.strArea}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(meal.strMeal)}
                      className="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform bg-black/50 hover:bg-black/70 border-0"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favoriteFoods.includes(meal.strMeal)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle>{meal.strMeal}</CardTitle>
                    <CardDescription>{meal.strCategory}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-bold text-base mb-2 text-white">
                        Ingredients:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getIngredients(meal)
                          .slice(0, 5)
                          .map((ingredient, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-sm px-3 py-1 bg-purple-500/10 border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/50 transition-colors"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
