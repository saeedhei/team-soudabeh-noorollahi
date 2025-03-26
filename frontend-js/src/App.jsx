import React from "react";
import Layout from "./components/Layout/Layout";
import FlashcardList from "./components/FlashcardList/FlashcardList";

const flashcards = [
  { id: 1, verb: "essen", preposition: "mit", translation: "to eat with" },
  { id: 2, verb: "sehen", preposition: "auf", translation: "to see on" },
  { id: 3, verb: "gehen", preposition: "zu", translation: "to go to" },
  {
    id: 4,
    verb: "sprechen",
    preposition: "über",
    translation: "to speak about",
  },
  { id: 5, verb: "arbeiten", preposition: "bei", translation: "to work at" },
  { id: 6, verb: "fahren", preposition: "nach", translation: "to drive to" },
  { id: 7, verb: "warten", preposition: "auf", translation: "to wait for" },
  { id: 8, verb: "lesen", preposition: "in", translation: "to read in" },
  { id: 9, verb: "denken", preposition: "an", translation: "to think about" },
  { id: 10, verb: "träumen", preposition: "von", translation: "to dream of" },
];

function App() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <FlashcardList flashcards={flashcards} />
      </div>
    </Layout>
  );
}

export default App;
