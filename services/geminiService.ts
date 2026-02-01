
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const solveGeometryProblem = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `Tu es un expert en mathématiques et géométrie. 
        Aide l'utilisateur à calculer la surface d'un rectangle ou à comprendre la formule. 
        Réponds de manière concise en français. Si l'utilisateur donne des dimensions, extrait-les et calcule le résultat. 
        Utilise le format Markdown pour tes réponses.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je ne peux pas traiter votre demande pour le moment. Vérifiez votre connexion.";
  }
};

export const getSmartExplanation = async (length: number, width: number, unit: string) => {
  const prompt = `Explique brièvement le calcul de la surface d'un rectangle de ${length}${unit} par ${width}${unit}. Pourquoi le résultat est ${length * width}${unit}² ?`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Tu es un tuteur pédagogique. Explique le calcul de surface simplement.",
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    return "La surface est égale à la longueur multipliée par la largeur.";
  }
};
