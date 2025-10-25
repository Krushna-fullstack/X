import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// Routes
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/commnet.route.js";
import notificationRoutes from "./routes/notification.route.js";

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

connectDB()
  .then(() => {
    const server = app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
