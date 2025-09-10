import { Schema, model, Types } from "mongoose";

const examQASchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const ExamQA = model("ExamQA", examQASchema);
