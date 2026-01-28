// src/routes/user.routes.js
import { Router } from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userControllers.js";
import { requireAuth, requireUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/profile", requireAuth, requireUser, getUserProfile);
router.put("/profile", requireAuth, requireUser, updateUserProfile);
router.delete("/profile", requireAuth, requireUser, deleteUserProfile);

export default router;