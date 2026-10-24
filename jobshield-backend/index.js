import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/mongodb.config.js";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  } else if (origin) { return res.status(403).json({ message: "Origin is not allowed by CORS" }); }
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
app.use(cookieParser());
const requestCounts = new Map();
app.use("/api", (req, res, next) => {
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now(); const previous = requestCounts.get(key);
  if (!previous || now - previous.start >= 60_000) requestCounts.set(key, { start: now, count: 1 });
  else previous.count += 1;
  const entry = requestCounts.get(key);
  if (entry.count > 120) return res.status(429).json({ message: "Too many requests. Please wait a minute and try again." });
  if (requestCounts.size > 5000) for (const [ip, value] of requestCounts) if (now - value.start > 60_000) requestCounts.delete(ip);
  next();
});
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "jobshield-api" }));
app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  if (error?.type === "entity.too.large" || error?.code === "LIMIT_FILE_SIZE") return res.status(413).json({ message: "Request payload is too large" });
  if (error?.name === "MulterError" || /Only PNG, JPEG and WEBP/.test(error?.message || "")) return res.status(400).json({ message: error.message || "Invalid uploaded file" });
  console.error("Unhandled API error:", error?.message || error);
  return res.status(500).json({ message: "Unexpected server error" });
});

const PORT = Number(process.env.PORT || 5000);
connectDB().then(() => app.listen(PORT, () => console.log(`JobShield API listening on port ${PORT}`)))
  .catch((error) => { console.error(error.message); process.exit(1); });
 