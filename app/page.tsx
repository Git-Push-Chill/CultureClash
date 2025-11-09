"use client";

import { useState, useEffect } from "react";
import type { Meal, SearchHistoryItem, BridgeProfile } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Heart, ChefHat, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchHistoryModal } from "@/components/ui/search-history-modal";

export default function Home() {
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [blendedMeals, setBlendedMeals] = useState<Meal[]>([]);
  const [step, setStep] = useState<"welcome" | "explore">("welcome");
  const [selectedWorld1, setSelectedWorld1] = useState("");
  const [selectedWorld2, setSelectedWorld2] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("bridgeProfile");
    if (stored) {
      const profile: BridgeProfile = JSON.parse(stored);
      setFavoriteFoods(profile.favoriteFoods || []);
      setExploredWorlds(profile.exploredWorlds || []);
      setSearchHistory(profile.searchHistory || []);
    }
  };

  const saveToLocalStorage = (
    foods: string[],
    worlds: string[],
    meals?: Meal[]
  ) => {
    const newHistory = meals
      ? [
          {
            world1: selectedWorld1,
            world2: selectedWorld2,
            timestamp: Date.now(),
            meals,
          },
          ...searchHistory,
        ].slice(0, 10)
      : searchHistory;

    localStorage.setItem(
      "bridgeProfile",
      JSON.stringify({
        favoriteFoods: foods,
        exploredWorlds: worlds,
        searchHistory: newHistory,
      })
    );
    setSearchHistory(newHistory);
  };

  const handleStartJourney = () => {
    router.push("/worlds");
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto p-4 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center mb-8">
            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-green-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-gradient-x">
              Culture Clash
            </h1>
          </div>
          <div className="relative inline-block">
            <Sparkles className="absolute -top-2 -left-8 w-6 h-6 text-yellow-400 animate-bounce" />
            <p className="text-2xl md:text-3xl text-white mb-4 font-semibold">
              Where Taste Bridges Worlds
            </p>
            <Sparkles className="absolute -bottom-2 -right-8 w-6 h-6 text-yellow-400 animate-bounce delay-300" />
          </div>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mt-6">
            Discover unique cross-cultural experiences by fusing cuisines from
            different worlds. Choose your favorite culture and explore another
            to create something extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card
            className={`text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-2 bg-linear-to-r from-[#442763] to-[#2d1942] border-2 border-blue-300/50 hover:border-blue-200/70 group ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
            onClick={handleStartJourney}
          >
            <CardHeader>
              <Globe className="w-12 h-12 mx-auto mb-4 text-blue-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <CardTitle className="text-xl text-blue-100 group-hover:text-blue-300 transition-colors">
                Choose Your World
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-gray-200 transition-colors">
                Select your favorite food culture to start your journey
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className={`text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 hover:-translate-y-2 bg-linear-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-400/30 hover:border-yellow-400 group ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
            onClick={() => setShowHistory(true)}
          >
            <CardHeader>
              <ChefHat className="w-12 h-12 mx-auto mb-4 text-yellow-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <CardTitle className="text-xl group-hover:text-yellow-300 transition-colors">
                Explore Again
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-gray-200 transition-colors">
                Pick a different world to blend with your favorite
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className={`text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-2 bg-linear-to-br from-pink-500/10 to-red-500/10 border-2 border-pink-400/30 hover:border-pink-400 group ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <CardHeader>
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500 transition-transform duration-500 group-hover:scale-110 group-hover:fill-pink-500" />
              <CardTitle className="text-xl group-hover:text-red-300 transition-colors">
                Discover Magic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-gray-200 transition-colors">
                View curated dishes that blend both cultures
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {exploredWorlds.length > 0 && (
          <div
            className={`max-w-4xl mx-auto mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-lg font-semibold mb-3 text-center text-white flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Your Journey So Far
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {exploredWorlds.slice(-5).map((world, index) => (
                <Badge
                  key={world}
                  variant="default"
                  className="text-sm px-4 py-2 bg-linear-to-r from-[#442763] to-[#2d1942] border-2 border-blue-300/50 text-blue-100 hover:scale-110 hover:border-blue-200/70 transition-all cursor-default animate-fade-in font-medium shadow-lg shadow-blue-400/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {world}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {favoriteFoods.length > 0 && (
          <div
            className={`max-w-4xl mx-auto mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <h3 className="text-lg font-semibold mb-3 text-center text-white flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              Your Favorite Dishes
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {favoriteFoods.slice(-5).map((food, index) => (
                <Badge
                  key={food}
                  variant="default"
                  className="text-sm px-4 py-2 bg-linear-to-r from-pink-500 to-purple-500 border-2 border-pink-300 hover:scale-110 hover:border-pink-200 transition-all cursor-default animate-fade-in font-medium shadow-lg shadow-pink-500/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* New Card for Previous Adventures */}
        <div
          className={`max-w-4xl mx-auto mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        ></div>

        {/* Search History Modal */}
        <SearchHistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={searchHistory}
        />
      </div>
    </main>
  );
}
