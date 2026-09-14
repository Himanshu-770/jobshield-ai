import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function SuspiciousJobCard() {
  return (
    <div
      className="h-60 rounded-lg border p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border"
        style={{
          backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
          borderColor: "var(--primary)",
          color: "var(--primary)",
        }}
      >
        <ShieldCheck size={20} />
      </div>

      <h2
        className="mt-5 text-base font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        Have a suspicious job?
      </h2>

      <p
        className="mt-2 text-sm leading-4"
        style={{ color: "var(--text-secondary)" }}
      >
        Analyze job descriptions, company profiles, or strange recruiter
        emails instantly.
      </p>

      <Link
        href="/analyze"
        className="mt-5 flex items-center justify-center gap-2 rounded-md py-2.5 text-[15px] font-semibold transition-colors"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Analyze Now
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}
