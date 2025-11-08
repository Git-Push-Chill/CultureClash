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
import { getAreas, getMealsByArea, getIngredients } from "@/lib/api/meals";
import { Meal } from "@/lib/types";
import { Globe, Heart, Sparkles, ChefHat } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedWorld1, setSelectedWorld1] = useState<string>("");
  const [selectedWorld2, setSelectedWorld2] = useState<string>("");
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);
  const [blendedMeals, setBlendedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<
    "welcome" | "select-world1" | "select-world2" | "explore"
  >("welcome");

  useEffect(() => {
    loadAreas();
    loadFromLocalStorage();
  }, []);

  const loadAreas = async () => {
    const fetchedAreas = await getAreas();
    setAreas(fetchedAreas);
  };

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

  const handleSelectWorld1 = (world: string) => {
    setSelectedWorld1(world);
    setStep("select-world2");
  };

  const handleSelectWorld2 = async (world: string) => {
    setSelectedWorld2(world);
    setLoading(true);

    // Fetch meals from both worlds
    const meals1 = await getMealsByArea(selectedWorld1);
    const meals2 = await getMealsByArea(world);

    // Blend the results
    const blended = [...meals1.slice(0, 3), ...meals2.slice(0, 3)];
    setBlendedMeals(blended);

    // Update explored worlds
    const newExploredWorlds = Array.from(
      new Set([...exploredWorlds, selectedWorld1, world])
    );
    setExploredWorlds(newExploredWorlds);
    saveToLocalStorage(favoriteFoods, newExploredWorlds);

    setLoading(false);
    setStep("explore");
  };

  const toggleFavorite = (mealName: string) => {
    const newFavorites = favoriteFoods.includes(mealName)
      ? favoriteFoods.filter((f) => f !== mealName)
      : [...favoriteFoods, mealName];
    setFavoriteFoods(newFavorites);
    saveToLocalStorage(newFavorites, exploredWorlds);
  };

  const resetJourney = () => {
    setSelectedWorld1("");
    setSelectedWorld2("");
    setBlendedMeals([]);
    setStep("welcome");
  };

  if (step === "welcome") {
    return (
      <main className="min-h-screen from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto p-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <h1 className="mt-8 text-6xl font-bold bg-gradient-to-r from-green-700 to-[#de5033] bg-clip-text drop-shadow-[0_1px_15px_rgb(161,4,195)] text-transparent">
                Culture Clash
              </h1>
            </div>
            <p className="text-2xl text-[#ffffff] mb-4">
              Where Taste Bridges Worlds
            </p>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Discover unique cross-cultural experiences by fusing cuisines from
              different worlds. Choose your favorite culture and explore another
              to create something extraordinary.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <CardTitle>Choose Your World</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Select your favorite food culture to start your journey
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ChefHat className="w-12 h-12 mx-auto mb-4 text-[#c39c39]" />
                <CardTitle>Explore Another</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pick a different world to blend with your favorite
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <CardTitle>Discover Magic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View curated dishes that blend both cultures
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {exploredWorlds.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Your Journey So Far
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {exploredWorlds.map((world) => (
                  <Badge key={world} variant="secondary" className="text-sm">
                    {world}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {favoriteFoods.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Your Favorite Dishes
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {favoriteFoods.map((food) => (
                  <Badge key={food} variant="default" className="text-sm">
                    <Heart className="w-3 h-3 mr-1" />
                    {food}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setStep("select-world1")}
              className="text-lg px-8 py-6"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (step === "select-world1" || step === "select-world2") {
    const isFirstSelection = step === "select-world1";
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">
              {isFirstSelection
                ? "Choose Your Home World"
                : "Choose Another World to Explore"}
            </h2>
            <p className="text-gray-600">
              {isFirstSelection
                ? "Select your favorite food culture"
                : `Blend ${selectedWorld1} with another culture`}
            </p>
          </div>

          {!isFirstSelection && (
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Home World: {selectedWorld1}
              </Badge>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {areas
              .filter((area) =>
                step === "select-world2" ? area !== selectedWorld1 : true
              )
              .map((area) => (
                <Card
                  key={area}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() =>
                    isFirstSelection
                      ? handleSelectWorld1(area)
                      : handleSelectWorld2(area)
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-center">
                      {area}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={resetJourney}>
              Start Over
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {selectedWorld1}
            </span>
            <Sparkles className="inline-block w-8 h-8 mx-4 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedWorld2}
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
                        meal.strArea === selectedWorld1
                          ? "default"
                          : "secondary"
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
              <Button size="lg" onClick={resetJourney}>
                Explore More Worlds
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep("welcome")}
              >
                Back to Home
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
