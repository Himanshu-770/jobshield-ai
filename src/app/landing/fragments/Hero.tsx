
import Link from "next/link";
import { ShieldCheck, Shield } from "lucide-react";
import ShieldAnalyzer from "./ShieldAnalyser";

export default function Hero() {
  return (
    <section
      className="px-6 py-20 sm:py-24 lg:px-10 lg:py-14"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="pl-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wide"
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)",
            }}
          >
            <ShieldCheck size={16} />

            <span className="pt-0.5 font-bold">
              AI-powered job scam detection
            </span>
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-[40px]">
            Don&apos;t fall for fake jobs.
            <span className="block">Verify before you apply.</span>
          </h1>

          <p
            className="mt-5 max-w-lg text-sm leading-6 sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Analyze job postings, recruiter details and screenshots to detect
            potential scams before sharing money or personal information.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <Shield size={18} />
              Check a Job
            </Link>

            <Link
              href="#how-it-works"
              className="rounded-md border px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              How It Works
            </Link>
          </div>
        </div>

        <ShieldAnalyzer />
      </div>
    </section>
  );
}