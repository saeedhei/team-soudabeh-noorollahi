import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
