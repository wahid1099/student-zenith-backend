import { Request, Response } from "express";
import { Notification } from "./notification.model";

export const addNotification = async (req: Request, res: Response) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(notification);
};

export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId });
  res.json(notifications);
};

export const markAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
  res.json(notification);
};
