import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cards from './pages/Cards'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
    </Routes>
  )
}

export default App


// import React from "react";
// import Layout from "./components/Layout/Layout";
// import FlashcardList from "./components/FlashcardList/FlashcardList";
// import { useQuery } from "@apollo/client";
// import { GET_FLASHCARDS } from "./graphql/queries";

// function App() {
//   const { loading, error, data } = useQuery(GET_FLASHCARDS);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error)
//     return <p className="text-center text-red-500">Error: {error.message}</p>;

//   const flashcards = data.getFlashcards;

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <FlashcardList flashcards={flashcards} />
//       </div>
//     </Layout>
//   );
// }

// export default App;
