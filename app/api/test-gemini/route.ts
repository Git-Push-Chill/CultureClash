import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * GET endpoint to test Gemini API connection
 * This endpoint verifies that the API key is configured and working
 */
export async function GET(request: NextRequest) {
  try {
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY not found in environment variables",
          hint: "Make sure you have created a .env.local file with GEMINI_API_KEY and restarted the dev server",
        },
        { status: 500 }
      );
    }

    // Test the API key with a simple request
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Say 'Hello! API connection successful.' in one sentence.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: "Gemini API connection successful!",
      apiKeyConfigured: true,
      apiKeyLength: apiKey.length,
      testResponse: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error testing Gemini API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Gemini API",
        details: error instanceof Error ? error.message : "Unknown error",
        hint:
          error instanceof Error && error.message.includes("API_KEY_INVALID")
            ? "Your API key appears to be invalid. Please check your .env.local file"
            : "Check the server logs for more details",
      },
      { status: 500 }
    );
  }
}
