import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
    // Allow base64 data URLs for AI-generated images
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
};

export default nextConfig;
