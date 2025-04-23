import React, { useState } from "react";

import Flashcard from "../Flashcard/Flashcard";
import FlashcardNavigation from "../Flashcard/FlashcardNavigation";
import ProgressStats from "../Flashcard/ProgressStats";

import { useMutation } from "@apollo/client";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // statusCounter
  const [statusCount, setStatusCount] = useState({
    known: 0,
    almost: 0,
    unknown: 0,
  });

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
    setStatusCount({ known: 0, almost: 0, unknown: 0 });
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

      // Increase status count
      setStatusCount((prev) => {
        const newCount = { ...prev };
        newCount[status] += 1;
        return newCount;
      });

      // If we reach the last card, let's start over.
      if (currentIndex === flashcards.length - 1) {
        setCurrentIndex(0); // Return to the first card
        setStatusCount({ known: 0, almost: 0, unknown: 0 }); //Reset statuses
      } else {
        handleNext(); // Show next card
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Progress bar*/}
      <ProgressStats
        currentIndex={currentIndex}
        total={flashcards.length}
        statusCount={statusCount}
      />

      <Flashcard
        flashcard={currentFlashcard}
        isFlipped={isFlipped}
        handleFlip={handleFlip}
        handleCardStatus={handleCardStatus}
      />

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
