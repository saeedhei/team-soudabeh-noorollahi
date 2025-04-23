import React from "react";

const FlashcardTable = () => {
  //  useQuery
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Verb</th>
          <th>Preposition</th>
          <th>Meaning</th>
          <th>Difficulty</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* card*/}
        <tr>
          <td colSpan="6" className="text-center py-4">
            No cards yet.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FlashcardTable;
