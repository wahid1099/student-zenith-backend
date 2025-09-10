import { Router } from "express";
import { addQA, getQA, getFlashcards } from "./examQA.controller";

const router = Router();

router.post("/", addQA);
router.get("/", getQA);
router.get("/flashcards", getFlashcards);

export default router;
