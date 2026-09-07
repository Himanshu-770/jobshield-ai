import { AlertTriangle } from "lucide-react";

export default function ShieldAnalyzer() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-[#111A2E] p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Shield Analyzer</h2>

        <span className="rounded-xl bg-emerald-500/10 px-2 py-1 text-[12px] text-emerald-400 flex flex-row">
      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-300 mt-1 mr-1.5">
  <div className="h-2 w-2 rounded-full bg-green-600 " />
</div>
          Scanner Active
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Company Name" value="Apex Global Tech " />

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

      <div className="mt-5 flex gap-3 rounded-lg border border-white/10 bg-[#0B1220] p-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-red-500 text-sm font-medium text-red-400">
          85
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-red-400">
            High Risk Scam Detected
          </p>

          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Red flags: Telegram interview, equipment wire payment required,
            untrusted domain.
          </p>
        </div>

        <AlertTriangle
          size={15}
          className="ml-auto shrink-0 text-red-400"
        />
      </div>

      <button className="mt-4 w-full rounded-md bg-blue-500 py-2.5 text-sm font-medium transition hover:bg-blue-400">
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
      <label className="mb-1.5 block text-[12px] font-semibold text-gray-500">
        {label}
      </label>

      <div
        className={`rounded-md bg-[#080D17] px-3 py-2.5 text-[13px] text-gray-300 ${
          large ? "min-h-14 leading-4" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}