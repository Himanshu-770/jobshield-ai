import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import AuthVisual from "../fragments/AuthVisual";
import AuthInput from "../fragments/AuthInput";

export default function SignUp() {
  return (
    <main className="flex min-h-screen bg-[#070B14] text-white">
      <AuthVisual />

      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <ShieldCheck size={17} />
            </div>

            <span className="font-semibold">
              JobShield <span className="text-blue-500">AI</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold pl-15">Create an account </h1>

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

            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mt-0.5 accent-blue-500"
              />

              <span>
                I agree to the{" "}
                <Link href="#" className="text-blue-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-500">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-semibold hover:bg-blue-400"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}