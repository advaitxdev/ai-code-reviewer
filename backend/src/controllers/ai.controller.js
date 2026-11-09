const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await aiService(prompt);
    res.send(response);
  } catch (error) {
    console.error("AI Service Error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
};