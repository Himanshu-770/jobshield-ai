"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleAlert,
  CircleX,
  Globe,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function AnalysisResult() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/analyze"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Analyze
          </Link>

          <span className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={15} className="text-blue-500" />
            JobShield AI Analysis
          </span>
        </div>

        {/* Main Result */}
        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
          {/* Risk Assessment */}
          <section className="rounded-xl border border-white/10 bg-[#111A2E] p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                  Overall Risk Assessment
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-5xl font-bold text-red-500">78</span>

                  <span className="mb-1 text-sm text-gray-500">/ 100</span>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold text-red-400">
                <CircleAlert size={13} />
                HIGH RISK
              </div>
            </div>

            {/* Warning */}
            <div className="mt-6 border-l-2 border-red-500 pl-4">
              <p className="text-sm leading-5 text-gray-400">
                This job contains several indicators commonly associated with
                recruitment scams. Proceed with extreme caution and do not
                provide sensitive personal information.
              </p>
            </div>

            {/* Score explanation */}
            <div className="mt-7">
              <div className="mb-2 flex justify-between text-[11px]">
                <span className="text-gray-500">Risk Level</span>
                <span className="text-red-400">High Risk</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#080D17]">
                <div className="h-full w-[78%] rounded-full bg-red-500" />
              </div>
            </div>
          </section>

          {/* Company Verification */}
          <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-blue-500" />

              <h2 className="text-sm font-semibold">Company Verification</h2>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-[9px] uppercase text-gray-600">
                  Company Name
                </p>

                <p className="mt-1 text-sm text-gray-300">Apex Global Tech</p>
              </div>

              <div>
                <p className="text-[9px] uppercase text-gray-600">Status</p>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-yellow-400">
                  <CircleAlert size={13} />
                  Needs Review
                </div>
              </div>

              <Link
                href="/investigation"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-xs font-semibold transition hover:bg-blue-400"
              >
                Investigate This Company
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </section>
        </div>

        {/* Analysis Details */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Red Flags */}
          <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                <ShieldAlert size={16} className="text-red-400" />
              </div>

              <h2 className="text-sm font-semibold">Red Flags Detected</h2>
            </div>

            <div className="mt-5 space-y-3">
              <Flag
                icon={<CircleX size={14} />}
                title="Upfront payment requested"
                description="Listing requires candidates to purchase software or equipment before starting."
              />

              <Flag
                icon={<Mail size={14} />}
                title="Generic recruiter email"
                description="Recruiter uses a free email provider instead of a corporate domain."
              />

              <Flag
                icon={<CircleAlert size={14} />}
                title="Urgent language"
                description="Job description uses high-pressure tactics to force quick applications."
              />

              <Flag
                icon={<CircleAlert size={14} />}
                title="Unrealistic salary"
                description="Compensation appears significantly higher than industry standards."
              />
            </div>
          </section>

          {/* Positive Signals */}
          <div className="space-y-5">
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck size={16} className="text-emerald-400" />
                </div>

                <h2 className="text-sm font-semibold">Positive Signals</h2>
              </div>

              <div className="mt-5 space-y-3">
                <Signal text="Clear job responsibilities outlined" />
                <Signal text="Detailed job description provided" />
                <Signal text="Company information is available" />
              </div>
            </section>

            {/* Domain Analysis */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-blue-500" />

                <h2 className="text-sm font-semibold">Domain Analysis</h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DomainItem
                  label="Recruiter Email"
                  value="recruiter@gmail.com"
                />

                <DomainItem label="Company Domain" value="apexglobaltech.com" />
              </div>

              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-red-400">
                    <CircleX size={14} />
                    Email Domain Match
                  </div>

                  <span className="text-[10px] font-semibold text-red-400">
                    FAILED
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-gray-500">
                  Domains do not match exactly.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111A2E] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Need another check?</h2>

            <p className="mt-1 text-xs text-gray-500">
              Analyze another job before you apply.
            </p>
          </div>

          <Link
            href="/analyze"
            className="flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Analyze Another Job
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Flag({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-[#080D17] p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-red-400">{icon}</div>

        <div>
          <p className="text-xs font-semibold text-gray-300">{title}</p>

          <p className="mt-1 text-[10px] leading-4 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Signal({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <Check size={14} className="text-emerald-400" />
      {text}
    </div>
  );
}

function DomainItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase text-gray-600">{label}</p>

      <div className="mt-2 rounded-md border border-white/10 bg-[#080D17] px-3 py-2 text-[10px] text-gray-400">
        {value}
      </div>
    </div>
  );
}
