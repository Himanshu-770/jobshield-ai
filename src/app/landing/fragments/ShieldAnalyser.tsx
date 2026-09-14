
import { AlertTriangle } from "lucide-react";

export default function ShieldAnalyzer() {
  return (
    <div
      className="mx-auto w-full max-w-md rounded-xl border p-5 shadow-2xl"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Shield Analyzer</h2>

        <span
          className="flex flex-row items-center rounded-xl px-2 py-1 text-xs"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--risk-low) 10%, transparent)",
            color: "var(--risk-low)",
          }}
        >
          <div className="relative mr-1.5 flex h-3 w-3 items-center justify-center">
            <div
              className="absolute h-3 w-3 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full opacity-60"
              style={{ backgroundColor: "var(--risk-low)" }}
            />

            <div
              className="relative h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--risk-low)" }}
            />
          </div>

          Scanner Active
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Company Name" value="Apex Global Tech" />

        <Field
          label="Recruiter Email"
          value="recruiting@apex-careers-international.com"
        />

        <Field
          label="Job Description / URL"
          value="Remote Data Entry Specialist. Immediate start. Earn ₹45/hour. Must buy home office equipment from our approved vendor via wire transfer."
          large
        />
      </div>

      <div
        className="mt-5 flex gap-3 rounded-lg border p-3"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 text-sm font-medium"
          style={{
            borderColor: "var(--risk-high)",
            color: "var(--risk-high)",
          }}
        >
          85
        </div>

        <div className="min-w-0">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--risk-high)" }}
          >
            High Risk Scam Detected
          </p>

          <p
            className="mt-1 text-xs leading-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Red flags: Telegram interview, equipment wire payment required,
            untrusted domain.
          </p>
        </div>

        <AlertTriangle
          size={15}
          className="ml-auto shrink-0"
          style={{ color: "var(--risk-high)" }}
        />
      </div>

      <button
        className="mt-4 w-full rounded-md py-2.5 text-sm font-medium transition-colors"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Analyze Job
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-xs font-semibold"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>

      <div
        className={`rounded-md px-3 py-2.5 text-sm ${
          large ? "min-h-14 leading-4" : ""
        }`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
