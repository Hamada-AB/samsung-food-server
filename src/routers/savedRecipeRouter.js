import express from "express";
import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createSavedRecipe,
  getSavedRecipes,
  deleteSavedRecipe,
} from "../controllers/savedRecipeCon.js";

export const savedRecipeRouter = express.Router();

savedRecipeRouter
  .route("/")
  .post(authenticateToken, createSavedRecipe)
  .delete(authenticateToken, deleteSavedRecipe);

savedRecipeRouter.route("/:userId").get(authenticateToken, getSavedRecipes);
