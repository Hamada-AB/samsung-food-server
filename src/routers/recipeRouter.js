import express from "express";
// import multer from "multer";
// import path from "path";
// const upload = multer({ dest: "uploads/" }); files

import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeCon.js";

export const recipeRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

recipeRouter
  .route("/")
  .get(authenticateToken, getRecipes)
  .post(authenticateToken, createRecipe)
  // .post(authenticateToken, upload.single("image"), createRecipe)
  .put(authenticateToken, updateRecipe)
  .delete(authenticateToken, deleteRecipe);
