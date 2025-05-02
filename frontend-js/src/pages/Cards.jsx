import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import FlashcardFormModal from "../components/Flashcard/FlashcardFormModal";
import { toast } from "react-hot-toast";

import {
  CREATE_FLASHCARD,
  UPDATE_FLASHCARD,
  DELETE_FLASHCARD,
} from "../graphql/mutations/cardMutations";

// GraphQL query to fetch flashcards
const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      verb
      preposition
      meaning
      difficulty
      status
    }
  }
`;

// query GetCards {
//     cards {
//      id
//      verb
//      preposition
//      meaning
//      difficulty
//      status
//     }
//   }

export default function Cards() {
  const { loading, error, data, refetch } = useQuery(GET_CARDS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [createFlashcard] = useMutation(CREATE_FLASHCARD);
  const [updateFlashcard] = useMutation(UPDATE_FLASHCARD);
  const [deleteFlashcard] = useMutation(DELETE_FLASHCARD);

  //handle form submission (add/edit)
  const handleFormSubmit = async (formData) => {
    try {
      if (editingCard) {
        // UPDATE
        await updateFlashcard({
          variables: {
            id: editingCard.id,
            ...formData,
          },
        });
        toast.success("Flashcard updated!"); // show toast
      } else {
        // CREATE
        await createFlashcard({
          variables: formData,
        });
        toast.success("Flashcard added successfully!"); // sow toast
      }

      await refetch();
      //Clearing and closing the modal
      setEditingCard(null);
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong!"); // error toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">DeutschVerben App</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/cards" className="text-gray-700 hover:text-blue-500">
            Cards
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>
        {/*  add new button */}
        <button
          onClick={() => {
            setModalOpen(true);
            setEditingCard(null);
          }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {" "}
          ➕ Add New Flashcard
        </button>
        {loading && <p className="text-gray-600">Loading flashcards...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.cards?.map((card) => (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-blue-600">
                {card.verb} {card.preposition}
              </h3>
              <p className="text-gray-700 mt-1">{card.meaning}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Difficulty: {card.difficulty || "N/A"}</p>
                <p>Status: {card.status || "N/A"}</p>
              </div>
              {/* edit + delete buttons */}
              <div className="flex gap-3 mt-3">
                {" "}
                <button
                  onClick={() => {
                    setEditingCard(card);
                    setModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={async () => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this flashcard?"
                    );
                    if (!confirmed) return;

                    try {
                      await deleteFlashcard({ variables: { id: card.id } });
                      refetch();
                      toast.success("Flashcard deleted.");
                    } catch (err) {
                      console.error("Delete failed:", err);
                      toast.error("Delete failed.");
                    }
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {modalOpen && (
          <FlashcardFormModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingCard(null);
            }}
            onSubmit={handleFormSubmit}
            initialData={editingCard}
          />
        )}
      </main>
    </div>
  );
}
