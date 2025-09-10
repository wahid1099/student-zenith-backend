import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createUserService } from "./user.service";
import User from "./user.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  res.status(201).json({ success: true, data: user });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.isBlocked)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials or user blocked" });
  // For demo: compare plain text (hash in prod)
  if (user.password !== password)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );
  res.json({ success: true, token, userId: user._id });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
    // Here, send email logic (use nodemailer in prod)
    res.json({
      success: true,
      message: "Password reset email sent",
      resetToken,
    });
  }
);

export const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user });
});
