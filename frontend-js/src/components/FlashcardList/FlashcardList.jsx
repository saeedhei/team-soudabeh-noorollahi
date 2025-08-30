import React, { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations/cardMutations";
import Flashcard from "../Flashcard/Flashcard";
import FlashcardNavigation from "../Flashcard/FlashcardNavigation";
import ProgressStats from "../Flashcard/ProgressStats";

const normalize = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase();

function FlashcardList({ cards: cardsProp, onRefetch }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [updateFlashcardStatus] = useMutation(UPDATE_FLASHCARD_STATUS);

  const cards = useMemo(() => cardsProp, [cardsProp]);

  // Counting categories by status (based on the *current working list*)
  const statusCount = useMemo(() => {
    return {
      known: cards.filter((c) => normalize(c.status) === "known").length,
      almost: cards.filter((c) => normalize(c.status) === "almost").length,
      unknown: cards.filter((c) => normalize(c.status) === "unknown").length,
    };
  }, [cards]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleFlip = () => setIsFlipped((f) => !f);

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  const handleCardStatus = async (statusCode) => {
    const statusMap = { 0: "known", 1: "almost", 2: "unknown" };
    const status = statusMap[statusCode];
    const currentFlashcard = cards[currentIndex];

    if (!currentFlashcard) return;

    try {
      await updateFlashcardStatus({
        variables: { id: currentFlashcard.id, status },
      });

      // Refetch: prefer parent refetch if provided; else fallback to local
      if (onRefetch) {
        await onRefetch();
      }

      // Move forward if possible (use the current list length)
      setIsFlipped(false);
      setCurrentIndex((i) => {
        const next = i + 1;
        return next < cards.length ? next : 0;
      });
    } catch (error) {
      console.error("Error updating flashcard status", error);
      alert("There was an error updating the card status. Please try again.");
    }
  };

  const currentFlashcard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <ProgressStats
        currentIndex={currentIndex}
        total={cards.length}
        statusCount={statusCount}
      />

      <Flashcard
        key={currentFlashcard.id}
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
        total={cards.length}
      />
    </div>
  );
}

export default FlashcardList;
