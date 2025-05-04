import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query GetCards($page: Int!, $limit: Int!) {
    GetCards(page: $page, limit: $limit) {
      flashcards {
        id
        verb
        preposition
        meaning
        difficulty
        status
      }
      total
    }
  }
`;
