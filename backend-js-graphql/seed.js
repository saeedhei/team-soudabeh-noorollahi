import mongoose from "mongoose";
import dotenv from "dotenv";
import Flashcard from "./models/Flashcard.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

// Generate 80 sample flashcards
const sampleFlashcards = Array.from({ length: 80 }, (_, i) => ({
  verb: `verb${i + 1}`,
  preposition: `pre${i + 1}`,
  meaning: `Sample meaning ${i + 1}`,
  difficulty: ["easy", "medium", "hard"][i % 3], // Rotate difficulty
}));

// Main function to seed the DB
const seedDatabase = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    await Flashcard.deleteMany(); // Clear existing data
    await Flashcard.insertMany(sampleFlashcards); // Insert sample flashcards
    console.log("✅ Seed completed successfully.");

    await mongoose.connection.close(); // Clean disconnect before exiting
    process.exit(); // Exit the process
  } catch (err) {
    console.error("❌ Seed error:", err); // Log error
    process.exit(1);
  }
};

seedDatabase(); // Exit with error code
