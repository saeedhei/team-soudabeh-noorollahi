// import { gql } from "@apollo/client";

// // Mutation add
// export const ADD_FLASHCARD = gql`
//   mutation AddFlashcard($input: FlashcardInput) {
//     addFlashcard(input: $input) {
//       _id
//       question
//       answer
//     }
//   }
// `;

// // Mutation delete
// export const DELETE_FLASHCARD = gql`
//   mutation DeleteFlashcard($id: ID!) {
//     deleteFlashcard(id: $id) {
//       _id
//     }
//   }
// `;

// // Mutation update
// export const UPDATE_FLASHCARD = gql`
//   mutation UpdateFlashcard($id: ID!, $input: FlashcardInput) {
//     updateFlashcard(id: $id, input: $input) {
//       _id
//       question
//       answer
//     }
//   }
// `;

// // Mutation ( Know, Almost Know, Don't Know)
// export const UPDATE_FLASHCARD_STATUS = gql`
//   mutation UpdateFlashcard($id: ID!, $status: String) {
//     updateFlashcard(id: $id, status: $status) {
//       id
//       status
//     }
//   }
// `;
