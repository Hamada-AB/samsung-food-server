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
  .get(authenticateToken, getComments)
  .post(authenticateToken, createComment)
  .put(authenticateToken, updateComment);

commentRouter.route("/:id").delete(authenticateToken, deleteComment);
