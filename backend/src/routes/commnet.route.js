import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/posts/:postId", getComments);

// Private routes

router.post("/posts/:postId", protectRoute, createComment);
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
