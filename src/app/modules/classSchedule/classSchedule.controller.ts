import { Request, Response } from "express";
import { ClassSchedule } from "./classSchedule.model";

export const createClass = async (req: Request, res: Response) => {
  const classData = req.body;
  const newClass = await ClassSchedule.create(classData);
  res.status(201).json(newClass);
};

export const getClasses = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({ userId });
  res.json(classes);
};

export const getWeeklyTimetable = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const timetable = await ClassSchedule.find({ userId });
  res.json(timetable);
};

export const updateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedClass = await ClassSchedule.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.json(updatedClass);
};

export const deleteClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ClassSchedule.findByIdAndDelete(id);
  res.status(204).send();
};

export const getClassById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const classItem = await ClassSchedule.findById(id);
  res.json(classItem);
};
export const getClassesByDay = async (req: Request, res: Response) => {
  const { day } = req.params;
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({ day, userId });
  res.json(classes);
};
export const getClassesBySubject = async (req: Request, res: Response) => {
  const { subject } = req.params;
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({ subject, userId });
  res.json(classes);
};
export const getClassesByTeacher = async (req: Request, res: Response) => {
  const { teacher } = req.params;
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({ teacher, userId });
  res.json(classes);
};
export const getClassesByRoom = async (req: Request, res: Response) => {
  const { roomno } = req.params;
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({ roomno, userId });
  res.json(classes);
};
export const getClassesByTime = async (req: Request, res: Response) => {
  const { startTime, endTime } = req.query;
  const userId = req.query.userId;
  const classes = await ClassSchedule.find({
    startTime: { $gte: startTime },
    endTime: { $lte: endTime },
    userId,
  });
  res.json(classes);
};
