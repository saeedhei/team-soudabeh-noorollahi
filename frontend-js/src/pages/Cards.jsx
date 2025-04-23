// pages/Cards.jsx
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

// GraphQL query to fetch flashcards
const GET_FLASHCARDS = gql`
  query GetFlashcards {
    getFlashcards {
      id
      verb
      preposition
      meaning
      difficulty
      status
    }
  }
`

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
  const { loading, error, data } = useQuery(GET_FLASHCARDS)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">DeutschVerben App</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/cards" className="text-gray-700 hover:text-blue-500">Cards</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>

        {loading && <p className="text-gray-600">Loading flashcards...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.getFlashcards?.map(card => (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-blue-600">{card.verb} {card.preposition}</h3>
              <p className="text-gray-700 mt-1">{card.meaning}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Difficulty: {card.difficulty || 'N/A'}</p>
                <p>Status: {card.status || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
