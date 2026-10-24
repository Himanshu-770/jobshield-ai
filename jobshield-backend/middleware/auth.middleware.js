import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ message: "Authentication is not configured" });
  const token = req.cookies?.token || req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ message: "Please sign in to continue" });
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Your session is invalid or expired" });
  }
};
