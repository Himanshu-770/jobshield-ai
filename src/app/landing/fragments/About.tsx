
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stats = [
  ["50,000+", "Jobs Analyzed"],
  ["95%", "Detection Accuracy"],
  ["10,000+", "Users Protected"],
];

export default function StatsCTA() {
  return (
    <section
      id="about"
      className="space-y-10 bg-[var(--background)] px-4 py-8 sm:px-6 sm:py-18"
    >
      {/* Stats */}
      <div className="mx-auto grid max-w-6xl gap-2 md:grid-cols-3">
        {stats.map(([value, label], index) => (
          <div
            key={label}
            className={`py-1.5 text-center ${
              index !== stats.length - 1
                ? "border-r border-[var(--border)]"
                : ""
            }`}
          >
            <p className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
              {value}
            </p>

            <p className="mt-0.5 text-[14px] text-[var(--text-primary)]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-8 text-center sm:mt-30 sm:px-6 sm:py-10">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          Before you apply, check the job.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-xs leading-4 text-[var(--text-secondary)] sm:text-[15px]">
          Protect your personal data and financial security. Our AI scanning
          system is free to use and delivers reports in under 10 seconds.
        </p>

        <Link
          href="/auth/signup"
          className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-4 py-2 text-[16px] font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
        >
          Analyze a Job
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
