import { gql } from "@apollo/client";

export const GET_FLASHCARDS = gql`
  query {
    getFlashcards {
      id
      verb
      preposition
      meaning
      difficulty
      status
    }
  }
`;

export const UPDATE_FLASHCARD_STATUS = gql`
  mutation UpdateFlashcardStatus($id: ID!, $status: String!) {
    updateFlashcardStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;
