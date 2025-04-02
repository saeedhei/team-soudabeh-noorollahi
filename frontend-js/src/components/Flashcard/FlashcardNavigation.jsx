import React from "react";

function FlashcardNavigation({
  handlePrevious,
  handleNext,
  handleReset,
  currentIndex,
  total,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="min-w-[120px] px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center"
      >
        Previous
      </button>

      {/* Start Again Button */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={handleReset}
          className="min-w-[120px] px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors"
        >
          Start Again
        </button>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === total - 1}
        className="min-w-[120px] px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center"
      >
        Next
      </button>

      {/* Card Counter */}
      <div className="mt-4 text-gray-500">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
}

export default FlashcardNavigation;
