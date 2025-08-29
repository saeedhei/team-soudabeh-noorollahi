import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../../graphql/queries/cardQueries";
import { UPDATE_FLASHCARD_STATUS } from "../../graphql/mutations/cardMutations";
import Flashcard from "../Flashcard/Flashcard";
import FlashcardNavigation from "../Flashcard/FlashcardNavigation";
import ProgressStats from "../Flashcard/ProgressStats";

const normalize = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase();

function FlashcardList({ cards: cardsProp, onRefetch }) {
  // Fallback query only if no cards are provided from parent
  const { loading, error, data, refetch } = useQuery(GET_ALL_CARDS, {
    skip: Array.isArray(cardsProp), // don't fetch if parent provides data
  });

  const { getAllFlashcards = [] } = data ?? {};
  const cards = useMemo(
    () => (Array.isArray(cardsProp) ? cardsProp : getAllFlashcards),
    [cardsProp, getAllFlashcards]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [updateFlashcardStatus] = useMutation(UPDATE_FLASHCARD_STATUS);

  // When the incoming list changes (e.g., switching category), reset the player
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  // Counting categories by status (based on the *current working list*)
  const statusCount = useMemo(() => {
    return {
      known: cards.filter((c) => normalize(c.status) === "known").length,
      almost: cards.filter((c) => normalize(c.status) === "almost").length,
      unknown: cards.filter((c) => normalize(c.status) === "unknown").length,
    };
  }, [cards]);

  if (!Array.isArray(cardsProp)) {
    // We're in "self-fetch" mode, so show loading/error for the query
    if (loading) return <p>Loading flashcards...</p>;
    if (error) return <p>Error loading flashcards!</p>;
  }

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
      } else {
        await refetch?.();
      }

      // Move forward if possible (use the current list length)
      setIsFlipped(false);
      setCurrentIndex((i) => {
        const next = i + 1;
        return next < cards.length ? next : 0;
      });
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const currentFlashcard = cards[currentIndex];

  if (!cards.length) {
    return (
      <p className="text-center text-lg text-gray-600">No cards to show.</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <ProgressStats
        currentIndex={currentIndex}
        total={cards.length}
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
        total={cards.length}
      />
    </div>
  );
}

export default FlashcardList;
