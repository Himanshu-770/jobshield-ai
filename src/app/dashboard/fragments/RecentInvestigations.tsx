import Link from "next/link";

const investigations = [
  ["Senior Software Developer", "TechCorp", "18/100", "Low", "Oct 15, 2024"],
  ["Marketing Executive", "GlobalTech", "56/100", "Medium", "Oct 14, 2024"],
  ["Data Entry Operator", "QuickCash", "86/100", "High", "Oct 13, 2024"],
];

const riskStyles = {
  Low: "bg-emerald-500/10 text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-400",
  High: "bg-red-500/10 text-red-400",
};

const scoreStyles = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-red-400",
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

          <div className="mt-2 space-y-2">
            {investigations.map((job) => {
              const risk = job[3] as keyof typeof riskStyles;

              return (
                <div
                  key={job[0]}
                  className="grid grid-cols-[1.65fr_1.05fr_.9fr_.85fr_1.15fr_.65fr] items-center gap-3 rounded-md bg-[#070d19] px-3 py-2.5 text-[12px]"
                >
                  <span className="truncate font-semibold text-white">{job[0]}</span>
                  <span className="truncate text-[#8d9ab0]">{job[1]}</span>
                  <span className={`font-semibold ${scoreStyles[risk]}`}>{job[2]}</span>
                  <span>
                    <span className={`inline-flex rounded-2xl px-2 py-1 text-[10px] font-medium ${riskStyles[risk]}`}>
                      {job[3]}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-[#71809b]">{job[4]}</span>
                  <Link
                    href="/history"
                    className="inline-flex w-fit rounded-md border-1 border-white/10 px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-white/5"
                  >
                    View
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
