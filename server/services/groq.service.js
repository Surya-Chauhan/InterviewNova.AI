import Groq from "groq-sdk";

export const askGroq = async (messages) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing in .env");
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = response.choices?.[0]?.message?.content;

    if (!text || !text.trim()) {
      throw new Error("Groq returned an empty response.");
    }

    return text.trim();
  } catch (err) {
    console.error("Groq Error:", err);
    throw err;
  }
};