import { gql } from "graphql-tag";

const typeDefs = gql`
  type Flashcard {
    id: ID!
    verb: String!
    preposition: String!
    meaning: String!
    difficulty: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getFlashcards: [Flashcard]
    getFlashcard(id: ID!): Flashcard
  }

  type Mutation {
    createFlashcard(
      verb: String!
      preposition: String!
      meaning: String!
      difficulty: String
    ): Flashcard
    updateFlashcard(
      id: ID!
      verb: String
      preposition: String
      meaning: String
      difficulty: String
    ): Flashcard
    deleteFlashcard(id: ID!): String
  }
`;

export default typeDefs;
