import express from "express";
import {
  getFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController.js";

const router = express.Router();

router.get("/", getFlashcards); // All
router.get("/:id", getFlashcardById); // One by ID
router.post("/", createFlashcard); // New
router.put("/:id", updateFlashcard); // Update
router.delete("/:id", deleteFlashcard); // Delete

export default router;
