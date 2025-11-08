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
    <main className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <h1 className="mt-8 text-6xl font-bold bg-linear-to-r from-green-700 to-[#de5033] bg-clip-text drop-shadow-[0_1px_15px_rgb(161,4,195)] text-transparent">
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
          <Link href="/worlds">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
