import userRoutes from "../modules/user/user.route";
import classScheduleRoutes from "../modules/classSchedule/classSchedule.route";
import budgetRoutes from "../modules/budget/budget.route";
import examQARoutes from "../modules/examQA/examQA.route";
// import studyPlannerRoutes from "../../modules/studyPlanner/studyPlanner.route";
import notesRoutes from "../modules/notes/notes.route";
// import motivationRoutes from "../../modules/motivation/motivation.route";
// import notificationRoutes from "../../modules/notification/notification.route";
import todoRoutes from "../modules/Todo/todo.route";
export const moduleRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/class-schedule", route: classScheduleRoutes },
  { path: "/budget", route: budgetRoutes },
  { path: "/exam-qa", route: examQARoutes },
  //   { path: "/study-planner", route: studyPlannerRoutes },
  { path: "/notes", route: notesRoutes },
  { path: "/todo", route: todoRoutes },
  //   { path: "/motivation", route: motivationRoutes },
  //   { path: "/notifications", route: notificationRoutes },
];
