"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAreas } from "@/lib/api/meals";
import { useRouter, useParams } from "next/navigation";
import { Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SecondWorldPage() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const world1 = decodeURIComponent(params.world1 as string);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    setLoading(true);
    const fetchedAreas = await getAreas();
    setAreas(fetchedAreas);
    setLoading(false);
  };

  const handleSelectWorld2 = (world2: string) => {
    router.push(
      `/worlds/${encodeURIComponent(world1)}/${encodeURIComponent(world2)}`
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20" role="status" aria-live="polite">
            <div
              className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"
              aria-hidden="true"
            ></div>
            <p className="mt-4 text-gray-300">Loading worlds...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-8 max-w-6xl">
        <nav
          className="mb-6 flex justify-between items-center"
          aria-label="Navigation"
        >
          <Link href="/worlds">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-all duration-300 font-bold border-2 border-purple-400/50 text-purple-300 hover:bg-linear-to-r hover:from-purple-600 hover:to-purple-400 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              aria-label="Go back to explore different worlds"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Explore Different Worlds
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-all duration-300 font-bold border-2 border-purple-400/50 text-purple-300 hover:bg-linear-to-r hover:from-purple-600 hover:to-purple-400 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              aria-label="Back to Home"
            >
              Back to Home
            </Button>
          </Link>
        </nav>

        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-green-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
            Choose Another World to Explore
          </h1>
          <p className="text-lg text-gray-300">
            Blend {world1} with another culture
          </p>
        </header>

        <div
          className="text-center mb-6"
          role="status"
          aria-label="Selected home world"
        >
          <Badge
            variant="secondary"
            className="text-lg px-4 py-2 bg-linear-to-r from-[#442763] to-[#2d1942] shadow-lg shadow-purple-500/20"
          >
            <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
            Home World: {world1}
          </Badge>
        </div>

        <section
          aria-label="Available cultures to blend with"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {areas
            .filter((area) => area !== world1)
            .map((area, index) => (
              <Card
                key={area}
                className="cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in bg-linear-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 hover:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-900"
                onClick={() => handleSelectWorld2(area)}
                style={{ animationDelay: `${index * 50}ms` }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectWorld2(area);
                  }
                }}
                aria-label={`Blend ${world1} with ${area} cuisine`}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-center">{area}</CardTitle>
                </CardHeader>
              </Card>
            ))}
        </section>
      </div>
    </main>
  );
}
