import { gql } from "@apollo/client";

// Create
export const CREATE_FLASHCARD = gql`
  mutation CreateFlashcard(
    $verb: String!
    $preposition: String!
    $meaning: String!
    $difficulty: String
  ) {
    createFlashcard(
      verb: $verb
      preposition: $preposition
      meaning: $meaning
      difficulty: $difficulty
    ) {
      id
      verb
    }
  }
`;

// Update
export const UPDATE_FLASHCARD = gql`
  mutation UpdateFlashcard(
    $id: ID!
    $verb: String
    $preposition: String
    $meaning: String
    $difficulty: String
  ) {
    updateFlashcard(
      id: $id
      verb: $verb
      preposition: $preposition
      meaning: $meaning
      difficulty: $difficulty
    ) {
      id
      verb
    }
  }
`;

// Update status only (used in review mode)
export const UPDATE_FLASHCARD_STATUS = gql`
  mutation UpdateFlashcard($id: ID!, $status: String) {
    updateFlashcard(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const DELETE_FLASHCARD = gql`
  mutation DeleteFlashcard($id: ID!) {
    deleteFlashcard(id: $id)
  }
`;
