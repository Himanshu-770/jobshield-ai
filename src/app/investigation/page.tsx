import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  CircleX,
  Clock3,
  Globe,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import { companies } from "@/data/company";

export default function InvestigationPage() {
  /*
    Company track-record data is imported from:
    src/data/company.ts

    This is currently mock data.
    Later, it can be replaced with API/database data.
  */

  const company = companies[0];

  const riskColor =
    company.averageRiskScore >= 75
      ? "text-red-400"
      : company.averageRiskScore >= 50
        ? "text-orange-400"
        : "text-emerald-400";

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/analyze/result"
            className="flex items-center gap-2 text-xs text-gray-500 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Analysis
          </Link>

          <div className="flex items-center gap-2 text-[12px] text-gray-500">
            <ShieldCheck size={18} className="text-blue-400" />
            Company Track Record
          </div>
        </div>

        {/* Company Header */}
        <section className="mt-6 rounded-xl border border-white/10 bg-[#111A2E] p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Building2 size={28} />
              </div>

              <div>
                <p className="text-[12px] uppercase tracking-wider text-gray-500">
                  Company Investigation
                </p>

                <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                  {company.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Globe size={13} />
                    {company.domain}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {company.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} />
                    {company.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-fit rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400">
              {company.verificationStatus}
            </div>
          </div>
        </section>

        {/* Track Record Summary */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users size={18} />}
            label="Total Investigations"
            value={company.totalInvestigations.toString()}
            description="Reports in database"
          />

          <StatCard
            icon={<TrendingUp size={18} />}
            label="Average Risk Score"
            value={`${company.averageRiskScore}/100`}
            valueClassName={riskColor}
            description="Based on previous reports"
          />

          <StatCard
            icon={<ShieldAlert size={18} />}
            label="Scam Reports"
            value={company.scamReports.toString()}
            valueClassName="text-red-400"
            description="Reports with serious concerns"
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Positive Reports"
            value={company.positiveReports.toString()}
            valueClassName="text-emerald-400"
            description="Lower-risk reports"
          />
        </section>

        {/* Main Content */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Company Profile */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <Building2 size={17} className="text-blue-400" />

                <h2 className="text-sm font-semibold">Company Profile</h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={<Building2 size={15} />}
                  label="Company Name"
                  value={company.name}
                />

                <InfoItem
                  icon={<Globe size={15} />}
                  label="Official Domain"
                  value={company.domain}
                />

                <InfoItem
                  icon={<MapPin size={15} />}
                  label="Location"
                  value={company.location}
                />

                <InfoItem
                  icon={<CalendarDays size={15} />}
                  label="Founded"
                  value={company.founded}
                />

                <InfoItem
                  icon={<Building2 size={15} />}
                  label="Industry"
                  value={company.industry}
                />

                <InfoItem
                  icon={<Clock3 size={15} />}
                  label="Last Reported"
                  value={company.lastReported}
                />
              </div>

              <div className="mt-5 rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
                <div className="flex items-start gap-2">
                  <CircleAlert
                    size={16}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />

                  <div>
                    <p className="text-xs font-semibold text-orange-300">
                      Verification Notice
                    </p>

                    <p className="mt-1 text-xs leading-5 text-orange-200/70">
                      This company profile contains information collected from
                      previous reports. Verify the company's official details
                      independently before sharing personal or financial
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Red Flags */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert size={17} className="text-red-400" />

                <h2 className="text-sm font-semibold">
                  Commonly Reported Red Flags
                </h2>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {company.commonRedFlags.map((flag) => (
                  <div
                    key={flag.title}
                    className="rounded-lg border border-white/5 bg-[#080D17] p-4"
                  >
                    <div className="flex items-start gap-2">
                      <CircleX
                        size={15}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-200">
                          {flag.title}
                        </h3>

                        <p className="mt-2 text-[12px] leading-5 text-gray-500">
                          {flag.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous Reports */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <Users size={17} className="text-blue-400" />

                <h2 className="text-sm font-semibold">
                  Previous Investigation Reports
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {company.previousReports.map((report) => (
                  <div
                    key={`${report.jobTitle}-${report.reportedDate}`}
                    className="rounded-lg border border-white/5 bg-[#080D17] p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-200">
                          {report.jobTitle}
                        </h3>

                        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-500">
                          <CalendarDays size={12} />
                          {report.reportedDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-bold ${
                            report.riskScore >= 75
                              ? "text-red-400"
                              : report.riskScore >= 50
                                ? "text-orange-400"
                                : "text-emerald-400"
                          }`}
                        >
                          {report.riskScore}/100
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                            report.riskScore >= 75
                              ? "border-red-500/20 bg-red-500/10 text-red-400"
                              : report.riskScore >= 50
                                ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
                                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {report.riskLevel}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-gray-500">
                      Report status:{" "}
                      <span className="text-gray-300">{report.status}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Company Verification */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-blue-400" />

                <h2 className="text-sm font-semibold">
                  Company Verification
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <VerificationRow
                  label="Company name"
                  value="Needs Review"
                  danger
                />

                <VerificationRow
                  label="Official domain"
                  value="Not verified"
                  danger
                />

                <VerificationRow
                  label="Company address"
                  value="Not verified"
                  danger
                />

                <VerificationRow
                  label="Database presence"
                  value="Found"
                />
              </div>

              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-3 text-xs font-semibold text-white transition hover:bg-blue-400"
              >
                Visit Company Website
                <Globe size={14} />
              </a>
            </section>

            {/* Investigation Timeline */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <Clock3 size={17} className="text-blue-400" />

                <h2 className="text-sm font-semibold">
                  Company Activity Timeline
                </h2>
              </div>

              <div className="mt-5 border-l border-white/10 pl-5">
                {company.timeline.map((event, index) => (
                  <div
                    key={`${event.date}-${event.title}`}
                    className={index === 0 ? "relative" : "relative mt-7"}
                  >
                    <div
                      className={`absolute -left-[25px] top-1 h-3 w-3 rounded-full ${event.color}`}
                    />

                    <p className="text-[12px] text-gray-500">{event.date}</p>

                    <h3 className="mt-1 text-xs font-semibold text-gray-200">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final Recommendation */}
            <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert size={17} className="text-red-400" />

                <h2 className="text-sm font-semibold text-red-300">
                  Security Recommendation
                </h2>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Due to the company's high average risk score and multiple
                previous scam reports, proceed with extreme caution.
              </p>

              <p className="mt-3 text-xs font-semibold text-red-400">
                Do not pay any upfront fees or share banking information.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Reusable Components */

function StatCard({
  icon,
  label,
  value,
  description,
  valueClassName = "text-white",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111A2E] p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-[12px] font-semibold uppercase tracking-wide">{label}</span>
      </div>

      <p className={`mt-3 text-2xl font-bold ${valueClassName}`}>{value}</p>

      <p className="mt-1 text-[12px] text-gray-600">{description}</p>
    </div>
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
    <div className="rounded-lg border border-white/5 bg-[#080D17] p-3">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-500">
        {icon}
        {label}
      </div>

      <p className="mt-2 break-words text-xs text-gray-200">{value}</p>
    </div>
  );
}

function VerificationRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-semibold text-gray-500">{label}</span>

      <span
        className={`text-xs font-semibold ${
          danger ? "text-orange-400" : "text-emerald-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}