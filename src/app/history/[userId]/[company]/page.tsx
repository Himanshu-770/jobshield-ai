import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Mail,
  ShieldAlert,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Sidebar from "@/component/sidebar/Sidebar";
import { investigations } from "@/data/investigation";
import RecentRecruitmentUpdates from "./RecentRecruitmentUpdates";

type Props = {
  params: Promise<{
    userId: string;
    company: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
};

export default async function InvestigationPage({
  params,
  searchParams,
}: Props) {
  const { userId, company } = await params;
  const { from } = await searchParams;

  const investigation = investigations.find(
    (item) =>
      item.userId.toString() === userId &&
      item.companySlug === company,
  );

  const backHref = from === "dashboard" ? "/dashboard" : "/history";

  const backLabel =
    from === "dashboard" ? "Back to Dashboard" : "Back to History";

  if (!investigation) {
    return (
      <main className="min-h-screen bg-[#070B14] text-white md:flex">
        <Sidebar />

        <section className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <ShieldAlert size={40} className="text-red-400" />

          <h1 className="mt-4 text-xl font-bold">
            Investigation Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This investigation does not exist or is not available.
          </p>

          <Link
            href={backHref}
            className="mt-6 rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-400"
          >
            {backLabel}
          </Link>
        </section>
      </main>
    );
  }

  const scoreColor =
    investigation.score >= 80
      ? "text-red-400"
      : investigation.score >= 50
        ? "text-orange-400"
        : "text-emerald-400";

  return (
    <main className="min-h-screen bg-[#070B14] text-white md:flex">
      <Sidebar />

      <section className="min-w-0 flex-1 px-5 py-6 md:px-8 md:py-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-xs text-gray-500 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>

          <span className="text-[11px] text-gray-600">
            Investigation #{investigation.id}
          </span>
        </div>

        {/* Company Header */}
        <header className="mt-6 rounded-xl border border-white/10 bg-[#111A2E] p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Building2 size={26} />
              </div>

              <div>
                <p className="text-[12px] uppercase tracking-wider text-gray-500">
                  Company Investigation
                </p>

                <h1 className="mt-1 text-xl font-bold md:text-2xl">
                  {investigation.company}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {investigation.jobTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#080D17] px-4 py-3">
              <ShieldCheck size={20} className="text-blue-400" />

              <div>
                <p className="text-[10px] uppercase text-gray-500">
                  Overall Risk Score
                </p>

                <p className={`mt-1 text-xl font-bold ${scoreColor}`}>
                  {investigation.score}

                  <span className="ml-1 text-xs font-normal text-gray-600">
                    /100
                  </span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Investigation Overview */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
            <h2 className="text-base font-semibold">
              Investigation Overview
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {investigation.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<UserRound size={15} />}
                label="Recruiter Name"
                value={investigation.recruiterName}
              />

              <InfoItem
                icon={<Mail size={15} />}
                label="Recruiter Email"
                value={investigation.recruiterEmail}
              />

              <InfoItem
                icon={<Building2 size={15} />}
                label="Job Title"
                value={investigation.jobTitle}
              />

              <InfoItem
                icon={<CalendarDays size={15} />}
                label="Last Updated"
                value={investigation.lastUpdated}
              />
            </div>
          </section>

          {/* Company Verification */}
          <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-blue-400" />

              <h2 className="text-sm font-semibold">
                Company Verification
              </h2>
            </div>

            <p className="mt-4 text-[10px] uppercase text-gray-500">
              Company Name
            </p>

            <p className="mt-1 text-sm text-gray-200">
              {investigation.company}
            </p>

            <p className="mt-4 text-[10px] uppercase text-gray-500">
              Status
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-orange-400">
              <AlertTriangle size={14} />
              Needs Review
            </div>

            <div className="mt-5 rounded-md border border-orange-500/20 bg-orange-500/10 p-3 text-xs leading-5 text-orange-300">
              Verify company details before sharing sensitive information.
            </div>
          </section>
        </div>

        {/* Recent Recruitment Updates */}
        <div className="mt-5">
          <RecentRecruitmentUpdates
            initialUpdates={investigation.updates}
          />
        </div>

        {/* Risk Indicators */}
        <section className="mt-5 rounded-xl border border-white/10 bg-[#111A2E] p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert size={17} className="text-red-400" />

            <h2 className="text-base font-semibold">
              Detected Risk Indicators
            </h2>
          </div>

          {investigation.redFlags.length > 0 ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {investigation.redFlags.map((flag) => (
                <div
                  key={flag.title}
                  className="rounded-lg border border-white/10 bg-[#080D17] p-4"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={15} className="text-red-400" />

                    <h3 className="text-sm font-medium text-gray-200">
                      {flag.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-[13px] leading-5 text-gray-500">
                    {flag.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-400">
              <CheckCircle2 size={17} />
              No major risk indicators detected.
            </div>
          )}
        </section>

        {/* Investigation Metadata */}
        <section className="mt-5 rounded-xl border border-white/10 bg-[#111A2E] p-5">
          <h2 className="text-base font-semibold">
            Investigation Details
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <InfoItem
              icon={<ShieldCheck size={15} />}
              label="Risk Level"
              value={investigation.riskLevel}
            />

            <InfoItem
              icon={<CalendarDays size={15} />}
              label="Last Updated"
              value={investigation.lastUpdated}
            />

            <InfoItem
              icon={<AlertTriangle size={15} />}
              label="Updates"
              value={investigation.updates.toString()}
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080D17] p-3">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-500">
        {icon}
        {label}
      </div>

      <p className="mt-2 break-words text-sm text-gray-200">
        {value}
      </p>
    </div>
  );
}