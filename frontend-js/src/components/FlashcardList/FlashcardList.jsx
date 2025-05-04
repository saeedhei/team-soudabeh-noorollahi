import React, { useState } from "react";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations/cardMutations";
import Flashcard from "../Flashcard/Flashcard";
import FlashcardNavigation from "../Flashcard/FlashcardNavigation";
import ProgressStats from "../Flashcard/ProgressStats";
import { useMutation } from "@apollo/client";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

    if (!currentFlashcard) {
      console.error("No flashcard at current index!");
      return;
    }

    try {
      console.log("Sending mutation with:", {
        id: currentFlashcard?.id,
        status,
      });

      await updateFlashcardStatus({
        variables: {
          id: currentFlashcard.id,
          status,
        },
      });

      setStatusCount((prev) => ({ ...prev, [status]: prev[status] + 1 }));

      // go to next car
      if (currentIndex < flashcards.length - 1) {
        setIsFlipped(false); //Turn the card over
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        alert("You've completed all cards! 🎉");
        handleReset(); // Reset cards
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Progress bar */}
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

      {/* Navigation buttons */}
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
