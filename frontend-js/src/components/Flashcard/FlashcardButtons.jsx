import React from "react";

function FlashcardButtons({ handleCardStatus }) {
  return (
    // Evaluation Buttons
    <div className="w-full mt-auto">
      <div className="flex flex-col sm:flex-row gap-1 w-full">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardStatus(0); //Know
          }}
          className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
        >
          Know
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardStatus(1); // Almost Know
          }}
          className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
        >
          Almost Know
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardStatus(2); // Dont Know
          }}
          className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
        >
          Don't Know
        </button>
      </div>
    </div>
  );
}

export default FlashcardButtons;
