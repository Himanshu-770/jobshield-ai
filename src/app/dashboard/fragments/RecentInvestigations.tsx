
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { investigations } from "@/data/investigation";

const riskStyles = {
  "Low Risk": {
    backgroundColor:
      "color-mix(in srgb, var(--risk-low) 10%, transparent)",
    color: "var(--risk-low)",
  },
  "Medium Risk": {
    backgroundColor:
      "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
    color: "var(--risk-medium)",
  },
  "High Risk": {
    backgroundColor:
      "color-mix(in srgb, var(--risk-high) 10%, transparent)",
    color: "var(--risk-high)",
  },
  Critical: {
    backgroundColor:
      "color-mix(in srgb, var(--risk-high) 10%, transparent)",
    color: "var(--risk-high)",
  },
};

const scoreStyles = {
  "Low Risk": "var(--risk-low)",
  "Medium Risk": "var(--risk-medium)",
  "High Risk": "var(--risk-high)",
  Critical: "var(--risk-high)",
};

export default function RecentInvestigations() {
  return (
    <section
      className="min-w-0 rounded-xl border p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:p-6 lg:min-h-[438px]"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <h2
        className="text-base font-semibold tracking-[-0.01em]"
        style={{ color: "var(--text-primary)" }}
      >
        Recent Investigations
      </h2>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="min-w-[548px]">
          <div
            className="grid grid-cols-[1.65fr_1.05fr_.9fr_.85fr_1.15fr_.65fr] items-center gap-3 border-b pb-2 text-xs font-medium"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <span>JOB TITLE</span>
            <span>COMPANY</span>
            <span>RISK SCORE</span>
            <span>RISK LEVEL</span>
            <span>LAST UPDATED</span>
            <span>ACTION</span>
          </div>

          <div className="mt-3 space-y-3">
            {investigations.slice(0, 5).map((job) => {
              const risk = job.riskLevel as keyof typeof riskStyles;

              return (
                <div
                  key={`${job.userId}-${job.id}`}
                  className="grid grid-cols-[1.65fr_1.05fr_.9fr_.85fr_1.15fr_.65fr] items-center gap-3 rounded-md px-3 py-2.5 text-sm"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="truncate font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {job.jobTitle}
                  </span>

                  <span
                    className="truncate"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {job.company}
                  </span>

                  <span
                    className="font-semibold"
                    style={{ color: scoreStyles[risk] }}
                  >
                    {job.score}/100
                  </span>

                  <span>
                    <span
                      className="inline-flex rounded-2xl px-2 py-1 text-xs font-medium"
                      style={riskStyles[risk]}
                    >
                      {job.riskLevel}
                    </span>
                  </span>

                  <span
                    className="whitespace-nowrap"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {job.lastUpdated}
                  </span>

                  <Link
                    href={`/history/${job.userId}/${job.companySlug}?from=dashboard`}
                    className="inline-flex w-fit items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    View
                    <ChevronRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
