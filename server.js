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
app.post("/api/flirty-response", async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }
    res.json({ response: `Flirty AI says: "${userMessage}, but make it romantic! 💘"` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
