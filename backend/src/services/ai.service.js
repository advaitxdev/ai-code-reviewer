const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function generateContent(prompt) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: prompt,
    system_instruction: `You are a code reviewer with expertise in software engineering, security, and clean code principles. Provide a detailed review of the submitted code: highlight bugs, security vulnerabilities, efficiency bottlenecks, and best practice improvements, with clear before/after snippets where helpful.`,
  });

  return interaction.output_text;
}

module.exports = generateContent;
