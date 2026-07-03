import { askGroq } from "./groq.service.js";
import { askOpenRouter } from "./openRouter.service.js";

export const askAi = async (messages) => {
  try {
    console.log("🚀 Trying Groq...");

    const result = await askGroq(messages);

    console.log("✅ Groq Success");

    return result;
  } catch (err) {
    console.error("❌ Groq Failed:", err.message);

    console.log("🚀 Falling back to OpenRouter...");

    const result = await askOpenRouter(messages);

    console.log("✅ OpenRouter Success");

    return result;
  }
};