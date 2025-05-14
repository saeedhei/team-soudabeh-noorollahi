import Flashcard from "../models/Flashcard.js";

const resolvers = {
  Query: {
    // Get a single flashcard
    getFlashcard: async (_, { id }) => {
      return await Flashcard.findById(id);
    },
    // Get flashcards with pagination
    GetCards: async (_, { page, limit }) => {
      const skip = (page - 1) * limit;
      const flashcards = await Flashcard.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
      const total = await Flashcard.countDocuments();
      return { flashcards, total };
    },
  },
  Mutation: {
    // Create new flashcard
    createFlashcard: async (_, { verb, preposition, meaning, difficulty }) => {
      const newFlashcard = new Flashcard({
        verb,
        preposition,
        meaning,
        difficulty,
      });
      await newFlashcard.save();
      return newFlashcard;
    },
    // Update existing flashcard
    updateFlashcard: async (
      _,
      { id, verb, preposition, meaning, difficulty, status }
    ) => {
      const updatedFlashcard = await Flashcard.findByIdAndUpdate(
        id,
        { verb, preposition, meaning, difficulty, status },
        { new: true }
      );
      return updatedFlashcard;
    },
    // Delete flashcard
    deleteFlashcard: async (_, { id }) => {
      await Flashcard.findByIdAndDelete(id);
      return "Flashcard deleted successfully!";
    },
  },
};

export default resolvers;
