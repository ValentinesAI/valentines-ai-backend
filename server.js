const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("❌ ERROR: OpenAI API Key is missing. Set it in Render environment variables.");
}

// ✅ Default route to check if the server is running
app.get("/", (req, res) => {
    res.send("Valentine's AI Backend is running! 💘");
});

// ✅ API Route (POST request)
app.post("/api/flirty-response", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    if (!OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key" });
    }

    try {
        const openaiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a smooth-talking AI that specializes in flirting and pulling girls. You use clever pickup lines, confidence, and charm to win her over. Always make your responses playful, teasing, and irresistibly attractive."
                    },
                    { role: "user", content: userMessage }
                ],
                max_tokens: 50,
                temperature: 0.85, // Increased for more creative responses
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const flirtyResponse = openaiResponse.data.choices[0].message.content.trim();
        res.json({ response: flirtyResponse });
    } catch (error) {
        console.error("❌ OpenAI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.error?.message || "Failed to generate response" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

