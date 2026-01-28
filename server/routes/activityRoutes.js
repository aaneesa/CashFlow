import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/authMiddleware.js";
import { getUserActivity } from "../controllers/activityController.js";

const router = Router();

router.get("/", requireAuth, requireUser, getUserActivity);

export default router;