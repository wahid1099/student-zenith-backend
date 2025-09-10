import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const studyPlannerSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    goalTitle: { type: String, required: true },
    description: { type: String },
    tasks: [taskSchema],
    deadline: { type: Date },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const StudyPlanner = model("StudyPlanner", studyPlannerSchema);
