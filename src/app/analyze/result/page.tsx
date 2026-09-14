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
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/analyze"
            className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={16} />
            Back to Analyze
          </Link>

          <span
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            <ShieldCheck size={15} style={{ color: "var(--primary)" }} />
            JobShield AI Analysis
          </span>
        </div>

        {/* Main Result */}
        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
          {/* Risk Assessment */}
          <section
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Overall Risk Assessment
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: "var(--risk-high)" }}
                  >
                    78
                  </span>

                  <span
                    className="mb-1 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    / 100
                  </span>
                </div>
              </div>

              <div
                className="flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--risk-high) 10%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--risk-high) 20%, transparent)",
                  color: "var(--risk-high)",
                }}
              >
                <CircleAlert size={13} />
                HIGH RISK
              </div>
            </div>

            {/* Warning */}
            <div
              className="mt-6 border-l-2 pl-4"
              style={{ borderColor: "var(--risk-high)" }}
            >
              <p
                className="text-sm leading-5"
                style={{ color: "var(--text-secondary)" }}
              >
                This job contains several indicators commonly associated with
                recruitment scams. Proceed with extreme caution and do not
                provide sensitive personal information.
              </p>
            </div>

            {/* Score explanation */}
            <div className="mt-7">
              <div className="mb-2 flex justify-between text-xs">
                <span style={{ color: "var(--text-secondary)" }}>
                  Risk Level
                </span>

                <span style={{ color: "var(--risk-high)" }}>High Risk</span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--surface-secondary)" }}
              >
                <div
                  className="h-full w-[78%] rounded-full"
                  style={{ backgroundColor: "var(--risk-high)" }}
                />
              </div>
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
              <ShieldCheck size={17} style={{ color: "var(--primary)" }} />

              <h2 className="text-base font-semibold">Company Verification</h2>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Company Name
                </p>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  Apex Global Tech
                </p>
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Status
                </p>

                <div
                  className="mt-1 flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--risk-medium)" }}
                >
                  <CircleAlert size={13} />
                  Needs Review
                </div>
              </div>

              <Link
                href="/investigation"
                className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
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
          <section
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--risk-high) 10%, transparent)",
                }}
              >
                <ShieldAlert
                  size={20}
                  style={{ color: "var(--risk-high)" }}
                />
              </div>

              <h2 className="text-base font-semibold">Red Flags Detected</h2>
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

          {/* Positive Signals and Domain Analysis */}
          <div className="space-y-5">
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--risk-low) 10%, transparent)",
                  }}
                >
                  <ShieldCheck
                    size={20}
                    style={{ color: "var(--risk-low)" }}
                  />
                </div>

                <h2 className="text-base font-semibold">Positive Signals</h2>
              </div>

              <div className="mt-5 space-y-3">
                <Signal text="Clear job responsibilities outlined" />
                <Signal text="Detailed job description provided" />
                <Signal text="Company information is available" />
              </div>
            </section>

            {/* Domain Analysis */}
            <section
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Globe size={20} style={{ color: "var(--primary)" }} />

                <h2 className="text-base font-semibold">Domain Analysis</h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DomainItem
                  label="Recruiter Email"
                  value="recruiter@gmail.com"
                />

                <DomainItem
                  label="Company Domain"
                  value="apexglobaltech.com"
                />
              </div>

              <div
                className="mt-4 rounded-lg border p-3"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--risk-high) 5%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--risk-high) 20%, transparent)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "var(--risk-high)" }}
                  >
                    <CircleX size={14} />
                    Email Domain Match
                  </div>

                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--risk-high)" }}
                  >
                    FAILED
                  </span>
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Domains do not match exactly.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Action */}
        <div
          className="mt-6 flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <h2 className="text-base font-semibold">Need another check?</h2>

            <p
              className="mt-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Analyze another job before you apply.
            </p>
          </div>

          <Link
            href="/analyze"
            className="flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-xs font-semibold transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
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
    <div
      className="rounded-lg border p-3"
      style={{
        backgroundColor: "var(--surface-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5"
          style={{ color: "var(--risk-high)" }}
        >
          {icon}
        </div>

        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </p>

          <p
            className="mt-1 text-xs leading-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Signal({ text }: { text: string }) {
  return (
    <div
      className="flex items-center gap-2 text-sm"
      style={{ color: "var(--text-secondary)" }}
    >
      <Check size={14} style={{ color: "var(--risk-low)" }} />
      {text}
    </div>
  );
}

function DomainItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <div
        className="mt-2 rounded-md border px-3 py-2 text-xs"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
