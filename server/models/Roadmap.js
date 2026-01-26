import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    category: {
      type: String,
      enum: ["Finance", "Investing", "Stock Market", "Money Management"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },

    // ⇝ Beginner, Intermediate, Advanced levels
    levels: {
      beginner: [
        {
          title: { type: String, required: true },  
          articleLink: { type: String, required: true }, 
        },
      ],
      intermediate: [
        {
          title: { type: String, required: true },
          articleLink: { type: String, required: true },
        },
      ],
      advanced: [
        {
          title: { type: String, required: true },
          articleLink: { type: String, required: true },
        },
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // only admin can create/update roadmap
      required: true,
    },
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;