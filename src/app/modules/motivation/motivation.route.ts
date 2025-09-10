import { Router } from "express";
import { getDailyQuote, getQuotes } from "./motivation.controller";

const router = Router();

router.get("/daily", getDailyQuote);
router.get("/", getQuotes);

export default router;
