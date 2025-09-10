import { Schema, model, Types } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = model("Notification", notificationSchema);
