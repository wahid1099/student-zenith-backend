import { Router } from "express";
import {
  addTodo,
  getTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodo,
  getTodoById,
  getTodosByCategory,
} from "./todo.controller";
const router = Router();
router.post("/", addTodo);
router.get("/", getTodos);
router.patch("/:id/status", updateTodoStatus);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
router.get("/:id", getTodoById);
router.get("/category/:category", getTodosByCategory);
export default router;
