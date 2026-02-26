import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTravelPlan(destination, days) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `Create a detailed ${days}-day travel plan for ${destination}. 

Return ONLY a valid JSON object with this exact structure:
{
  "destinationName": "string",
  "days": number,
  "title": "string (catchy title)",
  "subtitle": "string (brief tagline)",
  "description": "string (2-3 sentences)",
  "highlights": [
    {
      "name": "string",
      "icon": "string (lucide icon name)",
      "rating": "number (4.5-5.0)",
      "description": "string",
      "color": "string (emerald/orange/blue/purple/yellow/rose)"
    }
  ],
  "tips": {
    "gastronomy": "string",
    "smartTravel": "string",
    "budget": "string (format: $XXX - $XXX per person)"
  },
  "itinerary": [
    {
      "day": number,
      "title": "string",
      "activities": [
        {
          "time": "string (HH:MM AM/PM)",
          "activity": "string",
          "note": "string (optional tip)"
        }
      ]
    }
  ]
}

Make it engaging and practical. Include 5-6 highlights minimum.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response to get only JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from Gemini");
    }

    const planData = JSON.parse(jsonMatch[0]);
    return planData;
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Failed to generate travel plan");
  }
}

export async function isTravelRelated(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const checkPrompt = `Is this prompt about traveling to a place, visiting a destination, vacation planning, or tourism? 

Answer with ONLY the word "YES" or "NO". Nothing else.

Examples:
- "4 days in Paris" -> YES
- "Visit Japan" -> YES
- "How to cook pasta" -> NO
- "Tell me a joke" -> NO

Prompt: "${prompt}"

Answer (YES or NO):`;

  try {
    const result = await model.generateContent(checkPrompt);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();

    // Check if response contains YES
    return text.includes("YES");
  } catch (e) {
    console.error("Gemini validation error:", e);
    // If validation fails, assume it's travel-related to not block users
    return true;
  }
}
