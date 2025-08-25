import Flashcard from "../models/Flashcard.js";

const resolvers = {
  Query: {
    // Get a single flashcard
    getFlashcard: async (_, { id }) => {
      return await Flashcard.findById(id);
    },

    // Get flashcards with pagination
    GetCards: async (_, { page, limit, status }) => {
      const skip = (page - 1) * limit;

      // Support existing lowercase values in DB (known/almost/unknown)
      const filter = {};
      if (status) {
        // case-insensitive equality without regex on the client-side enum
        filter.status = { $in: [status, status.toLowerCase()] };
      }

      const flashcards = await Flashcard.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total = await Flashcard.countDocuments();
      return { flashcards, total };
    },

    //  Search flashcards
    searchFlashcards: async (_, { term }) => {
      const regex = new RegExp(term, "i"); // case-insensitive
      return await Flashcard.find({
        $or: [{ verb: regex }, { preposition: regex }, { meaning: regex }],
      });
    },

    getAllFlashcards: async () => {
      return await Flashcard.find().sort({ _id: -1 });
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
