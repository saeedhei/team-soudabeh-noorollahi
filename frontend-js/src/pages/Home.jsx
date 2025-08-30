import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../graphql/queries/cardQueries";
import FlashcardList from "../components/FlashcardList/FlashcardList";
import StatusFilter from "../components/Flashcard/StatusFilter";

const normalize = (s) => (s || "").toUpperCase();

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_CARDS);
  const [activeStatus, setActiveStatus] = useState("ALL");

  const cards = useMemo(() => data?.getAllFlashcards ?? [], [data]);

  const counts = useMemo(() => {
    const known = cards.filter((c) => normalize(c.status) === "KNOWN").length;
    const almost = cards.filter((c) => normalize(c.status) === "ALMOST").length;
    const unknown = cards.filter(
      (c) => normalize(c.status) === "UNKNOWN"
    ).length;
    return { all: cards.length, known, almost, unknown };
  }, [cards]);

  const filtered = useMemo(() => {
    if (activeStatus === "ALL") return cards;
    return cards.filter((c) => normalize(c.status) === activeStatus);
  }, [activeStatus, cards]);

  return (
    <main className="flex-grow px-4 py-8">
      <div className="max-w-screen-xl mx-auto">
        <StatusFilter
          active={activeStatus}
          counts={counts}
          onChange={setActiveStatus}
        />

        {loading && (
          <p className="text-center text-lg text-indigo-600">
            Loading flashcards...
          </p>
        )}
        {error && (
          <p className="text-center text-lg text-red-600">
            Error: {error.message}. Please try again later.
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No cards in this category.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <FlashcardList cards={filtered} onRefetch={refetch} />
        )}
      </div>
    </main>
  );
}
