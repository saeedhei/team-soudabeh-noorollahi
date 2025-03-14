import React, { useState } from "react";
import "./FlashcardList.css";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const handleNext = () => {
    setShowBack(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    setShowBack(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard" onClick={handleFlip}>
        <div className={`flashcard-inner ${showBack ? "show-back" : ""}`}>
          <div className="flashcard-front">
            {currentFlashcard.verb} {currentFlashcard.preposition}
          </div>
          <div className="flashcard-back">{currentFlashcard.translation}</div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardList;
