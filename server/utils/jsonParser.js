export const parseAIJson = (text) => {
  if (!text) {
    throw new Error("AI returned an empty response.");
  }

  // Remove markdown code blocks
  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Extract only the JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI did not return valid JSON.");
  }

  return JSON.parse(text.substring(start, end + 1));
};