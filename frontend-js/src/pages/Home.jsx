import { useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../graphql/queries/cardQueries";
import FlashcardList from "../components/FlashcardList/FlashcardList";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_CARDS);

  console.log("✅ Total cards in Home:", data?.getAllFlashcards?.length);

  return (
    <main className="flex-grow px-4 py-8">
      <div className="max-w-screen-xl mx-auto">
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
        {data && data.getAllFlashcards.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No flashcards found. Time to add some!
          </p>
        )}
        {data && data.getAllFlashcards.length > 0 && (
          <FlashcardList flashcards={data.getAllFlashcards} />
        )}
      </div>
    </main>
  );
}
