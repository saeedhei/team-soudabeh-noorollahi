import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import FlashcardList from "./components/FlashcardList/FlashcardList";
import CardsPage from "./components/CardsPage/CardsPage";
import { useQuery } from "@apollo/client";
import { GET_FLASHCARDS } from "./graphql/queries";

const RouterComponent = () => {
  const { loading, error, data } = useQuery(GET_FLASHCARDS);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const flashcards = data.getFlashcards;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FlashcardList flashcards={flashcards} />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Layout>
  );
};

export default RouterComponent;
