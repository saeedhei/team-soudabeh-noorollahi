import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    verb: {
      type: String,
      required: true,
      trim: true,
      minlength: [2],
      maxlength: [50],
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
  },
  {
    timestamps: true,
  }
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
