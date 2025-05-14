import { gql } from "@apollo/client";

//  Get paginated flashcards
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

// 📌 Search flashcards (for SearchBar)
export const SEARCH_FLASHCARDS = gql`
  query SearchFlashcards($term: String!) {
    searchFlashcards(term: $term) {
      id
      verb
      preposition
      meaning
      difficulty
      status
      createdAt
    }
  }
`;


