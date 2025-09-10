import { Router } from "express";
import {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
} from "./budget.controller";

const router = Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/summary", getSummary);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
