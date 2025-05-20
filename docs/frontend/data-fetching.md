
# 🔄 Comparison of HTTP Data Fetching Methods in React

This guide summarizes the most common tools for fetching data from APIs in React. It's designed to help junior developers understand which ones to learn first and how they compare.

---

## 📦 1. `fetch` API

### ✅ Pros:
- Built into the browser (no need to install)
- Good for small projects and beginners

### ❌ Cons:
- Manual JSON parsing required
- No built-in error handling for HTTP errors (404, 500)
- Less readable for complex requests

### Example:
```js
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## ⚡ 2. Axios

### ✅ Pros:
- Cleaner and more readable syntax than fetch
- Automatically parses JSON
- Handles HTTP errors gracefully
- Supports interceptors, timeout, cancel, etc.

### ❌ Cons:
- Requires installation

### Example:
```js
import axios from "axios";

axios.get("https://api.example.com/data")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 🔁 3. React Query (TanStack)

### ✅ Pros:
- Built-in caching, background updates, auto retries
- Perfect for real-world apps and dashboards
- Handles loading/error states for you

### ❌ Cons:
- Requires learning curve
- Might be overkill for simple use cases

### Example with Axios:
```js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then(res => res.data)
});
```

### Example with GraphQL:
```js
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://api.example.com/graphql";
const query = gql`{ users { id name } }`;

const fetchUsers = () => request(endpoint, query);

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});
```

---

## 🌐 4. SWR (by Vercel)

### ✅ Pros:
- Lightweight and minimal
- Built-in caching and revalidation
- Great for Next.js projects

### ❌ Cons:
- Less powerful than React Query
- Manual handling for POST/PUT/DELETE

### Example:
```js
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);
const { data, error } = useSWR('/api/user', fetcher);
```

---

## 🚀 5. GraphQL & Apollo Client

### ✅ Pros:
- Tailored for GraphQL APIs
- Powerful caching and dev tools
- Supports queries, mutations, subscriptions
- Works with React, Vue, etc.

### ❌ Cons:
- Requires GraphQL backend
- Slightly heavier than REST clients

### Example:
```js
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.example.com/graphql",
  cache: new InMemoryCache(),
});

const GET_USERS = gql`query { users { id name } }`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, name }) => (
    <div key={id}>{name}</div>
  ));
}
```

---

## 🧠 Which One Should You Learn First?

| Level                     | Recommendation                             |
|--------------------------|---------------------------------------------|
| 🐣 Beginner (Junior)      | Start with `fetch` and `axios`              |
| 🌱 Growing Developer      | Master `axios`, then try `React Query`      |
| 🌳 Mid-level or Advanced  | Use `React Query`, explore SWR              |
| 🚀 Working with Next.js   | Learn `SWR`                                 |
| 🔗 GraphQL Backend        | Use `Apollo Client` or `graphql-request`    |

---

## 💬 Final Tips

- Learn `fetch` for fundamentals.
- Use `axios` in most real-world projects.
- Learn `React Query` when your app grows in complexity.
- Explore `GraphQL` with Apollo Client or graphql-request when your backend supports it.

