import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../graphql/queries/cardQueries";
import FlashcardList from "../components/FlashcardList/FlashcardList";

import { FaHome, FaBookOpen } from "react-icons/fa";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_CARDS);

  console.log("✅ Total cards in Home:", data?.getAllFlashcards?.length);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
          VerbPro C1
        </h1>
        <div className="space-x-6 flex items-center">
          <Link
            to="/"
            className="text-lg font-medium text-gray-600 hover:text-indigo-700 transition duration-300 ease-in-out flex items-center"
          >
            <FaHome className="mr-2 text-xl" /> Home
          </Link>
          <Link
            to="/cards"
            className="text-lg font-medium text-gray-600 hover:text-indigo-700 transition duration-300 ease-in-out flex items-center"
          >
            <FaBookOpen className="mr-2 text-xl" /> Cards
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="container mx-auto px-4 py-8">
          {loading && (
            <p className="text-center text-lg text-indigo-600">Loading flashcards...</p>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} VerbPro C1. All rights reserved.</p>
        <p className="mt-1">Designed with <span className="text-red-400">&hearts;</span> for language learners.</p>
      </footer>
    </div>
  );
}