import { askGemini } from "./gemini.service.js";
import { askOpenRouter } from "./openRouter.service.js";

export const askAi = async (messages) => {
    // Try Gemini first
    try {
        console.log("🚀 Trying Gemini...");
        return await askGemini(messages);
    } catch (geminiError) {
        console.error("❌ Gemini Failed:", geminiError.message);
    }

    // Fallback to OpenRouter
    try {
        console.log("🚀 Falling back to OpenRouter...");
        return await askOpenRouter(messages);
    } catch (openRouterError) {
        console.error("❌ OpenRouter Failed:", openRouterError.message);
    }

    // Both providers failed
    throw new Error(
        "All AI providers are currently unavailable. Please try again later."
    );
};