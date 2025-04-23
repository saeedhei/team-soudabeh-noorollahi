import React from "react";
import FlashcardForm from "./FlashcardForm";
import FlashcardTable from "./FlashcardTable";

const CardsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cards</h2>
      <FlashcardForm />
      <FlashcardTable />
    </div>
  );
};

export default CardsPage;
