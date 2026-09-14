
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import AuthVisual from "../fragments/AuthVisual";
import AuthInput from "../fragments/AuthInput";

export default function SignUp() {
  return (
    <main
      className="flex min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <AuthVisual />

      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <ShieldCheck size={17} />
            </div>

            <span className="font-semibold">
              JobShield{" "}
              <span style={{ color: "var(--primary)" }}>AI</span>
            </span>
          </div>

          <h1 className="pl-15 text-3xl font-extrabold">
            Create an account
          </h1>

          <form className="mt-8 space-y-5">
            <AuthInput
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
            />

            <AuthInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="you@company.com"
            />

            <AuthInput
              name="password"
              label="Password"
              type="password"
              placeholder="Create a password"
            />

            <AuthInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <label
              className="flex items-start gap-2 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mt-0.5 accent-[var(--primary)]"
              />

              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-md py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Create Account
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}