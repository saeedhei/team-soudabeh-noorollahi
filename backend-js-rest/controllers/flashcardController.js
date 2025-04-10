import Flashcard from "../models/Flashcard.js";

// Get all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "❌ Error retrieving flashcards" });
  }
};

// Get a single flashcard by ID
export const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard)
      return res.status(404).json({ error: "Flashcard not found" });
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: "❌ Error retrieving flashcard" });
  }
};

// Create a new flashcard
export const createFlashcard = async (req, res) => {
  try {
    const { verb, preposition, meaning, difficulty } = req.body;
    const newFlashcard = new Flashcard({
      verb,
      preposition,
      meaning,
      difficulty,
    });
    await newFlashcard.save();
    res.status(201).json({ message: "✅ Flashcard created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error creating flashcard" });
  }
};

// Update flashcard by ID
export const updateFlashcard = async (req, res) => {
  try {
    const updated = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Flashcard not found" });
    res.status(200).json({ message: "✅ Flashcard updated", updated });
  } catch (error) {
    res.status(500).json({ error: "❌ Error updating flashcard" });
  }
};

// Delete flashcard by ID
export const deleteFlashcard = async (req, res) => {
  try {
    const deleted = await Flashcard.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Flashcard not found" });
    res.status(200).json({ message: "🗑️ Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error deleting flashcard" });
  }
};
