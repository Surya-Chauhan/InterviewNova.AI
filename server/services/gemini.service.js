import { GoogleGenAI } from "@google/genai";
console.log("Gemini in service:", process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (messages) => {
  const prompt = messages
    .map((m) => `${m.role.toUpperCase()}:\n${m.content}`)
    .join("\n\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};