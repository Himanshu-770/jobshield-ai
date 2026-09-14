import { BadgeQuestionMark, CheckCircle } from "lucide-react";

const checks = [
  "Domain Reputation & Age Check",
  "Compensation Validation",
  "Scam Pattern Detection",
  "Immediate Verification Score",
];

export default function WhatWeAnalyze() {
  return (
    <aside
      className="h-fit rounded-xl border p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--primary) 10%, transparent)",
          color: "var(--primary)",
        }}
      >
        <BadgeQuestionMark size={26} />
      </div>

      <h2
        className="mt-5 text-base font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        What We Analyze
      </h2>

      <p
        className="mt-2 text-xs font-semibold leading-4"
        style={{ color: "var(--text-secondary)" }}
      >
        JobShield AI checks suspicious language, recruiter details, salary
        claims, domain registration age, and other threat indicators.
      </p>

      <div className="mt-4 space-y-3">
        {checks.map((check) => (
          <div
            key={check}
            className="flex items-center gap-2 text-xs font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            <CheckCircle
              size={16}
              className="shrink-0"
              style={{ color: "var(--primary)" }}
            />

            <span>{check}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
