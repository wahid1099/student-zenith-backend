import { Request, Response } from "express";
import { StudyPlanner } from "./studyPlanner.model";

export const createGoal = async (req: Request, res: Response) => {
  const goal = await StudyPlanner.create(req.body);
  res.status(201).json(goal);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { taskId, isCompleted } = req.body;
  const goal = await StudyPlanner.findById(id);
  if (!goal) return res.status(404).json({ message: "Goal not found" });
  const task = goal.tasks.id(taskId);
  if (task) task.isCompleted = isCompleted;
  await goal.save();
  res.json(goal);
};

export const getProgress = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const goals = await StudyPlanner.find({ userId });
  res.json(goals);
};
