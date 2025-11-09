"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAreas } from "@/lib/api/meals";
import { getFlagUrl } from "@/lib/countryMapping";
import { useRouter } from "next/navigation";
import { Globe, ArrowLeft, Plus, Sparkles, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorldFusionSelector() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [world1, setWorld1] = useState<string>("");
  const [world2, setWorld2] = useState<string>("");
  const [searchQuery1, setSearchQuery1] = useState<string>("");
  const [searchQuery2, setSearchQuery2] = useState<string>("");
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadAreas();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#world1-dropdown") &&
        !target.closest("#world1-search")
      ) {
        setIsDropdown1Open(false);
      }
      if (
        !target.closest("#world2-dropdown") &&
        !target.closest("#world2-search")
      ) {
        setIsDropdown2Open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadAreas = async () => {
    setLoading(true);
    const fetchedAreas = await getAreas();
    setAreas(fetchedAreas);
    setLoading(false);
  };

  const handleGenerateFusion = () => {
    if (world1 && world2) {
      router.push(
        `/worlds/${encodeURIComponent(world1)}/${encodeURIComponent(world2)}`
      );
    }
  };

  const handleSelectWorld1 = (area: string) => {
    setWorld1(area);
    setSearchQuery1("");
    setIsDropdown1Open(false);
  };

  const handleSelectWorld2 = (area: string) => {
    setWorld2(area);
    setSearchQuery2("");
    setIsDropdown2Open(false);
  };

  const filteredAreas1 = areas.filter(
    (area) =>
      area.toLowerCase().includes(searchQuery1.toLowerCase()) && area !== world2
  );

  const filteredAreas2 = areas.filter(
    (area) =>
      area.toLowerCase().includes(searchQuery2.toLowerCase()) && area !== world1
  );

  const isReadyToFuse = world1 && world2 && world1 !== world2;

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20" role="status" aria-live="polite">
            <div
              className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"
              aria-hidden="true"
            ></div>
            <p className="mt-4 ">Loading worlds...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-all duration-300 font-bold border-2 border-purple-400/50  hover:bg-linear-to-r hover:from-purple-600 hover:to-purple-400 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        <header className="text-center mb-12" role="banner">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-green-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-gradient-x">
            Create Your Fusion
          </h1>
          <p className="text-lg  max-w-2xl mx-auto">
            Select two cuisine cultures to blend together
          </p>
        </header>

        <div className="max-w-4xl mx-auto" style={{ overflow: "visible" }}>
          {/* Fusion Selector Card */}
          <Card
            className="bg-linear-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50 shadow-2xl shadow-purple-500/20 mb-8 [&]:overflow-visible"
            style={{ overflow: "visible" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Fusion Creator
              </CardTitle>
              <CardDescription className="text-center ">
                Choose two worlds to discover their culinary harmony
              </CardDescription>
            </CardHeader>
            <CardContent
              className="[&]:overflow-visible"
              style={{ overflow: "visible" }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 relative">
                {/* World 1 Dropdown with Flags and Filter */}
                <div className="w-full md:w-80 relative z-30">
                  <label
                    htmlFor="world1-search"
                    className="block text-sm font-medium mb-2"
                  >
                    First Cuisine
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <Input
                        id="world1-search"
                        type="text"
                        placeholder="Search cuisines..."
                        value={searchQuery1 || world1}
                        onChange={(e) => {
                          setSearchQuery1(e.target.value);
                          setIsDropdown1Open(true);
                          if (!e.target.value) setWorld1("");
                        }}
                        onFocus={() => setIsDropdown1Open(true)}
                        className="w-full px-10 py-3 bg-gray-800/80 border-2 border-purple-500/50 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 hover:border-purple-400"
                        aria-label="Search first cuisine"
                        aria-expanded={isDropdown1Open}
                        aria-controls="world1-dropdown"
                      />
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 "
                        aria-hidden="true"
                      />
                      {world1 && (
                        <button
                          onClick={() => {
                            setWorld1("");
                            setSearchQuery1("");
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-white transition-colors"
                          aria-label="Clear selection"
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {isDropdown1Open && (
                      <div
                        id="world1-dropdown"
                        className="absolute z-50 w-full mt-2 bg-gray-800 border-2 border-purple-500/50 rounded-lg shadow-2xl shadow-purple-500/30 max-h-80 overflow-y-auto"
                        role="listbox"
                      >
                        {filteredAreas1.length > 0 ? (
                          filteredAreas1.map((area) => (
                            <button
                              key={area}
                              onClick={() => handleSelectWorld1(area)}
                              className="w-full px-4 py-3 text-left hover:bg-purple-500/20 transition-colors flex items-center gap-3 text-white"
                              role="option"
                              aria-selected={world1 === area}
                            >
                              <Image
                                src={getFlagUrl(area)}
                                alt={`${area} flag`}
                                width={24}
                                height={18}
                                className="rounded shadow-sm"
                              />
                              <span>{area}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3  text-center">
                            No cuisines found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Plus Icon */}
                <div className="flex items-center justify-center">
                  <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-full p-3 shadow-lg shadow-purple-500/50 animate-pulse">
                    <Plus
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      strokeWidth={3}
                    />
                  </div>
                </div>

                {/* World 2 Dropdown with Flags and Filter */}
                <div className="w-full md:w-80 relative z-20">
                  <label
                    htmlFor="world2-search"
                    className="block text-sm font-medium mb-2"
                  >
                    Second Cuisine
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <Input
                        id="world2-search"
                        type="text"
                        placeholder="Search cuisines..."
                        value={searchQuery2 || world2}
                        onChange={(e) => {
                          setSearchQuery2(e.target.value);
                          setIsDropdown2Open(true);
                          if (!e.target.value) setWorld2("");
                        }}
                        onFocus={() => setIsDropdown2Open(true)}
                        className="w-full px-10 py-3 bg-gray-800/80 border-2 border-purple-500/50 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 hover:border-purple-400"
                        aria-label="Search second cuisine"
                        aria-expanded={isDropdown2Open}
                        aria-controls="world2-dropdown"
                      />
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 "
                        aria-hidden="true"
                      />
                      {world2 && (
                        <button
                          onClick={() => {
                            setWorld2("");
                            setSearchQuery2("");
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-white transition-colors"
                          aria-label="Clear selection"
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {isDropdown2Open && (
                      <div
                        id="world2-dropdown"
                        className="absolute z-50 w-full mt-2 bg-gray-800 border-2 border-purple-500/50 rounded-lg shadow-2xl shadow-purple-500/30 max-h-80 overflow-y-auto"
                        role="listbox"
                      >
                        {filteredAreas2.length > 0 ? (
                          filteredAreas2.map((area) => (
                            <button
                              key={area}
                              onClick={() => handleSelectWorld2(area)}
                              className="w-full px-4 py-3 text-left hover:bg-purple-500/20 transition-colors flex items-center gap-3 text-white"
                              role="option"
                              aria-selected={world2 === area}
                            >
                              <Image
                                src={getFlagUrl(area)}
                                alt={`${area} flag`}
                                width={24}
                                height={18}
                                className="rounded shadow-sm"
                              />
                              <span>{area}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3  text-center">
                            No cuisines found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Generate Fusion Button */}
              <div className="text-center">
                <Button
                  onClick={handleGenerateFusion}
                  disabled={!isReadyToFuse}
                  className="cursor-pointer px-8 py-6 text-lg font-bold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={
                    isReadyToFuse
                      ? `Generate fusion between ${world1} and ${world2}`
                      : "Select two different cuisines to generate fusion"
                  }
                >
                  <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                  Generate Fusion
                </Button>
              </div>

              {/* Selection Preview */}
              {world1 && world2 && (
                <div className="mt-6 text-center">
                  {world1 === world2 ? (
                    <p className="text-yellow-400">
                      Please select two different cuisines
                    </p>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <span>Creating fusion:</span>
                      <Image
                        src={getFlagUrl(world1, "w40")}
                        alt={`${world1} flag`}
                        width={32}
                        height={24}
                        className="rounded shadow-md"
                      />
                      <span className="text-2xl ">×</span>
                      <Image
                        src={getFlagUrl(world2, "w40")}
                        alt={`${world2} flag`}
                        width={32}
                        height={24}
                        className="rounded shadow-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
