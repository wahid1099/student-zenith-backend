import { Todo } from "./todo.model";
import { Request, Response } from "express";

export const addTodo = async (req: Request, res: Response) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const todos = await Todo.find({ userId });
  res.json(todos);
};
export const updateTodoStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(204).send();
};
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(todo);
};
export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.json(todo);
};
export const getTodosByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const userId = req.query.userId;
  const todos = await Todo.find({ category, userId });
  res.json(todos);
};
