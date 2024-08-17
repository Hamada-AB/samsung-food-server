import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({ message: "Access Denied: Invalid token" });
    }
    req.user = user;
    next();
  });
};
