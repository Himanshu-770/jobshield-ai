"use client";

import {
  ArrowUpRight,
  LockKeyhole,
  CloudUpload,
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
      className="rounded-xl border border-white/10 bg-[#111A2E] p-5"
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
        className="text-[14px] text-gray-400"
      >
        Job Description
      </label>

      <textarea
        id="jobDescription"
        name="jobDescription"
        rows={5}
        placeholder="Paste the full job posting text or messages here..."
        className="mt-2 w-full resize-none rounded-md border border-white/10 bg-[#080D17] p-3 text-sm outline-none placeholder:text-gray-600 placeholder:font-normal focus:border-blue-500"
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
      className="h-45 rounded-xl border border-white/10 bg-[#111A2E] p-5"
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
      className="rounded-xl border border-white/10 bg-[#111A2E] p-5"
    >
      <label className="text-[14px] text-gray-400">
        Upload Job Screenshot
      </label>

      <label className="mt-3 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white bg-[#080D17] text-center text-xs text-gray-500">
        <CloudUpload
          size={36}
          className="mb-2 text-white"
        />

        <span className="text-sm text-white">
          Upload screenshot
        </span>

        <span className="mt-1">
          PNG, JPG or WEBP
        </span>

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
      <label className="text-[14px] text-gray-400">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-white/10 bg-[#080D17] px-3 py-2.5 text-sm outline-none placeholder:text-gray-600 placeholder:text-[13px] placeholder:font-semibold focus:border-blue-500"
      />
    </div>
  );
}

function FormButton() {
  return (
    <div className="mt-5 flex items-center justify-between gap-4">
      <p className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500">
        <LockKeyhole size={18} />

        Your data is encrypted and never shared with third parties.
      </p>

      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-md bg-blue-500 px-5 py-3 text-sm font-semibold hover:bg-blue-400"
      >
        Analyze Job

        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}