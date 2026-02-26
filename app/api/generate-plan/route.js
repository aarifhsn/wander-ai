import { generateTravelPlan, isTravelRelated } from "@/lib/gemini";
import { fetchDestinationImages } from "@/lib/imageApi";
import { TravelPlan } from "@/models/TravelPlan";
import { slugify } from "@/utils/slugify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Check if prompt is travel-related
    const isTravel = await isTravelRelated(prompt);

    if (!isTravel) {
      return NextResponse.json(
        { error: "Please provide a travel-related prompt" },
        { status: 400 },
      );
    }

    // Extract destination and days from prompt using Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const extractionPrompt = `Extract the destination and number of days from this travel prompt. Return ONLY a JSON object with this exact format: {"destination": "Paris", "days": 4}

Prompt: "${prompt}"

Return only the JSON, nothing else.`;

    const extractResult = await model.generateContent(extractionPrompt);
    const extractText = extractResult.response.text();
    console.log("🔤 Raw extraction response:", extractText);

    const jsonMatch = extractText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract destination and days from prompt");
    }

    const extracted = JSON.parse(jsonMatch[0]);
    const destination = extracted.destination;
    const days = parseInt(extracted.days);

    // Check if plan already exists in database
    const existingPlan = await TravelPlan.findByDestinationAndDays(
      destination,
      days,
    );

    if (existingPlan) {
      return NextResponse.json({
        slug: existingPlan.slug,
        fromCache: true,
      });
    }

    // Generate new plan with Gemini
    const planData = await generateTravelPlan(destination, days);

    // Fetch images from Unsplash
    const images = await fetchDestinationImages(destination, 5);

    // Create slug
    const slug = slugify(destination, days);

    // Save to database
    const completePlan = {
      slug,
      destinationName: planData.destinationName,
      days: planData.days,
      title: planData.title,
      subtitle: planData.subtitle,
      description: planData.description,
      highlights: planData.highlights,
      tips: planData.tips,
      itinerary: planData.itinerary,
      images: images,
      heroImage: images[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await TravelPlan.create(completePlan);

    return NextResponse.json({
      slug,
      fromCache: false,
    });
  } catch (error) {
    console.error("❌ Generate plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate travel plan", details: error.message },
      { status: 500 },
    );
  }
}
