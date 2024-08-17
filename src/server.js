import "dotenv/config";
import express from "express";
import cors from "cors";

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import { userRouter } from "./routers/userRouter.js";

app.use("/user", userRouter);
