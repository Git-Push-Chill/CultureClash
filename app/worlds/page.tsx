"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAreas } from "@/lib/api/meals";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WorldsPage() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedAreas = await getAreas();
      setAreas(fetchedAreas);
    } catch (err) {
      setError("Failed to load cultures. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWorld = (world: string) => {
    router.push(`/worlds/${encodeURIComponent(world)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, world: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectWorld(world);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" role="main" aria-busy="true">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" role="main">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <p className="text-red-500 mb-4 text-lg">{error}</p>
            <Button onClick={loadAreas} aria-label="Retry loading cultures">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" role="main">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              aria-label="Go back to home page"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </nav>

        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white drop-shadow-lg">
            Choose Your Home World
          </h1>
          <p className="text-base sm:text-lg text-gray-200 drop-shadow-md">
            Select your favorite food culture to begin
          </p>
        </header>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto"
          role="list"
          aria-label="Available food cultures"
        >
          {areas.map((area) => (
            <div key={area} role="listitem">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                onClick={() => handleSelectWorld(area)}
                onKeyDown={(e) => handleKeyDown(e, area)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${area} cuisine`}
              >
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-center">
                    {area}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
