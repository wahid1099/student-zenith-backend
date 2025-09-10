import { Schema, model, Types } from "mongoose";

const classScheduleSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    roomno: { type: String, required: true },
  },
  { timestamps: true }
);

export const ClassSchedule = model("ClassSchedule", classScheduleSchema);
