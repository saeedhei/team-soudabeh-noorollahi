# 📄 Pagination with GraphQL and Apollo Client

## ✅ Purpose

Paginating large datasets improves performance and user experience by only loading data in small chunks instead of all at once. This is especially useful for flashcard apps like ours where the number of items can grow quickly.

---

## 🔁 REST API Example (Traditional)

```http
GET /api/flashcards?page=1&limit=20
```

**Returns:** 20 flashcards and a `total` count.

---

## 🌀 GraphQL Equivalent (Modern)

### Query:

```graphql
query GetCards($page: Int!, $limit: Int!) {
  GetCards(page: $page, limit: $limit) {
    flashcards {
      id
      verb
      meaning
    }
    total
  }
}
```

### Example Variables:

```json
{
  "page": 1,
  "limit": 20
}
```

---

## 🧠 Why GraphQL Pagination?

- Fetch only what's needed
- Works well with Apollo's `fetchMore`
- Scales well with growing data
- Clean and flexible query format

---

## ⚙️ Backend Implementation

### In `typeDefs.js`

```graphql
type Query {
  GetCards(page: Int!, limit: Int!): FlashcardPageResult
}
```

### In `resolvers.js`

```js
GetCards: async (_, { page, limit }) => {
  const skip = (page - 1) * limit;
  const flashcards = await Flashcard.find().skip(skip).limit(limit);
  const total = await Flashcard.countDocuments();
  return { flashcards, total };
};
```

---

## 🖥️ Frontend Apollo Client (PaginatedFlashcards.jsx)

```js
const { data, fetchMore } = useQuery(GET_CARDS, {
  variables: { page: 1, limit: 12 },
  notifyOnNetworkStatusChange: true,
});

const handleLoadMore = () => {
  fetchMore({
    variables: { page: nextPage, limit },
    updateQuery: (prev, { fetchMoreResult }) => {
      return {
        GetCards: {
          ...fetchMoreResult.GetCards,
          flashcards: [
            ...prev.GetCards.flashcards,
            ...fetchMoreResult.GetCards.flashcards,
          ],
        },
      };
    },
  });
};
```

---

## 📌 Notes

- Always use variables (`$page`, `$limit`) to control pagination
- Maintain a `hasMore` flag by comparing fetched length to total
- Use `refetch()` when mutations happen (e.g. delete or add card)

---

## ✅ Result

Pagination is now working efficiently on both:

- `/cards` page (load more on scroll or button)
- `/home` page (limited flashcard training set)
