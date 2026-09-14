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
  const company = companies[0];

  const riskColor =
    company.averageRiskScore >= 75
      ? "var(--risk-high)"
      : company.averageRiskScore >= 50
        ? "var(--risk-medium)"
        : "var(--risk-low)";

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/analyze/result"
            className="flex items-center gap-2 text-xs transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} />
            Back to Analysis
          </Link>

          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            <ShieldCheck size={18} style={{ color: "var(--primary)" }} />
            Company Track Record
          </div>
        </div>

        {/* Company Header */}
        <section
          className="mt-6 rounded-xl border p-5 md:p-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                <Building2 size={28} />
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Company Investigation
                </p>

                <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                  {company.name}
                </h1>

                <div
                  className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
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

            <div
              className="w-fit rounded-full border px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--risk-medium) 20%, transparent)",
                color: "var(--risk-medium)",
              }}
            >
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
            valueColor={riskColor}
            description="Based on previous reports"
          />

          <StatCard
            icon={<ShieldAlert size={18} />}
            label="Scam Reports"
            value={company.scamReports.toString()}
            valueColor="var(--risk-high)"
            description="Reports with serious concerns"
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Positive Reports"
            value={company.positiveReports.toString()}
            valueColor="var(--risk-low)"
            description="Lower-risk reports"
          />
        </section>

        {/* Main Content */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Company Profile */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Building2 size={17} style={{ color: "var(--primary)" }} />
                <h2 className="text-base font-semibold">Company Profile</h2>
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

              <div
                className="mt-5 rounded-lg border p-4"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--risk-medium) 20%, transparent)",
                }}
              >
                <div className="flex items-start gap-2">
                  <CircleAlert
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--risk-medium)" }}
                  />

                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "var(--risk-medium)" }}
                    >
                      Verification Notice
                    </p>

                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
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
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert
                  size={17}
                  style={{ color: "var(--risk-high)" }}
                />

                <h2 className="text-base font-semibold">
                  Commonly Reported Red Flags
                </h2>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {company.commonRedFlags.map((flag) => (
                  <div
                    key={flag.title}
                    className="rounded-lg border p-4"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <CircleX
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--risk-high)" }}
                      />

                      <div>
                        <h3 className="text-sm font-semibold">
                          {flag.title}
                        </h3>

                        <p
                          className="mt-2 text-xs leading-5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {flag.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous Reports */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Users size={17} style={{ color: "var(--primary)" }} />

                <h2 className="text-base font-semibold">
                  Previous Investigation Reports
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {company.previousReports.map((report) => {
                  const reportRiskColor =
                    report.riskScore >= 75
                      ? "var(--risk-high)"
                      : report.riskScore >= 50
                        ? "var(--risk-medium)"
                        : "var(--risk-low)";

                  return (
                    <div
                      key={`${report.jobTitle}-${report.reportedDate}`}
                      className="rounded-lg border p-4"
                      style={{
                        backgroundColor: "var(--surface-secondary)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {report.jobTitle}
                          </h3>

                          <p
                            className="mt-1 flex items-center gap-1.5 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <CalendarDays size={12} />
                            {report.reportedDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className="text-sm font-bold"
                            style={{ color: reportRiskColor }}
                          >
                            {report.riskScore}/100
                          </span>

                          <span
                            className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${reportRiskColor} 10%, transparent)`,
                              borderColor: `color-mix(in srgb, ${reportRiskColor} 20%, transparent)`,
                              color: reportRiskColor,
                            }}
                          >
                            {report.riskLevel}
                          </span>
                        </div>
                      </div>

                      <p
                        className="mt-3 text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Report status:{" "}
                        <span style={{ color: "var(--text-primary)" }}>
                          {report.status}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Company Verification */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} style={{ color: "var(--primary)" }} />

                <h2 className="text-base font-semibold">
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
                className="mt-5 flex items-center justify-center gap-2 rounded-md px-4 py-3 text-xs font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Visit Company Website
                <Globe size={14} />
              </a>
            </section>

            {/* Investigation Timeline */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Clock3 size={17} style={{ color: "var(--primary)" }} />

                <h2 className="text-base font-semibold">
                  Company Activity Timeline
                </h2>
              </div>

              <div
                className="mt-5 border-l pl-5"
                style={{ borderColor: "var(--border)" }}
              >
                {company.timeline.map((event, index) => (
                  <div
                    key={`${event.date}-${event.title}`}
                    className={index === 0 ? "relative" : "relative mt-7"}
                  >
                    <div
                      className={`absolute -left-[25px] top-1 h-3 w-3 rounded-full ${event.color}`}
                    />

                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {event.date}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold">
                      {event.title}
                    </h3>

                    <p
                      className="mt-2 text-xs leading-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final Recommendation */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--risk-high) 5%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--risk-high) 20%, transparent)",
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert
                  size={17}
                  style={{ color: "var(--risk-high)" }}
                />

                <h2
                  className="text-base font-semibold"
                  style={{ color: "var(--risk-high)" }}
                >
                  Security Recommendation
                </h2>
              </div>

              <p
                className="mt-3 text-xs leading-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Due to the company's high average risk score and multiple
                previous scam reports, proceed with extreme caution.
              </p>

              <p
                className="mt-3 text-xs font-semibold"
                style={{ color: "var(--risk-high)" }}
              >
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
  valueColor = "var(--text-primary)",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  valueColor?: string;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center gap-2"
        style={{ color: "var(--text-secondary)" }}
      >
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p
        className="mt-3 text-2xl font-bold"
        style={{ color: valueColor }}
      >
        {value}
      </p>

      <p
        className="mt-1 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
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
    <div
      className="rounded-lg border p-3"
      style={{
        backgroundColor: "var(--surface-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        {icon}
        {label}
      </div>

      <p
        className="mt-2 break-words text-xs"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
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
    <div
      className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="text-xs font-semibold"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </span>

      <span
        className="text-xs font-semibold"
        style={{
          color: danger ? "var(--risk-medium)" : "var(--risk-low)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
