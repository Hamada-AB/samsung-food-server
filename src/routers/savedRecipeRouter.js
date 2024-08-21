import express from "express";
import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createSavedRecipe,
  getSavedRecipes,
  deleteSavedRecipe,
  getAllSavedRecipes,
} from "../controllers/savedRecipeCon.js";

export const savedRecipeRouter = express.Router();

savedRecipeRouter.route("/all").get(authenticateToken, getAllSavedRecipes);

savedRecipeRouter
  .route("/")
  .get(authenticateToken, getSavedRecipes)
  .post(authenticateToken, createSavedRecipe)
  .delete(authenticateToken, deleteSavedRecipe);
