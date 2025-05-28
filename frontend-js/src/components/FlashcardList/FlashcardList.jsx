
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../../graphql/queries/cardQueries";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations/cardMutations";
import Flashcard from "../Flashcard/Flashcard";
import FlashcardNavigation from "../Flashcard/FlashcardNavigation";
import ProgressStats from "../Flashcard/ProgressStats";

function FlashcardList() {
  // It queries itself and receives the data.
  const { loading, error, data, refetch } = useQuery(GET_ALL_CARDS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [updateFlashcardStatus] = useMutation(UPDATE_FLASHCARD_STATUS);

  if (loading) return <p>Loading flashcards...</p>;
  if (error) return <p>Error loading flashcards!</p>;

  const flashcards = data.getAllFlashcards;

  //Counting categories by status
  const statusCount = {
    known: flashcards.filter((card) => card.status === "known").length,
    almost: flashcards.filter((card) => card.status === "almost").length,
    unknown: flashcards.filter((card) => card.status === "unknown").length,
  };

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

    if (!currentFlashcard) return;

    try {
      await updateFlashcardStatus({
        variables: { id: currentFlashcard.id, status },
      });

      // Refetch after mutation to get updated data
      await refetch();

      // After refreshing, we move on to the next card.
      if (currentIndex < flashcards.length - 1) {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        alert("You've completed all cards! 🎉");
        handleReset();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
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
