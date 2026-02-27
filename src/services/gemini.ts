import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function findNearbyClinics(lat: number, lng: number) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find pet clinics near latitude ${lat}, longitude ${lng}. Return a list of clinics with their names, addresses, and Google Maps links.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });

  return response;
}
