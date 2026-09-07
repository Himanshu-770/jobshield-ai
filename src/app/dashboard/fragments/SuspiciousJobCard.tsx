import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function SuspiciousJobCard() {
  return (
    <div className="rounded-lg border border-white/10 h-60 bg-[#111A2E] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500 text-blue-500">
        <ShieldCheck size={20} />
      </div>

      <h2 className="mt-5 text-base font-bold">
        Have a suspicious job?
      </h2>

      <p className="mt-2 text-[13px] leading-4 text-gray-500">
        Analyze job descriptions, company profiles, or strange recruiter
        emails instantly.
      </p>

      <Link
        href="/analyze"
        className="mt-5 flex items-center justify-center gap-2 rounded-md bg-blue-500 py-2.5 text-[15px] font-semibold hover:bg-blue-400"
      >
        Analyze Now
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}