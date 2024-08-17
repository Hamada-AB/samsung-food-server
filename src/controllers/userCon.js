import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDb, findUserDb, updateUserDb } from "../queries/user.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await createUserDb(email, hashedPassword);

    res.status(201).json({
      message:
        "Your account has been created successfully. You can log in to your account now.",
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res.status(409).json({
        error: "Email already exists. Please try again with another one.",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please enter your email and password." });
  }

  const user = await findUserDb(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    await updateUserDb(user.id, token);
    res.json({ token, userInfo: { email, lastVisit: user.updatedAt } });
  } else {
    res
      .status(401)
      .json({ error: "Email or password is incorrect! Please try again." });
  }
};
