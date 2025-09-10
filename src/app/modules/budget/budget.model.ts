import { Schema, model, Types } from "mongoose";

const budgetSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export const Budget = model("Budget", budgetSchema);
