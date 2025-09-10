import { Router } from "express";
import {
  addNotification,
  getNotifications,
  markAsRead,
} from "./notification.controller";

const router = Router();

router.post("/", addNotification);
router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);

export default router;
