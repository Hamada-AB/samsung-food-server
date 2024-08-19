import express from "express";
import { register, login, getUsers } from "../controllers/userCon.js";
import { authenticateToken } from "../meddileware/authenticateToken.js";
export const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/users").get(authenticateToken, getUsers);
