import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },   

    email: { type: String, required: true, unique: true }, 

    password: { type: String },  // Empty for Google users

    googleId: { type: String },  // OAuth User Id 

    provider: { 
      type: String, 
      default: "local"  
    },

    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);