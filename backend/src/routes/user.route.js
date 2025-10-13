import { Router } from "express";
import {
  getUserProfile,
  updateProfile,
  syncUser,
  getCurrentUser,
  followUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.get("/profile/:username", getUserProfile);

// Protected routes
router.post("/sync", protectRoute, syncUser);
router.get("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, updateProfile);
router.post("/follow/:targetUserId", protectRoute, followUser);

export default router;
