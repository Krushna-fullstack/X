import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
import userRoutes from "./routes/user.route.js";
app.use("/api/users", userRoutes);

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });

    app.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
