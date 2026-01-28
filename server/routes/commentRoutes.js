import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/authMiddleware.js";
import { addComment, getComments, deleteComment, editComment } from "../controllers/commentController.js";

const router = Router();

router.post("/", requireAuth, requireUser, addComment);        
router.get("/:contentId", getComments);                         
router.put("/:id", requireAuth, requireUser, editComment);       
router.delete("/:id", requireAuth, requireUser, deleteComment); 

export default router;