````md
# 📚 DeutschVerben-C1 - GraphQL API

A simple GraphQL API to manage C1-level German verbs with prepositions.

---

## 🚀 Server Endpoint

**URL:** `http://localhost:5000/graphql`

---

## 📌 Example Operations

### 🔁 Create a Flashcard (Mutation)

```graphql
mutation {
  createFlashcard(
    verb: "look"
    preposition: "after"
    meaning: "to take care of someone or something"
    difficulty: "medium"
  ) {
    id
    verb
    preposition
    meaning
    difficulty
    createdAt
    updatedAt
  }
}
```
````

---

### 📥 Get All Flashcards (Query)

```graphql
query {
  getFlashcards {
    id
    verb
    preposition
    meaning
    difficulty
    createdAt
    updatedAt
  }
}
```

---

### 🔎 Get Flashcard by ID (Query)

```graphql
query {
  getFlashcard(id: "YOUR_FLASHCARD_ID_HERE") {
    id
    verb
    preposition
    meaning
    difficulty
    createdAt
    updatedAt
  }
}
```

---

## 🧪 Test with `curl`

### ✅ Create a Flashcard

```bash
curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createFlashcard(verb: \"look\", preposition: \"after\", meaning: \"to take care of someone or something\", difficulty: \"medium\") { id verb preposition meaning difficulty createdAt updatedAt } }"}'
```

---

### ✅ Get All Flashcards

```bash
curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ getFlashcards { id verb preposition meaning difficulty createdAt updatedAt } }"}'
```

---

### ✅ Get Flashcard by ID

```bash
curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ getFlashcard(id: \"YOUR_FLASHCARD_ID_HERE\") { id verb preposition meaning difficulty createdAt updatedAt } }"}'
```

---

## 📦 Technologies

- Node.js
- Express
- Apollo Server v4
- GraphQL
- MongoDB + Mongoose

---
