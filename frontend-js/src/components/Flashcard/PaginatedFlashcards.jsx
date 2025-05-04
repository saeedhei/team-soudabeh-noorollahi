import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CARDS } from "../../graphql/queries/cardQueries";
import { DELETE_FLASHCARD } from "../../graphql/mutations/cardMutations";

export default function PaginatedFlashcards({
  searchTerm,
  setEditingCard,
  setModalOpen,
  deleteFlashcard,
  refetch,
  toast,
}) {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { loading, error, data, fetchMore } = useQuery(GET_CARDS, {
    variables: { page, limit },
    notifyOnNetworkStatusChange: true,
  });

  const flashcards = data?.GetCards?.flashcards || [];
  const total = data?.GetCards?.total || 0;

  const filtered = flashcards.filter((card) => {
    const text =
      `${card.verb} ${card.preposition} ${card.meaning}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: { page: page + 1, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          GetCards: {
            __typename: "FlashcardPageResult",
            total: fetchMoreResult.GetCards.total,
            flashcards: [
              ...prev.GetCards.flashcards,
              ...fetchMoreResult.GetCards.flashcards,
            ],
          },
        };
      },
    });
    setPage((prev) => prev + 1);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flashcard?"
    );
    if (!confirmed) return;

    try {
      await deleteFlashcard({
        variables: { id },
        update: (cache) => {
          cache.modify({
            fields: {
              GetCards(
                existingData = { flashcards: [], total: 0 },
                { readField }
              ) {
                return {
                  ...existingData,
                  flashcards: existingData.flashcards.filter(
                    (fc) => readField("id", fc) !== id
                  ),
                  total: existingData.total - 1,
                };
              },
            },
          });
        },
      });
      toast.success("Flashcard deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Paginated Flashcards</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading cards</p>}

      <ul className="space-y-2">
        {filtered.map((card) => (
          <li key={card.id} className="bg-white border p-4 rounded shadow">
            <strong className="text-blue-600">{card.verb}</strong>{" "}
            {card.preposition} - {card.meaning}
            <div className="flex gap-2 mt-2">
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
                    await refetch();
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
          </li>
        ))}
      </ul>

      {flashcards.length < total && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
