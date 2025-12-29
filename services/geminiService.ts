
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMalfunction = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyseer de volgende busstoring beschrijving en geef een categorie, urgentie (Laag, Gemiddeld, Hoog, Kritiek) en een korte suggestie voor de monteur. Beschrijving: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: "De categorie van de storing (bijv. Motor, Elektrisch, Interieur, Remmen).",
            },
            severity: {
              type: Type.STRING,
              description: "De ernst van de storing: Laag, Gemiddeld, Hoog of Kritiek.",
            },
            suggestion: {
              type: Type.STRING,
              description: "Een korte suggestie voor herstel.",
            },
          },
          required: ["category", "severity", "suggestion"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      category: "Onbekend",
      severity: "Gemiddeld",
      suggestion: "Geen AI suggestie beschikbaar.",
    };
  }
};
