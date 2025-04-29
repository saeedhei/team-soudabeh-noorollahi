import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      verb
      preposition
      meaning
      difficulty
      status
    }
  }
`;
