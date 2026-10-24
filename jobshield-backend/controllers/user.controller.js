import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { checkFormat } from "../utils/ValidateInput.js";
import cloudinary from "../config/cloudinary.config.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const cookieOptions = () => ({
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});
const publicUser = (user) => ({
  id: user._id,
  fullname: user.fullname,
  email: user.email,
  phone: user.phone || "",
  location: user.location || "",
  avatar: user.avatar || "",
  createdAt: user.createdAt,
});
const issueToken = (user, res) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, cookieOptions());
};

export const signup = async (req, res) => {
  try {
    const fullname = String(req.body?.fullname ?? req.body?.fullName ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    if (!fullname || fullname.length > 100 || !email || !password) return res.status(400).json({ message: "Full name, email and password are required" });
    const validation = checkFormat({ email, password });
    if (!validation.valid) return res.status(400).json({ message: validation.error });
    if (await User.exists({ email })) return res.status(409).json({ message: "An account with this email already exists" });
    const rounds = Math.min(14, Math.max(10, Number(process.env.SALT_ROUND) || 12));
    const user = await User.create({ fullname, email, password: await bcrypt.hash(password, rounds) });
    issueToken(user, res);
    return res.status(201).json({ message: "Account created successfully", user: publicUser(user) });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: "An account with this email already exists" });
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Could not create your account" });
  }
};

export const login = async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid email or password" });
    issueToken(user, res);
    return res.json({ message: "Signed in successfully", user: publicUser(user) });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Could not sign in" });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", cookieOptions());
  return res.json({ message: "Signed out successfully" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user: publicUser(user) });
};

export const updateProfile = async (req, res) => {
  const allowed = {};
  for (const field of ["fullname", "phone", "location", "avatar"]) {
    if (req.body?.[field] !== undefined) allowed[field] = String(req.body[field]).trim();
  }
  if (allowed.fullname !== undefined && (!allowed.fullname || allowed.fullname.length > 100)) return res.status(400).json({ message: "Full name must be between 1 and 100 characters" });
  if (allowed.phone && allowed.phone.length > 30) return res.status(400).json({ message: "Phone number is too long" });
  if (allowed.location && allowed.location.length > 150) return res.status(400).json({ message: "Location is too long" });
  if (allowed.avatar && allowed.avatar.length > 2048) return res.status(400).json({ message: "Avatar URL is too long" });
  const user = await User.findByIdAndUpdate(req.userId, { $set: allowed }, { new: true, runValidators: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ message: "Profile updated", user: publicUser(user) });
};

export const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Choose a profile image first" });
  if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) return res.status(503).json({ message: "Cloudinary is not configured on the server" });
  try {
    const uploaded = await uploadToCloudinary(req.file.buffer);
    const user = await User.findByIdAndUpdate(req.userId, { $set: { avatar: uploaded.secure_url } }, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "Profile image updated", user: publicUser(user) });
  } catch (error) {
    console.error("Profile image upload failed:", error.message);
    return res.status(502).json({ message: "Could not upload profile image to Cloudinary" });
  }
};
