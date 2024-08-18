import express from "express";
import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createComment,
  updateComment,
  getComments,
  deleteComment,
} from "../controllers/commentCon.js";

export const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(authenticateToken, createComment)
  .get(authenticateToken, getComments);

commentRouter
  .route("/:id")
  .delete(authenticateToken, deleteComment)
  .post(authenticateToken, updateComment);
