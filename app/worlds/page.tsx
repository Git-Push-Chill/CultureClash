"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAreas } from "@/lib/api/meals";
import { useRouter } from "next/navigation";
import { Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SelectFirstWorld() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    setLoading(true);
    const fetchedAreas = await getAreas();
    setAreas(fetchedAreas);
    setLoading(false);
  };

  const handleSelectWorld = (world: string) => {
    router.push(`/worlds/${encodeURIComponent(world)}`);
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        <header className="text-center mb-12" role="banner">
          <Globe
            className="w-16 h-16 mx-auto mb-4 text-purple-500"
            aria-hidden="true"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your First World
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select a cuisine culture to begin your fusion journey
          </p>
        </header>

        <section
          aria-label="Available cuisine worlds"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {areas.map((area, index) => (
            <Card
              key={area}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 bg-linear-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400 group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleSelectWorld(area)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectWorld(area);
                }
              }}
              aria-label={`Select ${area} cuisine`}
            >
              <CardHeader>
                <CardTitle className="text-center text-white group-hover:text-purple-300 transition-colors">
                  {area}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
