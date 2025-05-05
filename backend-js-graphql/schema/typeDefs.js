import { gql } from "graphql-tag";

const typeDefs = gql`
  type Flashcard {
    id: ID!
    verb: String!
    preposition: String!
    meaning: String!
    difficulty: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type FlashcardPageResult {
    flashcards: [Flashcard!]!
    total: Int!
  }

  type Query {
    getFlashcard(id: ID!): Flashcard
    GetCards(page: Int!, limit: Int!): FlashcardPageResult
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
      status: String
    ): Flashcard
    deleteFlashcard(id: ID!): String
  }
`;

export default typeDefs;
