import { Router } from "express";
import {
  addNote,
  getNotes,
  updateNoteStatus,
  deleteNote,
  updateNote,
  getNoteById,
  getNotesByCategory,
} from "./notes.controller";

const router = Router();

router.post("/", addNote);
router.get("/", getNotes);
router.patch("/:id/status", updateNoteStatus);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);
router.get("/:id", getNoteById);
router.get("/category/:category", getNotesByCategory);

export default router;
