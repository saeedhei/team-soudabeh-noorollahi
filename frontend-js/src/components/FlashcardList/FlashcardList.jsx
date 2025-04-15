import React, { useState } from "react";
import {Flashcard, FlashcardNavigation} from "../Flashcard";

import { useMutation } from "@apollo/client";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [updateFlashcardStatus] = useMutation(UPDATE_FLASHCARD_STATUS);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  const handleCardStatus = async (statusCode) => {
    const statusMap = {
      0: "known",
      1: "almost",
      2: "unknown",
    };
    const status = statusMap[statusCode];
    const currentFlashcard = flashcards[currentIndex];

    try {
      //  send mutation to backend
      await updateFlashcardStatus({
        variables: {
          id: currentFlashcard.id,
          status,
        },
      });
      console.log(`Status updated to: ${status}`);
    } catch (error) {
      console.error("Update failed", error);
    }

    handleNext(); // Next card
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Flashcard
        flashcard={currentFlashcard}
        isFlipped={isFlipped}
        handleFlip={handleFlip}
        handleCardStatus={handleCardStatus}
      />
      {/* {isFlipped && <FlashcardButtons handleCardStatus={handleCardStatus} />} */}
      <FlashcardNavigation
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleReset={handleReset}
        currentIndex={currentIndex}
        total={flashcards.length}
      />
    </div>
  );
}

export default FlashcardList;
