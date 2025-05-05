# 🚀 Apollo Client Guide (Flashcard Project Example)

This guide explains how to use Apollo Client in a React project with an example from the Flashcard app.

---

## 📦 1. Install Apollo Client and GraphQL

```bash
npm install @apollo/client graphql
```

---

## 🧠 2. Create Apollo Client Instance

Create a file like `apolloClient.js`:

```js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // your backend endpoint
  cache: new InMemoryCache(),
});

export default client;
```

---

## 🌍 3. Wrap App with ApolloProvider

In `main.jsx` or `index.js`:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

---

## 📡 4. Define GraphQL Query

In `src/graphql/queries.js`:

```js
import { gql } from "@apollo/client";

export const GET_FLASHCARDS = gql`
  query GetFlashcards {
    getFlashcards {
      id
      verb
      preposition
      meaning
      status
    }
  }
`;
```

---

## 🔄 5. Fetch Data with useQuery

Create a container `FlashcardListContainer.jsx`:

```js
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FLASHCARDS } from "../graphql/queries";
import FlashcardList from "../components/Flashcard/FlashcardList";

function FlashcardListContainer() {
  const { loading, error, data } = useQuery(GET_FLASHCARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading flashcards</p>;

  return <FlashcardList flashcards={data.getFlashcards} />;
}

export default FlashcardListContainer;
```

---

## 🧩 6. Replace Hardcoded Flashcards

In `App.jsx`, render this new container instead of using hardcoded data:

```js
import FlashcardListContainer from "./containers/FlashcardListContainer";

function App() {
  return <FlashcardListContainer />;
}

export default App;
```

---

✅ Done! You now have Apollo Client set up and fetching real flashcard data from your GraphQL backend.
