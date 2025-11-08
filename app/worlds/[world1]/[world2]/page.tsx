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

    // Update explored worlds
    const stored = localStorage.getItem("bridgeProfile");
    const profile = stored
      ? JSON.parse(stored)
      : { favoriteFoods: [], exploredWorlds: [] };
    const newExploredWorlds = Array.from(
      new Set([...(profile.exploredWorlds || []), world1, world2])
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/worlds/${encodeURIComponent(world1)}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Choose Different World
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {world1}
            </span>
            <Sparkles className="inline-block w-8 h-8 mx-4 text-purple-600" />
            <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {world2}
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Your Blended Cultural Experience
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Creating your unique blend...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blendedMeals.map((meal) => (
                <Card key={meal.idMeal} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        meal.strArea === world1 ? "default" : "secondary"
                      }
                    >
                      {meal.strArea}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{meal.strMeal}</span>
                      <Button
                        size="sm"
                        variant={
                          favoriteFoods.includes(meal.strMeal)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => toggleFavorite(meal.strMeal)}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favoriteFoods.includes(meal.strMeal)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </Button>
                    </CardTitle>
                    <CardDescription>{meal.strCategory}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {getIngredients(meal)
                          .slice(0, 5)
                          .map((ingredient, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                      </div>
                      {meal.strTags && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {meal.strTags.split(",").map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-x-4">
              <Link href="/worlds">
                <Button size="lg">Explore More Worlds</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
