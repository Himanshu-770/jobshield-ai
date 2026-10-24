import test from "node:test";
import assert from "node:assert/strict";
import { deriveRisk } from "../controllers/job.controller.js";

function makeJob(overrides = {}) {
  return {
    "Job Title": "Full Stack Development Internship",
    Company: "Example Foundation",
    "Job Description": "Build and maintain frontend and backend features, write tests, review code, and collaborate with the engineering team.",
    "Skills Required": ["JavaScript", "React", "Node.js"],
    Duration: "3 months",
    Stipend: "Unpaid",
    "Company Website": "https://example.org",
    "Company Registration": "Registration details supplied",
    Company_Domain_Of_Work: ["Software development"],
    "Recruiter Email": "careers@example.org",
    "Company Research Sources": [],
    ...overrides,
  };
}

function analyze(job, scam_analysis = {}) {
  return deriveRisk({ job, scam_analysis });
}

test("numeric LLM score does not change the deterministic final score", () => {
  const a = analyze(makeJob(), { scam_risk_score: 1 });
  const b = analyze(makeJob(), { scam_risk_score: 99 });
  assert.equal(a.score, b.score);
  assert.equal(a.level, b.level);
});

test("positive signals never subtract risk points", () => {
  const a = analyze(makeJob(), {});
  const b = analyze(makeJob(), {
    positive_signals: ["The company has a website", "Positive review found"],
    positive_legitimacy_signals: ["The company is legitimate"],
  });
  assert.equal(a.score, b.score);
});

test("missing job-posting details add visible, capped uncertainty points", () => {
  const complete = analyze(makeJob());
  const incomplete = analyze(makeJob({
    "Job Description": "",
    "Skills Required": [],
    Duration: "",
    Stipend: "",
    Salary: "",
  }));
  assert.ok(incomplete.score > complete.score);
  assert.ok(incomplete.breakdown.some((item) => item.indicator === "Internship stipend is not specified"));
  assert.ok(incomplete.breakdown.some((item) => item.indicator === "Internship duration is not specified"));
  assert.ok(incomplete.breakdown.some((item) => item.indicator === "Job responsibilities or description not provided"));
  assert.ok(incomplete.breakdown.reduce((sum, item) => sum + item.weight, 0) === incomplete.score);
});

test("unpaid internship is a limited contextual signal, not a critical scam signal", () => {
  const result = analyze(makeJob());
  const unpaid = result.breakdown.find((item) => item.indicator.includes("Unpaid internship"));
  assert.ok(unpaid);
  assert.equal(unpaid.weight, 5);
  assert.notEqual(result.level, "CRITICAL");
});

test("fixed direct critical evidence cannot be offset by positive signals", () => {
  const job = makeJob({ "Job Description": "Applicants must pay a registration fee before joining." });
  const a = analyze(job, {});
  const b = analyze(makeJob({ "Job Description": "Applicants must pay a registration fee before joining." }), {
    positive_signals: ["Verified company website", "Excellent reviews", "Legitimate opportunity"],
  });
  assert.equal(a.score, b.score);
  assert.ok(a.score >= 35);
  assert.ok(["HIGH", "CRITICAL"].includes(a.level));
});
