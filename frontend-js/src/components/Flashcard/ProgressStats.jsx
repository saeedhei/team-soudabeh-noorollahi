import React from "react";

function ProgressStats({ currentIndex, total, statusCount }) {
  const totalAnswered =
    statusCount.known + statusCount.almost + statusCount.unknown;

  const getPercentage = (count) =>
    totalAnswered === 0 ? 0 : ((count / totalAnswered) * 100).toFixed(0);

  return (
    <div className="w-full max-w-md mb-6 p-4 rounded-xl bg-gray-100 shadow-md">
      <p className="text-center font-semibold text-lg mb-2">
        Progress: {currentIndex + 1} / {total}
      </p>
      <div className="space-y-1 text-sm">
        <p className="text-green-600">
          ✅ Known: {getPercentage(statusCount.known)}% ({statusCount.known})
        </p>
        <p className="text-yellow-600">
          🤔 Almost: {getPercentage(statusCount.almost)}% ({statusCount.almost})
        </p>
        <p className="text-red-600">
          ❌ Unknown: {getPercentage(statusCount.unknown)}% (
          {statusCount.unknown})
        </p>
      </div>

      {/*  colored tab */}
      <div className="w-full h-4 mt-4 flex rounded overflow-hidden">
        <div
          className="bg-green-500"
          style={{ width: `${getPercentage(statusCount.known)}%` }}
        />
        <div
          className="bg-yellow-400"
          style={{ width: `${getPercentage(statusCount.almost)}%` }}
        />
        <div
          className="bg-red-500"
          style={{ width: `${getPercentage(statusCount.unknown)}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressStats;
