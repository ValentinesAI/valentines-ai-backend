const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ✅ Default route for checking if the server is running
app.get("/", (req, res) => {
    res.send("Valentine's AI Backend is running! 💘");
});

// ✅ Fix API Route (POST request)
app.post("/api/flirty-response", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const openaiResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
        model: "gpt-3.5-turbo",  // ✅ Updated model
        messages: [
            { role: "system", content: "You are a flirty chatbot that generates charming responses." },
            { role: "user", content: userMessage }
        ],
        max_tokens: 50,
        temperature: 0.7,
    },
    {
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
    }
);

        const flirtyResponse = openaiResponse.data.choices[0].text.trim();
        res.json({ response: flirtyResponse });
    } catch (error) {
        console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
