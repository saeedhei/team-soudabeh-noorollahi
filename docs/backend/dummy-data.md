# 🧪 Dummy Data

## 📌 What is Dummy Data?

Dummy data refers to **artificial or fake data** created for testing, development, or demonstration purposes.  
In this project, we use dummy data to populate the database with **sample flashcards** to test pagination, UI, and GraphQL queries.

---

## 🎯 Why Use Dummy Data?

✅ Improve UI testing without manual input  
✅ Verify pagination and performance with large data sets  
✅ Avoid delays while backend or real content is not ready

---

## ⚙️ How We Seed Dummy Data (MongoDB + GraphQL)

We created a simple `seed.js` script to insert 80 flashcards.

### 📁 File: `seed.js`

```js
import dotenv from "dotenv";
import Flashcard from "./models/Flashcard.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const sampleFlashcards = Array.from({ length: 80 }, (_, i) => ({
  verb: `verb${i + 1}`,
  preposition: `pre${i + 1}`,
  meaning: `Sample meaning ${i + 1}`,
  difficulty: ["easy", "medium", "hard"][i % 3],
}));

const seedDatabase = async () => {
  try {
    await connectDB(); // connect to MongoDB
    await Flashcard.deleteMany(); // clear existing data
    await Flashcard.insertMany(sampleFlashcards); // insert new
    console.log("✅ Dummy data inserted.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
✅ Usage
Run the backend server:

bash
Copy
Edit
npm run dev
In a separate terminal, seed the DB:

bash
Copy
Edit
node seed.js
Verify with GraphQL Playground:

graphql
Copy
Edit
query {
  GetCards(page: 1, limit: 5) {
    flashcards {
      id
      verb
    }
  }
}
🔮 Notes
Seeding does not affect production; it's for development only.

You can reset or re-seed the database anytime.
```
