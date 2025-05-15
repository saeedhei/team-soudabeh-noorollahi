import React from "react";

export default function SessionEndOptions({
  total,
  onRestart,
  onNextSet,
  onReviewIncorrect,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
        <p className="text-gray-600 mb-6">
          You’ve reviewed all {total} flashcards.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🔁 Restart Session
          </button>

          <button
            onClick={onNextSet}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ⏭ Next 20 Cards
          </button>

          <button
            onClick={onReviewIncorrect}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            🎯 Review Unknown/Almost
          </button>
        </div>
      </div>
    </div>
  );
}
