import React, { useState, useEffect } from "react";

export default function FlashcardFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  if (!isOpen) return null;
  const [form, setForm] = useState({
    verb: "",
    preposition: "",
    meaning: "",
    difficulty: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40  z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {" "}
          {initialData ? "Edit Flashcard" : "Add New Flashcard"}{" "}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4"
        >
          <input
            name="verb"
            value={form.verb}
            onChange={handleChange}
            placeholder="verb"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="preposition"
            value={form.preposition}
            onChange={handleChange}
            placeholder="preposition"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="meaning"
            value={form.meaning}
            onChange={handleChange}
            placeholder="meaning"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancel
            </button>{" "}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {initialData ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
