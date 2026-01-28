import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/authMiddleware.js";
import { toggleLike, getLikesCount } from "../controllers/likeController.js";

const router = Router();

router.post("/", requireAuth, requireUser, toggleLike);
router.get("/:contentId", getLikesCount);

export default router;