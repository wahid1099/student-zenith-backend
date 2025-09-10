import { Request, Response } from "express";
import { Motivation } from "./motivation.model";

export const getDailyQuote = async (req: Request, res: Response) => {
  const quote = await Motivation.findOne().sort({ createdAt: -1 });
  res.json(quote);
};

export const getQuotes = async (req: Request, res: Response) => {
  const quotes = await Motivation.find();
  res.json(quotes);
};
