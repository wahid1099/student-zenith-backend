import { Schema, model, Types } from "mongoose";

const todoSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  category: { type: String },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Todo = model("Todo", todoSchema);
