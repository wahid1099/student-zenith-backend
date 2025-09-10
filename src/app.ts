import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import config from "./config/index";

const app: Application = express();
// app.use(cors());
//using cors to prevent
app.use(
  cors({
    origin: [
      "*",
      "https://student-zenith.netlify.app",
      "http://localhost:5173",
      "http://localhost:8080",
    ],

    credentials: true, // Allow cookies and headers like Authorization
  })
);

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req: Request, res: Response) => {
  console.log("DB URL:", config.db_url ? "<loaded>" : "<NOT loaded>");
  console.log("DB_URL env var:", process.env.DB_URL);

  res.send({
    Message: "Student Life Toolkit Backend is running successfully",
  });
});

app.use("/api/v1", router);

// Not found handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);
export default app;
