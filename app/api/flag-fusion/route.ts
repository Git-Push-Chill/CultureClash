import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint to generate a diagonal-split flag fusion image
 * Takes two country codes and returns an SVG with diagonal split
 * Fetches actual flag images and embeds them as base64 for better compatibility
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const country1 = searchParams.get("country1");
  const country2 = searchParams.get("country2");

  if (!country1 || !country2) {
    return NextResponse.json(
      { error: "Missing country1 or country2 parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch both flag images
    const [flag1Response, flag2Response] = await Promise.all([
      fetch(`https://flagcdn.com/w640/${country1}.png`),
      fetch(`https://flagcdn.com/w640/${country2}.png`),
    ]);

    if (!flag1Response.ok || !flag2Response.ok) {
      throw new Error("Failed to fetch flag images");
    }

    // Convert to base64
    const flag1Buffer = await flag1Response.arrayBuffer();
    const flag2Buffer = await flag2Response.arrayBuffer();
    const flag1Base64 = Buffer.from(flag1Buffer).toString("base64");
    const flag2Base64 = Buffer.from(flag2Buffer).toString("base64");

    // Generate SVG with embedded base64 images for better compatibility
    // Diagonal goes from top-left to bottom-right
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
  <defs>
    <clipPath id="clip1">
      <polygon points="0,0 640,0 0,480"/>
    </clipPath>
    <clipPath id="clip2">
      <polygon points="640,0 640,480 0,480"/>
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${flag1Base64}" width="640" height="480" clip-path="url(#clip1)" preserveAspectRatio="xMidYMid slice"/>
  <image href="data:image/png;base64,${flag2Base64}" width="640" height="480" clip-path="url(#clip2)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    console.error("Error generating flag fusion:", error);
    // Fallback to simple SVG with external references
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="480" viewBox="0 0 640 480">
  <defs>
    <clipPath id="clip1">
      <polygon points="0,0 640,0 0,480"/>
    </clipPath>
    <clipPath id="clip2">
      <polygon points="640,0 640,480 0,480"/>
    </clipPath>
  </defs>
  <image href="https://flagcdn.com/w640/${country1}.png" width="640" height="480" clip-path="url(#clip1)" preserveAspectRatio="xMidYMid slice"/>
  <image href="https://flagcdn.com/w640/${country2}.png" width="640" height="480" clip-path="url(#clip2)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
