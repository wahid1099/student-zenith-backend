import { Router } from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  updateTask,
  getProgress,
} from "./studyPlanner.controller";

const router = Router();

router.post("/", createGoal);
router.get("/", getGoals);
router.get("/:id", getGoalById);
router.patch("/:id", updateGoal);
router.delete("/:id", deleteGoal);
router.patch("/:id/task", updateTask);
router.get("/progress", getProgress);

export default router;
