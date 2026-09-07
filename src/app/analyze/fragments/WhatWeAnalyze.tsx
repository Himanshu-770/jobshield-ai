import { CheckCircle, BadgeQuestionMark } from "lucide-react";

const checks = [
  "Domain Reputation & Age Check",
  "Compensation Validation",
  "Scam Pattern Detection",
  "Immediate Verification Score",
];

export default function WhatWeAnalyze() {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-[#111A2E] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
        <BadgeQuestionMark size={26} />
      </div>

      <h2 className="mt-5 text-base font-semibold">
        What We Analyze
      </h2>

      <p className="mt-2 text-[12px] font-semibold leading-4 text-gray-500">
        JobShield AI checks suspicious language, recruiter details,
        salary claims, domain registration age, and other threat
        indicators.
      </p>

      <div className="mt-4 space-y-3">
        {checks.map((check) => (
          <div
            key={check}
            className="flex items-center gap-2 text-[12px] font-semibold text-gray-400"
          >
            <CheckCircle
              size={16}
              className="shrink-0 text-blue-500"
            />

            <span>{check}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}