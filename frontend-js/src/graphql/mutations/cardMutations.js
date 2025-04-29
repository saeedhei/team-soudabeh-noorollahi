import { gql } from "@apollo/client";

export const UPDATE_FLASHCARD_STATUS = gql`
  mutation UpdateFlashcard($id: ID!, $status: String) {
    updateFlashcard(id: $id, status: $status) {
      id
      status
    }
  }
`;
