import Flashcard from "../models/Flashcard.js";

const resolvers = {
  Query: {
    getFlashcards: async () => {
      return await Flashcard.find();
    },
    getFlashcard: async (_, { id }) => {
      return await Flashcard.findById(id);
    },
  },
  Mutation: {
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
    updateFlashcard: async (
      _,
      { id, verb, preposition, meaning, difficulty }
    ) => {
      const updatedFlashcard = await Flashcard.findByIdAndUpdate(
        id,
        { verb, preposition, meaning, difficulty },
        { new: true }
      );
      return updatedFlashcard;
    },
    deleteFlashcard: async (_, { id }) => {
      await Flashcard.findByIdAndDelete(id);
      return "Flashcard deleted successfully!";
    },
  },
};

export default resolvers;
