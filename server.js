const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Default Route (Optional)
app.get("/", (req, res) => {
    res.send("Valentine's AI Backend is running! 💘");
});

// ✅ Fix API Route
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get("/", (req, res) => {
    res.send("Valentine's AI Backend is running! 💘");
});

app.post("/api/flirty-response", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const openaiResponse = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davi


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
