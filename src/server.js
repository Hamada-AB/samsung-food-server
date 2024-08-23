import "dotenv/config";
import express from "express";
import cors from "cors";

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

import { userRouter } from "./routers/userRouter.js";
import { recipeRouter } from "./routers/recipeRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { savedRecipeRouter } from "./routers/savedRecipeRouter.js";

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/comment", commentRouter);
app.use("/savedRecipe", savedRecipeRouter);
