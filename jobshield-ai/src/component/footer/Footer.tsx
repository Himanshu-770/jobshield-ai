import Link from "next/link";
import {
  Mail,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white"
                style={{
                  boxShadow: "0 0 20px var(--primary-shadow)",
                }}
              >
                <ShieldCheck size={17} />
              </div>

              <span className="text-base font-bold text-[var(--text-primary)]">
                JobShield{" "}
                <span className="text-[var(--primary)]">AI</span>
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-5 text-[var(--text-secondary)]">
              AI-powered protection that helps job seekers identify
              suspicious and potentially fraudulent job opportunities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="w-fit text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Home
              </Link>

              <Link
                href="/#how-it-works"
                className="w-fit text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                How It Works
              </Link>

              <Link
                href="/#about"
                className="w-fit text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                About
              </Link>

              <Link
                href="/auth/login"
                className="w-fit text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Analyze a Job
              </Link>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Security
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <LockKeyhole
                  size={14}
                  className="text-[var(--primary)]"
                />
                Secure & encrypted analysis
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <ShieldCheck
                  size={14}
                  className="text-[var(--primary)]"
                />
                Privacy-focused platform
              </div>

              <Link
                href="mailto:support@jobshield.ai"
                className="flex w-fit items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                <Mail size={14} />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Horizontal Divider */}
      <div
        aria-hidden="true"
        className="w-full border-t border-[var(--border)]"
      />

      {/* Bottom Footer */}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-[var(--text-secondary)]">
          © 2026 JobShield AI. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-5">
          <Link
            href="/privacy"
            className="text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}