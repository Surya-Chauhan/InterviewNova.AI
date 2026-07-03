import axios from "axios";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const askOpenRouter = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: "nvidia/nemotron-3-super-120b-a12b:free",
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("OpenRouter returned an empty response.");
        }

        console.log("✅ OpenRouter Success");

        return content;
    } catch (error) {
        console.error(
            "❌ OpenRouter:",
            error.response?.data || error.message
        );

        throw error;
    }
};