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
      <main
        className="min-h-screen md:flex"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <Sidebar />

        <section className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <ShieldAlert
            size={40}
            style={{ color: "var(--risk-high)" }}
          />

          <h1 className="mt-4 text-xl font-bold">
            Investigation Not Found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            This investigation does not exist or is not available.
          </p>

          <Link
            href={backHref}
            className="mt-6 rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {backLabel}
          </Link>
        </section>
      </main>
    );
  }

  const scoreColor =
    investigation.score >= 80
      ? "var(--risk-high)"
      : investigation.score >= 50
        ? "var(--risk-medium)"
        : "var(--risk-low)";

  return (
    <main
      className="min-h-screen md:flex"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Sidebar />

      <section className="min-w-0 flex-1 px-5 py-6 md:px-8 md:py-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>

          <span
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Investigation #{investigation.id}
          </span>
        </div>

        {/* Company Header */}
        <header
          className="mt-6 rounded-xl border p-5 md:p-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                <Building2 size={26} />
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Company Investigation
                </p>

                <h1 className="mt-1 text-xl font-bold md:text-2xl">
                  {investigation.company}
                </h1>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {investigation.jobTitle}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-lg border px-4 py-3"
              style={{
                backgroundColor: "var(--surface-secondary)",
                borderColor: "var(--border)",
              }}
            >
              <ShieldCheck
                size={20}
                style={{ color: "var(--primary)" }}
              />

              <div>
                <p
                  className="text-xs uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Overall Risk Score
                </p>

                <p
                  className="mt-1 text-xl font-bold"
                  style={{ color: scoreColor }}
                >
                  {investigation.score}

                  <span
                    className="ml-1 text-xs font-normal"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /100
                  </span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Investigation Overview */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <section
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h2 className="text-base font-semibold">
              Investigation Overview
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
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
          <section
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={17}
                style={{ color: "var(--primary)" }}
              />

              <h2 className="text-base font-semibold">
                Company Verification
              </h2>
            </div>

            <p
              className="mt-4 text-xs uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Company Name
            </p>

            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              {investigation.company}
            </p>

            <p
              className="mt-4 text-xs uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Status
            </p>

            <div
              className="mt-2 flex items-center gap-2 text-xs"
              style={{ color: "var(--risk-medium)" }}
            >
              <AlertTriangle size={14} />
              Needs Review
            </div>

            <div
              className="mt-5 rounded-md border p-3 text-xs leading-5"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--risk-medium) 20%, transparent)",
                color: "var(--risk-medium)",
              }}
            >
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
        <section
          className="mt-5 rounded-xl border p-5"
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
              Detected Risk Indicators
            </h2>
          </div>

          {investigation.redFlags.length > 0 ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {investigation.redFlags.map((flag) => (
                <div
                  key={flag.title}
                  className="rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--surface-secondary)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      size={15}
                      style={{ color: "var(--risk-high)" }}
                    />

                    <h3
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {flag.title}
                    </h3>
                  </div>

                  <p
                    className="mt-2 text-sm leading-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {flag.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="mt-4 flex items-center gap-2 rounded-lg p-4 text-sm"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--risk-low) 10%, transparent)",
                color: "var(--risk-low)",
              }}
            >
              <CheckCircle2 size={17} />
              No major risk indicators detected.
            </div>
          )}
        </section>

        {/* Investigation Metadata */}
        <section
          className="mt-5 rounded-xl border p-5"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
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
    <div
      className="rounded-lg border p-3"
      style={{
        backgroundColor: "var(--surface-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs uppercase tracking-wide"
        style={{ color: "var(--text-muted)" }}
      >
        {icon}
        {label}
      </div>

      <p
        className="mt-2 break-words text-sm"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
    </div>
  );
}
