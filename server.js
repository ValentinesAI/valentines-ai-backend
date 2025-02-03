const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store your API key in .env
console.log("OpenAI API Key:", OPENAI_API_KEY);


// Generate a pickup line
app.post("/api/pickup-line", async (req, res) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: "Generate a modern, funny, and flirty pickup line for a Gen Z audience:",
            max_tokens: 50
        }, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Generate a flirty response
app.post("/api/flirty-response", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: `Flirty AI: The user received this message: "${message}". Respond in a smooth, playful, and flirty way that sounds like Gen Z flirting.`,
            max_tokens: 60
        }, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));