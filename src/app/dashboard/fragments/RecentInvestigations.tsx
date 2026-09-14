
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { investigations } from "@/data/investigation";

const riskStyles = {
  "Low Risk": "bg-emerald-500/10 text-emerald-400",
  "Medium Risk": "bg-amber-500/10 text-amber-400",
  "High Risk": "bg-red-500/10 text-red-400",
  Critical: "bg-red-500/10 text-red-400",
};

const scoreStyles = {
  "Low Risk": "text-emerald-400",
  "Medium Risk": "text-amber-400",
  "High Risk": "text-red-400",
  Critical: "text-red-400",
};

export default function RecentInvestigations() {
  return (
    <section className="min-w-0 rounded-xl border border-white/10 bg-[#111a2e] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12)] lg:min-h-[438px]">
      <h2 className="text-base font-semibold tracking-[-0.01em] text-white">
        Recent Investigations
      </h2>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="min-w-[548px]">
          <div className="grid grid-cols-[1.65fr_1.05fr_.9fr_.85fr_1.15fr_.65fr] items-center gap-3 border-b border-white/5 pb-2 text-[11px] font-medium text-[#71809b]">
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
                  className="grid grid-cols-[1.65fr_1.05fr_.9fr_.85fr_1.15fr_.65fr] items-center gap-3 rounded-md bg-[#070d19] px-3 py-2.5 text-[12px]"
                >
                  <span className="truncate font-semibold text-white">
                    {job.jobTitle}
                  </span>

                  <span className="truncate text-[#8d9ab0]">
                    {job.company}
                  </span>

                  <span
                    className={`font-semibold ${scoreStyles[risk]}`}
                  >
                    {job.score}/100
                  </span>

                  <span>
                    <span
                      className={`inline-flex rounded-2xl px-2 py-1 text-[10px] font-medium ${riskStyles[risk]}`}
                    >
                      {job.riskLevel}
                    </span>
                  </span>

                  <span className="whitespace-nowrap text-[#71809b]">
                    {job.lastUpdated}
                  </span>

                  <Link
                   href={`/history/${job.userId}/${job.companySlug}?from=dashboard`}
                    className="inline-flex w-fit items-center gap-1 rounded-md border border-white/10 px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-white/5"
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