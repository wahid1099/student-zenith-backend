import { Request, Response } from "express";
import { Budget } from "./budget.model";
import { Types } from "mongoose";

export const addTransaction = async (req: Request, res: Response) => {
  const transaction = await Budget.create(req.body);
  res.status(201).json(transaction);
};

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const transactions = await Budget.find({ userId });
  res.json(transactions);
};

export const getSummary = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const transactions = await Budget.find({
    userId: new Types.ObjectId(userId),
  });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  res.json({ income, expense, balance: income - expense });
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Budget.findByIdAndDelete(id);
  res.status(204).send();
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const transaction = await Budget.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.json(transaction);
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = await Budget.findById(id);
  res.json(transaction);
};
