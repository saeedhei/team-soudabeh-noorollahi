import { useEffect, useState } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdFirstPage } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";

import {
  GET_CARDS,
  SEARCH_FLASHCARDS,
} from "../../graphql/queries/cardQueries";
import { DELETE_FLASHCARD } from "../../graphql/mutations/cardMutations";

export default function PaginatedFlashcards({
  searchTerm,
  setEditingCard,
  setModalOpen,
  toast,
}) {
  const [page, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const limit = 12;

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CARDS, {
    variables: { page, limit },
    notifyOnNetworkStatusChange: true,
  });

  const [runSearch, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_FLASHCARDS);

  useEffect(() => {
    if (searchTerm.trim().length < 1) return;
    runSearch({ variables: { term: searchTerm } });
  }, [searchTerm, runSearch]);

  const flashcards = searchTerm.trim()
    ? searchData?.searchFlashcards || []
    : data?.GetCards?.flashcards || [];

  console.log("🧠 Cards shown in Cards.jsx:", flashcards.length);

  const total = data?.GetCards?.total || 0;

  const [deleteFlashcardMutation] = useMutation(DELETE_FLASHCARD);

  const handleLoadMore = () => {
    fetchMore({
      variables: { page: page + 1, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.GetCards) return prev;

        const combined = [
          ...prev.GetCards.flashcards,
          ...fetchMoreResult.GetCards.flashcards,
        ];

        const uniqueMap = new Map();
        for (const card of combined) {
          uniqueMap.set(card.id, card);
        }

        const newFlashcards = Array.from(uniqueMap.values());
        if (newFlashcards.length >= fetchMoreResult.GetCards.total) {
          setAllLoaded(true);
        }

        return {
          GetCards: {
            __typename: "FlashcardPageResult",
            total: fetchMoreResult.GetCards.total,
            flashcards: Array.from(uniqueMap.values()),
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
      await deleteFlashcardMutation({
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
      await refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed.");
    }
  };

  useEffect(() => {
    if (!searchTerm.trim() && flashcards.length >= total) {
      setAllLoaded(true);
    }
  }, [flashcards.length, total, searchTerm]);

  return (
    <div>
      {searchLoading && <p>Searching...</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading cards</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card) => (
          <li
            key={card.id}
            className="bg-white text-xl border p-4 rounded shadow hover:border-2 hover:border-amber-600 hover:bg-neutral-100"
          >
            <strong className="text-cyan-700">{card.verb}</strong>{" "}
            {card.preposition} - {card.meaning}
            <p
              className={`text-sm mt-1 font-medium ${
                card.difficulty === "easy"
                  ? "text-green-600"
                  : card.difficulty === "medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Difficulty: {card.difficulty}
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              {" "}
              <button
                onClick={() => {
                  setEditingCard(card);
                  setModalOpen(true);
                }}
                className="text-stone-600 hover:text-emerald-600 bg-white rounded-full p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <MdEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-stone-600 hover:text-red-600 bg-white rounded-full p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center mt-6">
        {searchTerm.trim() !== "" ? null : !allLoaded ? (
          <button
            onClick={handleLoadMore}
            className=" flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 mx-auto"
          >
            <AiOutlinePlus />
            Load More
          </button>
        ) : page > 1 ? (
          <button
            onClick={() => {
              setPage(1);
              setAllLoaded(false);
              refetch({ page: 1, limit });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-500 mx-auto"
          >
            <MdFirstPage />
            First Page
          </button>
        ) : null}
      </div>
    </div>
  );
}
