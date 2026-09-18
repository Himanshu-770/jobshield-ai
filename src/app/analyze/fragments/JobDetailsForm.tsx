"use client";

import {
  ArrowUpRight,
  CloudUpload,
  LockKeyhole,
} from "lucide-react";

type Props = {
  activeTab: string;
  onAnalyze: () => void;
};

export default function JobDetailsForm({
  activeTab,
  onAnalyze,
}: Props) {
  if (activeTab === "Job URL") {
    return <UrlForm onAnalyze={onAnalyze} />;
  }

  if (activeTab === "Screenshot") {
    return <ScreenshotForm onAnalyze={onAnalyze} />;
  }

  return <DetailsForm onAnalyze={onAnalyze} />;
}

function DetailsForm({
  onAnalyze,
}: {
  onAnalyze: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAnalyze();
      }}
      className="rounded-xl border p-4 sm:p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Job Title"
          placeholder="e.g. Remote Data Entry Specialist"
        />

        <Field
          label="Company Name"
          placeholder="e.g. Apex Global Tech"
        />

        <Field
          label="Recruiter Name"
          placeholder="e.g. Sarah Connor"
        />

        <Field
          label="Recruiter Email Address"
          placeholder="e.g. recruitment@apex-careers-global.com"
        />
      </div>

      <div className="my-4">
        <Field
          label="Salary / Compensation"
          placeholder="e.g. $45/hour"
        />
      </div>

      <label
        htmlFor="jobDescription"
        className="text-[14px]"
        style={{ color: "var(--text-secondary)" }}
      >
        Job Description
      </label>

      <textarea
        id="jobDescription"
        name="jobDescription"
        rows={5}
        placeholder="Paste the full job posting text or messages here..."
        className="mt-2 w-full resize-none rounded-md border p-3 text-sm font-normal outline-none transition-colors placeholder:text-sm placeholder:font-normal focus:border-[var(--primary)]"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      />

      <FormButton />
    </form>
  );
}

function UrlForm({
  onAnalyze,
}: {
  onAnalyze: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAnalyze();
      }}
      className="h-45 rounded-xl border p-4 sm:p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <Field
        label="Job Posting URL"
        placeholder="https://example.com/job-posting"
      />

      <FormButton />
    </form>
  );
}

function ScreenshotForm({
  onAnalyze,
}: {
  onAnalyze: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAnalyze();
      }}
      className="rounded-xl border p-4 sm:p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <label
        className="text-[14px]"
        style={{ color: "var(--text-secondary)" }}
      >
        Upload Job Screenshot
      </label>

      <label
        className="mt-3 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed text-center text-xs"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <CloudUpload
          size={36}
          className="mb-2"
          style={{ color: "var(--text-primary)" }}
        />

        <span
          className="text-sm"
          style={{ color: "var(--text-primary)" }}
        >
          Upload screenshot
        </span>

        <span className="mt-1">PNG, JPG or WEBP</span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>

      <FormButton />
    </form>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        className="text-[14px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border px-3 py-2.5 text-sm font-normal outline-none transition-colors placeholder:text-sm focus:border-[var(--primary)]"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}

function FormButton() {
  return (
    <div className="mt-5 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <p
        className="flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: "var(--text-secondary)" }}
      >
        <LockKeyhole size={18} />

        Your data is encrypted and never shared with third parties.
      </p>

      <button
        type="submit"
        className="flex items-center justify-center gap-1.5 rounded-md px-5 py-3 text-sm font-semibold transition-colors hover:opacity-90"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Analyze Job
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
