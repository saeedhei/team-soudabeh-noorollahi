import React, { useEffect, useState } from "react";

export default function SearchBar({ onSearch, delay = 300 }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input);
    }, delay);

    return () => clearTimeout(timeout);
  }, [input, delay, onSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search flashcards..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4 px-4 py-2 w-full max-w-sm border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
