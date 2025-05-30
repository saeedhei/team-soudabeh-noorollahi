import React from "react";
import FlashcardButtons from "./FlashcardButtons";

function Flashcard({ flashcard, isFlipped, handleFlip, handleCardStatus }) {
  // Show loading indicator if flashcard is not loaded yet
  if (!flashcard) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-xs md:max-w-md lg:max-w-lg h-[400px] md:h-[450px] lg:h-[500px] perspective-1000 mb-8 cursor-pointer`}
      onClick={handleFlip}
    >
      <div
        className={` relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-white shadow-xl rounded-xl flex flex-col items-center justify-center p-6 backface-hidden border-2 border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {flashcard.verb}
          </h2>
          <p className="text-lg text-gray-600">{flashcard.preposition}</p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-white shadow-xl rounded-xl flex flex-col justify-between items-center p-6 border-2 border-gray-200 rotate-y-180 backface-hidden">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 mt-25">
            {flashcard.meaning}
          </h2>
          {isFlipped && (
            <FlashcardButtons handleCardStatus={handleCardStatus} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
