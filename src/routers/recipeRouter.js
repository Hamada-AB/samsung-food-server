import express from "express";
import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeCon.js";

export const recipeRouter = express.Router();

recipeRouter
  .route("/")
  .post(authenticateToken, createRecipe)
  .get(authenticateToken, getRecipes);

recipeRouter
  .route("/:id")
  .delete(authenticateToken, deleteRecipe)
  .post(authenticateToken, updateRecipe);
