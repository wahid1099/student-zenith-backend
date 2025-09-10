import { Request, Response, NextFunction } from "express";
import { StudyPlanner } from "./studyPlanner.model";
import catchAsync from "../../utils/catchAsync";

// Create a new goal
export const createGoal = catchAsync(async (req: Request, res: Response) => {
  const goal = await StudyPlanner.create(req.body);
  res.status(201).json(goal);
});

// Get all goals for a user
export const getGoals = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const goals = await StudyPlanner.find({ userId });
  res.json(goals);
});

// Get a single goal by ID
export const getGoalById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const goal = await StudyPlanner.findById(id);
  if (!goal) return res.status(404).json({ message: "Goal not found" });
  res.json(goal);
});

// Update a goal
export const updateGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGoal = await StudyPlanner.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
  res.json(updatedGoal);
});

// Delete a goal
export const deleteGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedGoal = await StudyPlanner.findByIdAndDelete(id);
  if (!deletedGoal) return res.status(404).json({ message: "Goal not found" });
  res.json({ message: "Goal deleted" });
});

// Update a task's completion status
export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { taskId, isCompleted } = req.body;
  const goal = await StudyPlanner.findById(id);
  if (!goal) return res.status(404).json({ message: "Goal not found" });
  const task = goal.tasks.id(taskId);
  if (task) task.isCompleted = isCompleted;
  await goal.save();
  res.json(goal);
});

// Get progress for a user
export const getProgress = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const goals = await StudyPlanner.find({ userId });
  res.json(goals);
});
