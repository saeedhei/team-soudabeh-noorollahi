import React, { useState } from "react";

const FlashcardForm = () => {
  const [formData, setFormData] = useState({
    verb: "",
    preposition: "",
    meaning: "",
    difficulty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      {["verb", "preposition", "meaning", "difficulty"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Card
      </button>
    </form>
  );
};

export default FlashcardForm;
