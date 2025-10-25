import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", protectRoute, getNotifications);
router.delete("/:notificationId", protectRoute, deleteNotification);

export default router;
