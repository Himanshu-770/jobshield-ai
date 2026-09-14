
"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthVisual from "../fragments/AuthVisual";
import AuthInput from "../fragments/AuthInput";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    router.push("/dashboard");
  };

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

          <h1 className="text-3xl font-extrabold">Welcome back</h1>

          <p
            className="mt-2 text-sm font-normal"
            style={{ color: "var(--text-secondary)" }}
          >
            Enter your credentials to access your security dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between text-xs">
              <label
                className="flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="accent-[var(--primary)]"
                />
                Remember me
              </label>

              <Link
                href="/auth/forgot-password"
                className="transition-colors"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Sign In
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}