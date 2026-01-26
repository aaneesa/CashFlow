import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

LikeSchema.index({ contentId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Like", LikeSchema);