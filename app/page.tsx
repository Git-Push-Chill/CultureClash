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
import { Globe, Heart, ChefHat } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("bridgeProfile");
    if (stored) {
      const profile = JSON.parse(stored);
      setFavoriteFoods(profile.favoriteFoods || []);
      setExploredWorlds(profile.exploredWorlds || []);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <h1 className="mt-4 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-green-700 to-[#de5033] bg-clip-text drop-shadow-[0_1px_15px_rgb(161,4,195)] text-transparent">
              Culture Clash
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-[#ffffff] mb-3 sm:mb-4 font-semibold drop-shadow-lg">
            Where Taste Bridges Worlds
          </p>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto px-4 drop-shadow-md">
            Discover unique cross-cultural experiences by fusing cuisines from
            different worlds. Choose your favorite culture and explore another
            to create something extraordinary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
          <Card
            className="text-center"
            role="article"
            aria-labelledby="choose-world-title"
          >
            <CardHeader>
              <Globe
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-400"
                aria-hidden="true"
              />
              <CardTitle
                id="choose-world-title"
                className="text-lg sm:text-2xl"
              >
                Choose Your World
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                Select your favorite food culture to start your journey
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="text-center"
            role="article"
            aria-labelledby="explore-another-title"
          >
            <CardHeader>
              <ChefHat
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#c39c39]"
                aria-hidden="true"
              />
              <CardTitle
                id="explore-another-title"
                className="text-lg sm:text-2xl"
              >
                Explore Another
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                Pick a different world to blend with your favorite
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="text-center sm:col-span-2 md:col-span-1"
            role="article"
            aria-labelledby="discover-magic-title"
          >
            <CardHeader>
              <Heart
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-pink-600"
                aria-hidden="true"
              />
              <CardTitle
                id="discover-magic-title"
                className="text-lg sm:text-2xl"
              >
                Discover Magic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                View curated dishes that blend both cultures
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {exploredWorlds.length > 0 && (
          <div
            className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4"
            role="region"
            aria-label="Your explored cultures"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-center text-white drop-shadow-md">
              Your Journey So Far
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {exploredWorlds.map((world) => (
                <Badge
                  key={world}
                  variant="secondary"
                  className="text-xs sm:text-sm"
                >
                  {world}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {favoriteFoods.length > 0 && (
          <div
            className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4"
            role="region"
            aria-label="Your favorite dishes"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-center text-white drop-shadow-md">
              Your Favorite Dishes
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {favoriteFoods.map((food) => (
                <Badge
                  key={food}
                  variant="default"
                  className="text-xs sm:text-sm"
                >
                  <Heart className="w-3 h-3 mr-1" aria-hidden="true" />
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/worlds">
            <Button
              size="lg"
              className="text-lg px-6 sm:px-8 py-4 sm:py-6"
              aria-label="Start your cultural food journey"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
