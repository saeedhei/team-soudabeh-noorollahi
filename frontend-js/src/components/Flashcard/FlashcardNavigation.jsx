import React from "react";

function FlashcardNavigation({ handleReset }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
      {/* Start Again Button */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={handleReset}
          className="min-w-[120px] px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors"
        >
          Start Again
        </button>
      </div>

      {/* Card Counter
      <div className="mt-4 text-gray-500">
        {currentIndex + 1} / {total}
      </div> */}
    </div>
  );
}

export default FlashcardNavigation;
