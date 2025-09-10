import { Router } from "express";
import {
  createUser,
  loginUser,
  forgotPassword,
  blockUser,
} from "./user.controller";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.patch("/:id/block", blockUser);

export default router;
