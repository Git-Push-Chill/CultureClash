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
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading worlds...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen" role="main">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link href="/worlds">
            <Button
              variant="outline"
              size="sm"
              aria-label="Go back to worlds selection"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Worlds
            </Button>
          </Link>
        </nav>

        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white drop-shadow-lg">
            Choose Another World to Explore
          </h1>
          <p className="text-base sm:text-lg text-gray-200 drop-shadow-md">
            Blend {world1} with another culture
          </p>
        </header>

        <div className="text-center mb-6" role="status" aria-live="polite">
          <Badge variant="secondary" className="text-base sm:text-lg px-4 py-2">
            <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
            Home World: {world1}
          </Badge>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto"
          role="list"
          aria-label="Available cultures to blend with"
        >
          {areas
            .filter((area) => area !== world1)
            .map((area) => (
              <div key={area} role="listitem">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 focus-within:ring-2 focus-within:ring-primary"
                  onClick={() => handleSelectWorld2(area)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Blend ${world1} with ${area} cuisine`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectWorld2(area);
                    }
                  }}
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
