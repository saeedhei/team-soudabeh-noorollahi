import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    verb: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Verb must be at least 2 characters"],
      maxlength: [50, "Verb must be at most 50 characters"],
    },
    preposition: {
      type: String,
      required: true,
      trim: true,
    },
    meaning: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["known", "almost", "unknown"],
      default: "unknown",
    },
  },
  {
    timestamps: true,
  }
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
