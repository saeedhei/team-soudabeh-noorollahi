import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  const handleCardStatus = (status) => {
    console.log(`Card status: ${status}`);
    handleNext();
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Flash Card */}
      <div
        className={`relative w-full max-w-md h-64 perspective-1000 mb-8 cursor-pointer ${
          isAnimating ? "pointer-events-none" : ""
        }`}
      >
        <div
          className={`w-full h-full transition-all duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={handleFlip}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white shadow-xl rounded-xl flex flex-col items-center justify-center p-6 backface-hidden border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentFlashcard.verb}
            </h2>
            <p className="text-lg text-gray-600">
              {currentFlashcard.preposition}
            </p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-blue-400 shadow-xl rounded-xl flex flex-col items-center justify-center p-6 backface-hidden border-2 border-blue-700 rotate-y-180">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              {currentFlashcard.translation}
            </h2>

            {/* Evaluation Buttons */}
            <div className="w-full mt-auto">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardStatus(0);
                  }}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  بلدم
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardStatus(1);
                  }}
                  className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
                >
                  تا حدی بلدم
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardStatus(2);
                  }}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  بلد نیستم
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex-1 flex justify-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors"
          >
            Start again
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Card Counter */}
      <div className="mt-4 text-gray-500">
        {currentIndex + 1} / {flashcards.length}
      </div>
    </div>
  );
}

export default FlashcardList;
