import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CARDS } from "../graphql/queries/cardQueries";
import FlashcardList from "../components/FlashcardList/FlashcardList";

export default function Home() {
  const { loading, error, data } = useQuery(GET_CARDS);

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
        <h2 className="text-2xl font-semibold">Welcome Home</h2>
        <p className="mt-2 text-gray-600">
          Use the menu to navigate to the Cards page.
        </p>

        <div className="container mx-auto px-4 py-8">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <FlashcardList flashcards={data.cards} />}
        </div>
      </main>
    </div>
  );
}
