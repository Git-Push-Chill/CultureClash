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
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/worlds">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Worlds
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Choose Another World to Explore
          </h2>
          <p className="text-gray-600">Blend {world1} with another culture</p>
        </div>

        <div className="text-center mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Home World: {world1}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {areas
            .filter((area) => area !== world1)
            .map((area) => (
              <Card
                key={area}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => handleSelectWorld2(area)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-center">{area}</CardTitle>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}
