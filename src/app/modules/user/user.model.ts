import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

const User = model("User", userSchema);
export default User;
