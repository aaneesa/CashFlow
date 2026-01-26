import { Router } from "express";
import { userRegister, userLogin, userLogout } from "../controllers/userAuthController.js";
import { adminRegister, adminLogin, adminLogout } from "../controllers/adminAuthController.js";
import { requireAuth, requireUser, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// User Auth
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.post("/user/logout", requireAuth, requireUser, userLogout);

// Admin Auth
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", requireAuth, requireAdmin, adminLogout);

export default router;