# Dependency Injection (DI) in DeutschVerben-C1

## 📌 Overview

Dependency Injection (DI) improves modularity, testability, and scalability.  
In this project, DI is used in both **backend (Express.js + GraphQL)** and **frontend (React + TypeScript)** to decouple dependencies.

---

## 🏗️ Basic Dependency Injection (Constructor Injection)

In its simplest form, DI is implemented using **Constructor Injection**. Here’s an example:

```javascript
// database.js
class Database {
  save(data) {
    console.log("Data saved:", data);
  }
}
module.exports = Database;

// userService.js
class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser(user) {
    this.database.save(user);
  }
}
module.exports = UserService;

// app.js
const Database = require("./database");
const UserService = require("./userService");

const db = new Database();
const userService = new UserService(db);
userService.createUser({ name: "Ali" });
```

In this example, `Database` is injected as a dependency into `UserService`, making the code more modular and testable.

---

## 🚀 Backend (Express.js + GraphQL)

### 🛠 Database Service (`DatabaseService.ts`)

Encapsulates MongoDB connection logic and provides database access.

```typescript
import { MongoClient } from "mongodb";

class DatabaseService {
  private client: MongoClient;
  private dbName = "DeutschVerbenC1";

  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  async connect() {
    await this.client.connect();
  }

  getDatabase() {
    return this.client.db(this.dbName);
  }
}

export default DatabaseService;
```

### 🔄 Injecting Database Service into Express Route (`server.ts`)

Instead of connecting to MongoDB directly inside controllers, we inject `DatabaseService` for better separation of concerns.

```typescript
import express from "express";
import DatabaseService from "./services/DatabaseService";

const app = express();
const dbService = new DatabaseService(process.env.MONGO_URI || "");

app.get("/verbs", async (req, res) => {
  const db = dbService.getDatabase();
  const verbs = await db.collection("verbs").find().toArray();
  res.json(verbs);
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

✅ **Benefits:**  
✔ The `DatabaseService` can be **mocked for testing**.  
✔ The Express app does **not directly depend** on MongoDB.

---

## 🎨 Frontend (React + TypeScript)

For frontend, we use DI to inject API services into components, making them independent of API logic.

### ✅ API Service (`apiService.ts`)

Encapsulates API calls to fetch data.

```typescript
export class APIService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchVerbs() {
    const response = await fetch(`${this.baseURL}/verbs`);
    return response.json();
  }
}
```

### 🔄 Injecting API Service via Context (`verbsContext.tsx`)

```typescript
import React, { createContext, useContext } from "react";
import { APIService } from "./apiService";

const apiService = new APIService("http://localhost:5000");
const APIContext = createContext(apiService);

export const useAPI = () => useContext(APIContext);
export const APIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <APIContext.Provider value={apiService}>{children}</APIContext.Provider>;
```

### 🎯 Injecting API Service into a React Component (`VerbsList.tsx`)

```typescript
import React, { useEffect, useState } from "react";
import { useAPI } from "./verbsContext";

const VerbsList: React.FC = () => {
  const api = useAPI();
  const [verbs, setVerbs] = useState([]);

  useEffect(() => {
    api.fetchVerbs().then(setVerbs);
  }, [api]);

  return (
    <ul>
      {verbs.map((verb: any) => (
        <li key={verb.id}>{verb.name}</li>
      ))}
    </ul>
  );
};

export default VerbsList;
```

✅ **Benefits:**  
✔ **Loose coupling** – React components don’t directly depend on API logic.  
✔ **Easier testing** – We can **mock APIService** for unit testing.

---

## ⚡ Advanced Dependency Injection

For more advanced DI, we can use **DI containers** like `Awilix` or `TypeDI`.
For example:

### 🏗️ Using Awilix In Node.js

```javascript
const { createContainer, asClass } = require("awilix");

// 1. Create a DI Container
const container = createContainer();

// 2. Define classes
class Database {
  save(data) {
    console.log("Data saved:", data);
  }
}

class UserService {
  constructor({ database }) {
    this.database = database;
  }

  createUser(user) {
    this.database.save(user);
  }
}

// 3. Register dependencies in the container
container.register({
  database: asClass(Database).singleton(),
  userService: asClass(UserService).singleton(),
});

// 4. Resolve dependencies
const userService = container.resolve("userService");
userService.createUser({ name: "Sara" });
```

✅ **Benefits:**  
✔ Loose coupling between components  
✔ Better maintainability and scalability  
✔ Dependency management via Awilix DI container

### ⚡ Using TypeDI (for TypeScript projects)

```typescript
import "reflect-metadata";
import { Container, Service } from "typedi";

// 1. Define Classes with @Service Decorator
@Service()
class Database {
  save(data: any) {
    console.log("Data saved:", data);
  }
}

@Service()
class UserService {
  constructor(private database: Database) {}

  createUser(user: any) {
    this.database.save(user);
  }
}

// 2. Retrieve Dependencies from Container
const userService = Container.get(UserService);
userService.createUser({ name: "Sara" });
```

✅ **Benefits:**
✔ Automatic dependency resolution with decorators  
✔ Works seamlessly with TypeScript and NestJS  
✔ Improves code organization and scalability

---

## 🔥 Which One to Choose?

🔹 If you are using JavaScript and need a simple yet powerful DI solution, **Awilix** is a better choice.  
🔹 If you are using TypeScript and want a DI system similar to NestJS, **TypeDI** is more suitable.

---

### 🔥 DI in NestJS (Advanced)

NestJS has built-in support for DI using decorators:

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  createUser(user: any) {
    this.databaseService.save(user);
  }
}
```

---

## 🔮 Future Improvements

- [ ] Implement a **DI container** for better management of services.
- [ ] Use **environment-based DI** to load different dependencies for dev/prod.
- [ ] Enhance **unit tests** by injecting mock services.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a new branch**
   ```sh
   git checkout -b improve-di
   ```
3. **Make changes**
4. **Commit & push**
   ```sh
   git commit -m "Improve DI structure"
   git push origin improve-di
   ```
5. **Open a Pull Request (PR)**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
