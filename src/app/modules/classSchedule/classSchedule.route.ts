import { Router } from "express";
import {
  createClass,
  getClasses,
  getWeeklyTimetable,
  updateClass,
  deleteClass,
  getClassById,
  getClassesByDay,
  getClassesBySubject,
  getClassesByTeacher,
  getClassesByRoom,
  getClassesByTime,
} from "./classSchedule.controller";

const router = Router();

router.post("/", createClass);
router.get("/", getClasses);
router.get("/week", getWeeklyTimetable);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.get("/:id", getClassById);
router.get("/day/:day", getClassesByDay);
router.get("/subject/:subject", getClassesBySubject);
router.get("/teacher/:teacher", getClassesByTeacher);
router.get("/room/:roomno", getClassesByRoom);
router.get("/time", getClassesByTime);

export default router;
