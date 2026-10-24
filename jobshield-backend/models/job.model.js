import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  sourceType: { type: String, enum: ["url", "details", "screenshot"], default: "details" },
  sourceUrl: { type: String, default: "" },
  job: { type: mongoose.Schema.Types.Mixed, default: {} },
  scam_analysis: { type: mongoose.Schema.Types.Mixed, default: {} },
  riskScore: { type: Number, min: 0, max: 100, default: null },
  riskLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL", "UNKNOWN"], default: "UNKNOWN" },
  summary: { type: String, default: "" },
  redFlags: { type: [mongoose.Schema.Types.Mixed], default: [] },
  riskBreakdown: { type: [mongoose.Schema.Types.Mixed], default: [] },
  // Persisted independently of the browser session so a signed-in user can
  // resume the investigation conversation from any device.
  conversation: { type: [{ role: { type: String, enum: ["user", "assistant"], required: true }, content: { type: String, required: true }, createdAt: { type: Date, default: Date.now } }], default: [] },
  followupExperience: { type: String, default: "" },
}, { timestamps: true, strict: true });

JobSchema.index({ user: 1, createdAt: -1 });
export const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
