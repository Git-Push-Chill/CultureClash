import { NextRequest, NextResponse } from "next/server";
import { FusionRecipeRequest, FusionRecipeResponse } from "@/lib/types";
import { generateFusionRecipes } from "@/lib/api/fusion";

/**
 * POST endpoint to generate fusion recipes
 * This is a Next.js API route that delegates to the lib/api/fusion module
 */
export async function POST(request: NextRequest) {
  try {
    const body: FusionRecipeRequest = await request.json();
    const { world1, world2, meals1, meals2 } = body;

    // Validate input
    if (!world1 || !world2 || !meals1 || !meals2) {
      return NextResponse.json(
        { error: "Missing required fields: world1, world2, meals1, meals2" },
        { status: 400 }
      );
    }

    // Generate fusion recipes using the lib/api/fusion module
    const fusionRecipes = await generateFusionRecipes(
      world1,
      world2,
      meals1,
      meals2
    );

    const response: FusionRecipeResponse = {
      fusionRecipes,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating fusion recipes:", error);
    return NextResponse.json(
      {
        error: "Failed to generate fusion recipes",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
