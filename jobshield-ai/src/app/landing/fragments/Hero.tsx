
import Link from "next/link";
import { Shield } from "lucide-react";
import ShieldAnalyzer from "./ShieldAnalyser";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 md:py-24 lg:px-10 lg:py-14"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
        backgroundImage:
          "radial-gradient(ellipse 600px 400px at 25% 35%, color-mix(in srgb, var(--primary) 7%, transparent), transparent 75%)",
      }}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 pl-0 lg:pl-12">
          <div
            className="group relative inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border px-3 py-1 text-[10px] uppercase tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:[transform:perspective(500px)_rotateX(8deg)_rotateY(-8deg)] sm:text-xs"
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--primary) 7%, transparent), transparent 70%)",
            }}
          >
            {/* Isomorphic light reflection */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

            {/* Animated green status dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <span className="absolute h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-green-400 opacity-60" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
            </span>

            <span className="relative pt-0.5 font-bold">
              AI-powered job scam detection
            </span>
          </div>

          <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:mt-6 sm:text-4xl md:text-[40px]">
            Don&apos;t fall for fake jobs.
            <span className="block">Verify before you apply.</span>
          </h1>

          <p
            className="mt-4 max-w-lg text-sm leading-6 sm:mt-5 sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Analyze job postings, recruiter details and screenshots to detect
            potential scams before sharing money or personal information.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
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
              className="rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              How It Works
            </Link>
          </div>

          {/* Trust Element */}
          <p
            className="mt-4 max-w-md text-xs leading-5 sm:mt-5 sm:text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Analyze job descriptions before sharing sensitive information.
          </p>
        </div>

        <div className="min-w-0">
          <ShieldAnalyzer />
        </div>
      </div>
    </section>
  );
}