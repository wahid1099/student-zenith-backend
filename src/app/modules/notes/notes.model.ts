import { Schema, model, Types } from "mongoose";

const notesSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String },

  tags: [{ type: String }],
  subject: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Notes = model("Notes", notesSchema);
