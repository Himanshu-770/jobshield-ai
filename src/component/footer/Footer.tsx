import Link from "next/link";
import {
  Mail,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070B14]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Footer */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
                <ShieldCheck size={17} />
              </div>

              <span className="text-base font-bold">
                JobShield{" "}
                <span className="text-blue-500">AI</span>
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-5 text-gray-500">
              AI-powered protection that helps job seekers
              identify suspicious and potentially fraudulent
              job opportunities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="w-fit text-xs text-gray-500 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/#how-it-works"
                className="w-fit text-xs text-gray-500 transition hover:text-white"
              >
                How It Works
              </Link>

              <Link
                href="/#about"
                className="w-fit text-xs text-gray-500 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/auth/login"
                className="w-fit text-xs text-gray-500 transition hover:text-white"
              >
                Analyze a Job
              </Link>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Security
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <LockKeyhole size={14} className="text-blue-500" />
                Secure & encrypted analysis
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-blue-500" />
                Privacy-focused platform
              </div>

              <Link
                href="mailto:support@jobshield.ai"
                className="flex w-fit items-center gap-2 text-xs text-gray-500 transition hover:text-white"
              >
                <Mail size={14} />
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-gray-600">
            © 2026 JobShield AI. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="text-[11px] text-gray-600 transition hover:text-gray-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[11px] text-gray-600 transition hover:text-gray-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}