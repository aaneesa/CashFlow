import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";

import passport from "passport";
import "./config/passport.js";

import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import { requireAuth, requireUser, requireAdmin } from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.use(passport.initialize());

app.use("/auth", googleAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/activity", activityRoutes);

app.use("/api/user", requireAuth, requireUser, userRoutes);

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect DB", err);
  process.exit(1);
});