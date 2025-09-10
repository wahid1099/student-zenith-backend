import { Router } from "express";
import { createGoal, updateTask, getProgress } from "./studyPlanner.controller";

const router = Router();

router.post("/", createGoal);
router.patch("/:id/task", updateTask);
router.get("/progress", getProgress);

export default router;
