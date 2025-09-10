import { Schema, model } from "mongoose";

const motivationSchema = new Schema({
  quote: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Motivation = model("Motivation", motivationSchema);
