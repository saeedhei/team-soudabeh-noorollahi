import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// connect to MongoDB
connectDB();

// FlashcardStatus Model
const FlashcardStatusSchema = new mongoose.Schema({
  flashcardId: String,
  status: Number,
  timestamp: { type: Date, default: Date.now },
});

const FlashcardStatus = mongoose.model(
  "FlashcardStatus",
  FlashcardStatusSchema
);

// API
app.post("/api/flashcards/status", async (req, res) => {
  try {
    const { flashcardId, status } = req.body;
    const newStatus = new FlashcardStatus({ flashcardId, status });
    await newStatus.save();
    res.status(201).json({ message: "✅ Status saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error saving status" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
