import { Request, Response } from "express";
import { Notes } from "./notes.model";

export const addNote = async (req: Request, res: Response) => {
  const note = await Notes.create(req.body);
  res.status(201).json(note);
};

export const getNotes = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const notes = await Notes.find({ userId });
  res.json(notes);
};

export const updateNoteStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const note = await Notes.findByIdAndUpdate(id, { status }, { new: true });
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Notes.findByIdAndDelete(id);
  res.status(204).send();
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const note = await Notes.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(note);
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await Notes.findById(id);
  res.json(note);
};

export const getNotesByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const userId = req.query.userId;
  const notes = await Notes.find({ category, userId });
  res.json(notes);
};
